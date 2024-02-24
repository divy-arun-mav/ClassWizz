// models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    }],
    labs: [{
        type: Number,
    }],
    classesEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
