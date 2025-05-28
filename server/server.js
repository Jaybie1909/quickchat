import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

//Socket.io setup
export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://quickchat-nine.vercel.app", "http://localhost:5173"]
        : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  path: "/socket.io/",
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
});

//Store online users
export const userSocketMap = {};

//Middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://quickchat-nine.vercel.app", "http://localhost:5173"]
        : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

//Socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//Routes setup
app.use("/api/status", (req, res) => {
  res.send("Server is live");
});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

//Export server for vercel
export { app, server };
