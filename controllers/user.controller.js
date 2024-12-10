const User = require('../models/user.model');

const updateUserStatus = async (userId, status) => {
  try {
    await User.findByIdAndUpdate(userId, { status });
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

module.exports = { updateUserStatus };
