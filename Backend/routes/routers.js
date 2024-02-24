const express = require('express');
const router = express.Router();1
const service = require('../controllers/service');
const authMiddleware1 = require('../middlewares/teacherAuth')
const authMiddleware2 = require('../middlewares/studentAuth')
const authMiddleware3 = require('../middlewares/adminAuth')

router.post('/signin', service.signin);
router.post('/signup', service.signup);
router.get('/getclassroom', authMiddleware1, service.getclass);
router.put('/updateclass', authMiddleware1, service.updateclass);

module.exports = router;