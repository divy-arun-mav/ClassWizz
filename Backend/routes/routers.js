const express = require('express');
const router = express.Router(); 1
const service = require('../controllers/service');
const authMiddleware = require('../middlewares/auth');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

router.post('/signin', service.signin);
router.post('/signup', service.signup);
// router.get('/getclassroom', authMiddleware(Teacher), service.getclass);
router.get('/getclassroom', service.getclass);
// router.put('/updateclass', authMiddleware(Teacher), service.updateclass);
router.put('/updateclass', service.updateclass);
router.get('/user1', authMiddleware(Teacher), service.user);
router.get('/user2', authMiddleware(Student), service.user);
router.get('/user3', authMiddleware(Admin), service.user);
router.post('/contact',service.sendMsg);
router.get('/fetchStudents',service.students);
// router.get('/gettotalattendance', service.getTotalattendance);
// router.put('/updateattendance', authMiddleware(Student), service.saveAttendance);
router.put('/putattendance', service.putAttendance);
router.get('/getattendance', service.getAttendanceForStudent);
// router.post('/postsubject', service.setSubject);
module.exports = router;