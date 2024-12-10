const express = require('express');
const { getChatHistory } = require('../controllers/message.controller');
const authenticate  = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/history/:userId', authenticate, getChatHistory);

module.exports = router;
