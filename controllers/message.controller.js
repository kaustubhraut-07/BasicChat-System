const Message = require('../models/message.model');

const getChatHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching chat history' });
  }
};

module.exports = { getChatHistory };
