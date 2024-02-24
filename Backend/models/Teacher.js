const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
    teacher_id:{
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    isTeacher: {
        type: Boolean,
        default: true
    }
});

teacherSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id.toString(),
                username: this.username,
                user_type: "Teacher",
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            },
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

const Teacher = mongoose.model("teacher", teacherSchema);
module.exports = Teacher;
