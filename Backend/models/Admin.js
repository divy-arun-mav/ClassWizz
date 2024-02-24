const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    }
});

adminSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                username: this.username,
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

const Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;
