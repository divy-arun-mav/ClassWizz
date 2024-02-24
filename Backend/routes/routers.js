const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
// const authMiddleware = require('../middlewares/authMiddleware')

router.post('/signIn', service.signin);
router.post('/signUp', service.signup);


module.exports = router;