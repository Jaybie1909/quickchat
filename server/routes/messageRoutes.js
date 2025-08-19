import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessagesAsSeen,
  markManyMessagesAsSeen,
  sendMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

// Get all users except logged-in user (sidebar)
messageRouter.get("/users", protectRoute, getUsersForSidebar);

// Get messages for selected user
messageRouter.get("/:id", protectRoute, getMessages);

// Mark a single message as seen
messageRouter.put("/mark/:id", protectRoute, markMessagesAsSeen);

// ✅ Mark multiple messages as seen (new)
messageRouter.put("/mark-many", protectRoute, markManyMessagesAsSeen);

// Send a new message
messageRouter.post("/send/:id", protectRoute, sendMessage);

// Delete a message
messageRouter.delete("/:id", protectRoute, deleteMessage);

export default messageRouter;
