import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import Message from "./models/Message.js"; // Import Message model

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Socket.io setup
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users
export const userSocketMap = {};

// Middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// Socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Listen for new message events (optional if you also emit from REST)
  socket.on("sendMessage", async ({ messageData, receiverId }) => {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      await newMessage.populate([
        { path: "sender", select: "fullName profilePic email" },
        { path: "receiver", select: "fullName profilePic email" },
      ]);

      // Emit to receiver
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId)
        io.to(receiverSocketId).emit("newMessage", newMessage);

      // Emit back to sender to update UI
      io.to(socket.id).emit("newMessage", newMessage);
    } catch (error) {
      console.error("sendMessage error:", error.message);
    }
  });

  // Listen for messages seen
  socket.on("messagesSeen", async ({ messageIds }) => {
    try {
      for (const msgId of messageIds) {
        const msg = await Message.findByIdAndUpdate(
          msgId,
          { seen: true },
          { new: true }
        ).populate("sender");
        if (!msg) continue;

        const senderId = msg.sender._id.toString();
        const senderSocketId = userSocketMap[senderId];
        if (senderSocketId) {
          io.to(senderSocketId).emit("messagesSeen", { messageId: msg._id });
        }
      }
    } catch (error) {
      console.error("messagesSeen error:", error.message);
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// Routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect DB
await connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);

export default server;
