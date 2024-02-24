require('dotenv').config()
const Classroom = require("../models/Classroom")
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signin = async (req, res) => {
  const { mail, password, type } = req.body;

  if (!mail || !password || !type) {
    return res.status(422).json({ error: "Please provide a valid username and password" });
  }

  if (type == "Admin") {
    try {
      const user = await Admin.findOne({ mail });

      if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
        const token = jwt.sign({ _id: user.id }, secretKey);

        return res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials!!!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  else if (type == "Teacher") {
    try {
      const user = await Teacher.findOne({ mail });

      if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
        const token = jwt.sign({ _id: user.id }, secretKey);

        return res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials!!!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  else {
    try {
      const user = await Student.findOne({ mail });

      if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
        const token = jwt.sign({ _id: user.id }, secretKey);

        return res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials!!!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

exports.user = async (req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({ msg: userData })
  } catch (error) {
    console.log(error)
  }
}

exports.signup = async (req, res) => {
  const { username, mail, subject, teacher_id, student_id, type, password, branch, yos } = req.body;

  if (!username || !password) {
    console.log('Please add all the required fields');
    return res.status(422).json({ error: "Please add all the required fields" });
  }

  try {
    let userType;

    if (type === 'Student') {
      userType = 'Student';
    } else if (type === 'Admin') {
      userType = 'Admin';
    } else if (type === 'Teacher') {
      userType = 'Teacher';
    } else {
      console.log('Invalid user type');
      return res.status(422).json({ error: 'Invalid user type' });
    }

    const existingUser = await (userType === 'Admin' ? Admin : (userType === 'Student' ? Student : Teacher)).findOne({
      $or: [{ username: username }, { mail: mail }]
    });

    if (existingUser) {
      console.log(`User already exists with that username or email (${userType} type)`);
      return res.status(422).json({ error: `User already exists with that username or email (${userType} type)` });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = userType === 'Admin' ? new Admin({ username, password: hashedPassword, mail })
      : (userType === 'Student' ? new Student({ username, password: hashedPassword, mail, student_id, branch, yos })
        : new Teacher({ username, password: hashedPassword, mail, teacher_id, subject }));

    user.save().then(async (user) => {
      return res.json({
        message: "Registered Successfully",
        token: await user.generateToken(),
        userId: user._id,
        userType: userType
      });
    }).catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};




exports.getclass = async (req, res) => {
  try {
    const {strength} = req.query;
    // console.log("STRENGTH:",strength);

    if (isNaN(strength)) {
      return res.status(400).json({ error: "Strength parameter must be a valid number" });
    }

    const classrooms = await Classroom.find({
      isReserved: false,
      strength: { $gte: strength }
    });

    if (classrooms.length === 0) {
      console.log("No classes found with isReserved set to false");
      return res.status(404).json({ error: "No classes found" });
    }

    console.log("Classes with isReserved set to false:", classrooms);
    res.status(200).json({ classrooms });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.updateclass = async (req, res) => {
  const { id } = "65d9bc4bad644bba959fac50";

  if (!req.Teacher || !req.Teacher.username) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { username: faculty_name } = req.Teacher;

  try {
    const classroom = await Classroom.findOneAndUpdate(
      { _id: "65d9bc4bad644bba959fac50" },
      { $set: { isReserved: true, faculty_name } },
      { useFindAndModify: false, new: true }
    );

    if (!classroom) {
      return res.status(404).json({ message: 'No reserved classrooms found.' });
    }

    res.status(200).json({ message: 'Classroom updated successfully', classroom });
  } catch (e) {
    console.log(e);

    res.status(500).json({ message: 'Internal server error' });
  }
};

