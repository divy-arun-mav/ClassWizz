const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    student_id: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    yos: {
        type: Number,
        required: true,
    },
    isStudent: {
        type: Boolean,
        default: true
    },
    attendance: [{
        sub_name: String,
        presentLec: {
            type: Number,
            default: 0
        },
        totalLec: {
            type: Number,
            default: 0
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }]
});

studentSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id.toString(),
                username: this.username,
                student_id:this.student_id,
                user_type: "Student",
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
