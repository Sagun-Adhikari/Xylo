const Message = require("../models/messageModel");

// SEND MESSAGE
async function sendMessage(req, res) {
    const { receiver, message } = req.body;

    if (!receiver || !message || !message.trim()) {
        return res.status(400).json({
            message: "Receiver and message are required"
        });
    }

    const newMessage = await Message.create({
        sender: req.user.id,
        receiver: receiver,
        message: message
    });

    // Get Socket.IO instance
    const io = req.app.get("io");

    // Send message to receiver's private room
    io.to(receiver.toString()).emit("newMessage", newMessage);

    res.status(201).json({
        message: "Message sent successfully",
        data: newMessage
    });
}


// GET MESSAGES BETWEEN TWO USERS
async function getMessages(req, res) {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
        $or: [
            {
                sender: currentUserId,
                receiver: userId
            },
            {
                sender: userId,
                receiver: currentUserId
            }
        ]
    }).sort({ createdAt: 1 });

    res.status(200).json({
        messages: messages
    });
}

module.exports = { sendMessage, getMessages };