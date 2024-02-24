const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
    classroom_no: {
        type: String,
        required: true,
    },
    isReserved: {
        type: Boolean,
        required: true,
        default: false
    },
    isLab: {
        type: Boolean,
        required: true,
        default: false
    },
    reservedBy: {
        type: Schema.Types.ObjectId,
        ref: 'teacher',
    }
});

const Classroom = mongoose.model("classroom", classroomSchema);
module.exports = Classroom;
