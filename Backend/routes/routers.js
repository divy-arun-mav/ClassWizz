const express = require('express');
const router = express.Router();
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/auth')

router.post('/signIn', service.signin);
router.post('/signUp', service.signup);
router.get('/getclassroom', authMiddleware, service.getclass);
router.put('/updateclass', authMiddleware, service.updateclass);

module.exports = router;