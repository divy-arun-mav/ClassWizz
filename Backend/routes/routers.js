const express = require('express');
const router = express.Router();1
const service = require('../controllers/service');
<<<<<<< HEAD
// const authMiddleware = require('../middlewares/authMiddleware')

router.post('/signIn', service.signin);
router.post('/signUp', service.signup);
router.get('/user', authMiddleware, service.user)
=======
const authMiddleware1 = require('../middlewares/teacherAuth')
const authMiddleware2 = require('../middlewares/studentAuth')
const authMiddleware3 = require('../middlewares/adminAuth')

router.post('/signin', service.signin);
router.post('/signup', service.signup);
router.get('/getclassroom', authMiddleware1, service.getclass);
router.put('/updateclass', authMiddleware1, service.updateclass);
>>>>>>> ac05a237cc30a680331d37836a505639b3ff0535

module.exports = router;