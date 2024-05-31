const Message = require('../models/Message');

// Controller untuk membuat pesan baru
exports.createMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;
        const newMessage = await Message.addMessage({
            sender_id,
            receiver_id,
            message
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan semua pesan
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.getAllMessages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk mendapatkan pesan berdasarkan ID
exports.getMessageById = async (req, res) => {
    try {
        const messageId = req.params.id;
        const message = await Message.getMessageById(messageId);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk memperbarui pesan berdasarkan ID
exports.updateMessageById = async (req, res) => {
    try {
        const messageId = req.params.id;
        const { sender_id, receiver_id, message } = req.body;
        const updatedMessage = await Message.updateMessageById(messageId, {
            sender_id,
            receiver_id,
            message
        });
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller untuk menghapus pesan berdasarkan ID
exports.deleteMessageById = async (req, res) => {
    try {
        const messageId = req.params.id;
        await Message.deleteMessageById(messageId);
        res.status(204).json();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
