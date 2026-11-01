const express = require("express");
const router = express.Router();

const {
    sendMessage,
    getMessages
} = require("../controller/messageController");

const authMiddleware = require("../middleware/authMiddleware");

// Send message
router.post("/", authMiddleware, sendMessage);

// Get conversation messages
router.get("/:userId", authMiddleware, getMessages);

module.exports = router;