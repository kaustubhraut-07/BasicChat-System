const Message = require('../models/message.model.js');
const { updateUserStatus } = require('../controllers/user.controller');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;

    // Mark user online
    updateUserStatus(userId, 'online');
    socket.broadcast.emit('user-status', { userId, status: 'online' });

    // Handle sending messages
    socket.on('send-message', async (data) => {
      const { sender, receiver, message } = data;

      // Save message to database
      const newMessage = new Message({ sender, receiver, message });
      await newMessage.save();

      // Notify receiver
      io.to(receiver).emit('receive-message', newMessage);
    });

    // Handle delivery status
    socket.on('message-delivered', async (messageId) => {
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { status: 'delivered' },
        { new: true }
      );

      // Notify sender
      io.to(updatedMessage.sender).emit('delivery-status', updatedMessage);
    });

    // Mark user offline on disconnect
    socket.on('disconnect', () => {
      updateUserStatus(userId, 'offline');
      socket.broadcast.emit('user-status', { userId, status: 'offline' });
    });
  });
};

module.exports = setupSocket;