import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

// Get all users except the logged-in user
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    const unseenMessages = {};
    const userLastMessageMap = {};

    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        sender: user._id,
        receiver: userId,
        seen: false,
      });
      if (messages.length > 0) unseenMessages[user._id] = messages.length;

      const lastMsg = await Message.findOne({
        $or: [
          { sender: userId, receiver: user._id },
          { sender: user._id, receiver: userId },
        ],
      })
        .sort({ createdAt: -1 })
        .select("createdAt");

      userLastMessageMap[user._id] = lastMsg ? lastMsg.createdAt : null;
    });

    await Promise.all(promises);

    const usersWithLastMsg = filteredUsers.map((user) => {
      const u = user.toObject();
      u.lastMessageAt = userLastMessageMap[user._id] || null;
      return u;
    });

    res.json({
      success: true,
      users: usersWithLastMsg,
      unseenMessages,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: selectedUserId },
        { sender: selectedUserId, receiver: myId },
      ],
    })
      .populate("sender", "fullName profilePic email")
      .populate("receiver", "fullName profilePic email")
      .sort({ createdAt: 1 });

    // Mark unseen messages as seen
    const unseen = await Message.updateMany(
      { sender: selectedUserId, receiver: myId, seen: false },
      { seen: true }
    );

    // Notify sender via socket for real-time update
    if (unseen.modifiedCount > 0) {
      const senderSocketId = userSocketMap[selectedUserId];
      if (senderSocketId) {
        io.to(senderSocketId).emit(
          "messagesSeen",
          { by: myId, sender: selectedUserId }
        );
      }
    }

    res.json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Mark a single message as seen
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { id } = req.params; // sender userId
    const myId = req.user._id;

    const updatedMessages = await Message.updateMany(
      { sender: id, receiver: myId, seen: false },
      { seen: true }
    );

    if (updatedMessages.modifiedCount > 0) {
      const senderSocketId = userSocketMap[id];
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", { by: myId, sender: id });
      }
    }

    res.json({ success: true, message: "Messages marked as seen" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Mark multiple messages as seen (for batch updates)
export const markManyMessagesAsSeen = async (req, res) => {
  try {
    let { messageIds } = req.body; // can be single string or array
    const myId = req.user._id;

    // Ensure messageIds is always an array
    if (!Array.isArray(messageIds)) {
      if (!messageIds) {
        return res
          .status(400)
          .json({ success: false, message: "messageIds is required" });
      }
      messageIds = [messageIds]; // wrap single ID into array
    }

    if (messageIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "messageIds must not be empty" });
    }

    // Update all unseen messages
    const updatedMessages = await Message.updateMany(
      { _id: { $in: messageIds }, receiver: myId, seen: false },
      { seen: true }
    );

    // Emit socket events for each updated message
    const updatedMsgs = await Message.find({ _id: { $in: messageIds } });
    updatedMsgs.forEach((msg) => {
      const senderSocketId = userSocketMap[msg.sender.toString()];
      if (senderSocketId) {
        io.to(senderSocketId).emit("messagesSeen", {
          id: msg._id,
          by: myId,
        });
      }
    });

    res.json({
      success: true,
      message: `${updatedMessages.modifiedCount} messages marked as seen`,
    });
  } catch (error) {
    console.error("messagesSeen error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.id;
    const { text, image } = req.body;

    if (!receiver) return res.status(400).json({ message: "Receiver is required" });
    if (!text && !image)
      return res.status(400).json({ message: "Message cannot be empty" });

    let newMessage = new Message({ sender, receiver, text, image });
    await newMessage.save();

    await newMessage.populate([
      { path: "sender", select: "fullName profilePic email" },
      { path: "receiver", select: "fullName profilePic email" },
    ]);

    const receiverSocketId = userSocketMap[receiver];
    if (receiverSocketId) io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const message = await Message.findById(id);
    if (!message)
      return res.status(404).json({ success: false, message: "Message not found" });

    if (String(message.sender) !== String(userId))
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to delete this message" });

    message.deleted = true;
    message.text = "This message was deleted";
    message.image = "";
    await message.save();

    const senderSocketId = userSocketMap[message.sender];
    const receiverSocketId = userSocketMap[message.receiver];

    if (senderSocketId) io.to(senderSocketId).emit("messageDeleted", message);
    if (receiverSocketId) io.to(receiverSocketId).emit("messageDeleted", message);

    res.json({ success: true, message: "Message deleted", data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
