const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
// const authMiddleware = require('../middlewares/authMiddleware')

router.get('/payment_history_serviceProvider',authMiddleware, service.history);


module.exports = router;