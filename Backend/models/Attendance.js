const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    isPresent: {
        type: Boolean,
        default: false,
    },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
