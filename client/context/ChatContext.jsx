import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});
  const [messageCache, setMessageCache] = useState({});

  const { socket, axios, authUser } = useContext(AuthContext);

  // Fetch users for sidebar
  const getUsers = useCallback(async () => {
    if (!authUser) return;
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users || []);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios, authUser]);

  // Fetch messages for a selected user
  const getMessages = useCallback(
    async (userId) => {
      if (!userId || !authUser) return;
      try {
        if (messageCache[userId]) {
          setMessages(messageCache[userId]);
          setUnseenMessages((prev) => ({ ...prev, [userId]: 0 }));
          return;
        }

        setMessages([]);
        const { data } = await axios.get(`/api/messages/${userId}`);
        if (data.success) {
          const sortedMessages = data.messages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setMessages(sortedMessages);
          setMessageCache((prev) => ({ ...prev, [userId]: sortedMessages }));
          setUnseenMessages((prev) => ({ ...prev, [userId]: 0 }));

          // Mark unseen messages as seen
          const unseenIds = data.messages
            .filter((msg) => msg.receiver === authUser._id && !msg.seen)
            .map((msg) => msg._id);

          if (unseenIds.length > 0) {
            await axios.put("/api/messages/mark-many", {
              messageIds: unseenIds,
            });
            socket?.emit("messagesSeen", {
              ids: unseenIds,
              by: authUser._id,
            });
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
    [axios, messageCache, authUser, socket]
  );

  // Send a message
  const sendMessage = useCallback(
    async (messageData) => {
      if (!selectedUser || !authUser) return;

      try {
        const optimisticMessage = {
          _id: Date.now().toString(),
          sender: authUser._id,
          receiver: selectedUser._id,
          text: messageData.text || "",
          image: messageData.image || "",
          createdAt: new Date().toISOString(),
          seen: false,
          deleted: false,
        };

        setMessages((prev) => [optimisticMessage, ...prev]);
        setMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: [
            optimisticMessage,
            ...(prev[selectedUser._id] || []),
          ],
        }));

        const { data } = await axios.post(
          `/api/messages/send/${selectedUser._id}`,
          messageData
        );

        setMessages((prev) =>
          prev.map((msg) => (msg._id === optimisticMessage._id ? data : msg))
        );
        setMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: prev[selectedUser._id].map((msg) =>
            msg._id === optimisticMessage._id ? data : msg
          ),
        }));
      } catch (error) {
        setMessages((prev) =>
          prev.filter((msg) => msg._id !== Date.now().toString())
        );
        setMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: prev[selectedUser._id]?.filter(
            (msg) => msg._id !== Date.now().toString()
          ),
        }));
        toast.error(error.response?.data?.message || "Failed to send message");
      }
    },
    [axios, selectedUser, authUser]
  );

  // Subscribe to socket events
  const subscribeToMessages = useCallback(() => {
    if (!socket || !authUser) return;

    socket.on("newMessage", (newMessage) => {
      const senderId = newMessage?.sender?._id || newMessage.sender || null;
      const receiverId =
        newMessage?.receiver?._id || newMessage.receiver || null;

      if (!senderId || !receiverId) return;

      if (selectedUser && senderId === selectedUser._id) {
        setMessages((prev) => [newMessage, ...prev]);
        setMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: [newMessage, ...(prev[selectedUser._id] || [])],
        }));
        setUnseenMessages((prev) => ({ ...prev, [selectedUser._id]: 0 }));

        axios.put(`/api/messages/mark/${newMessage._id}`).catch(() => {});
        socket.emit("messagesSeen", {
          ids: [newMessage._id],
          by: authUser._id,
        });
      } else if (
        selectedUser &&
        senderId === authUser._id &&
        receiverId === selectedUser._id
      ) {
        setMessages((prev) => [newMessage, ...prev]);
        setMessageCache((prev) => ({
          ...prev,
          [selectedUser._id]: [newMessage, ...(prev[selectedUser._id] || [])],
        }));
      } else {
        setUnseenMessages((prev) => ({
          ...prev,
          [senderId]: (prev[senderId] || 0) + 1,
        }));
      }
    });

    socket.on("messagesSeen", ({ ids }) => {
      if (!Array.isArray(ids) || !selectedUser) return;
      setMessages((prev) =>
        prev.map((msg) =>
          ids.includes(msg._id) ? { ...msg, seen: true } : msg
        )
      );
      setMessageCache((prev) => ({
        ...prev,
        [selectedUser._id]: prev[selectedUser._id]?.map((msg) =>
          ids.includes(msg._id) ? { ...msg, seen: true } : msg
        ),
      }));
    });

    socket.on("messageDeleted", (deletedMsg) => {
      if (!selectedUser) return;
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === deletedMsg._id ? { ...deletedMsg } : msg
        )
      );
      setMessageCache((prev) => ({
        ...prev,
        [selectedUser._id]: prev[selectedUser._id]?.map((msg) =>
          msg._id === deletedMsg._id ? { ...deletedMsg } : msg
        ),
      }));
    });
  }, [socket, selectedUser, authUser]);

  useEffect(() => {
    subscribeToMessages();
    return () => {
      socket?.off("newMessage");
      socket?.off("messagesSeen");
      socket?.off("messageDeleted");
    };
  }, [subscribeToMessages, socket]);

  useEffect(() => {
    if (!selectedUser) setMessages([]);
  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        deleteMessage: async (id, type = "everyone") => {
  if (!selectedUser) return;

  if (type === "me") {
    // "Delete for me" → just remove it from my local state/cache
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
    setMessageCache((prev) => ({
      ...prev,
      [selectedUser._id]: prev[selectedUser._id]?.filter(
        (msg) => msg._id !== id
      ),
    }));
    return; // no backend call
  }

  if (type === "everyone") {
    // Optimistic UI update: mark as deleted
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === id
          ? {
              ...msg,
              text: "This message was deleted",
              deleted: true,
              image: "",
            }
          : msg
      )
    );

    setMessageCache((prev) => ({
      ...prev,
      [selectedUser._id]: prev[selectedUser._id]?.map((msg) =>
        msg._id === id
          ? {
              ...msg,
              text: "This message was deleted",
              deleted: true,
              image: "",
            }
          : msg
      ),
    }));

    try {
      await axios.delete(`/api/messages/${id}`); // delete for everyone
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete message"
      );
    }
  }
},

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
