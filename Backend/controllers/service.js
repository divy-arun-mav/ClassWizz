require('dotenv').config()
const Classroom = require("../models/Classroom")
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Subject = require('../models/Subject');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secureConnection: false,
  auth: {
    user: "am7620613@gmail.com",
    pass: "yjiqasnwcujeqyds",
  }
});

exports.sendMsg = async (req, res) => {
  const { branch, msg, mail } = req.body;
  console.log(branch, msg, mail);
  if (!branch || !msg) {
    return res.status(422).json({ error: 'All Fields Are Required!' });
  }
  try {
    const mailid = await Student.find({ branch: branch }, 'mail');
    const emailAddresses = mailid.map(student => student.mail);

    const info = await transporter.sendMail({
      from: mail,
      to: emailAddresses.join(','),
      subject: "From DJSCE",
      text: "Hello world?",
      html: `<b>${msg}</b>`,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });

  } catch (err) {
    console.error(`Error sending message: ${err}`);
    return res.status(500).json({ error: `Internal Server Error -> ${err}` });
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

exports.students = async (req, res) => {
  try {
    const data = await Student.find({});
    res.status(200).json({ msg: data })
  } catch (error) {
    console.log(error)
  }
}


exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { facility, class: classroom_no, strength } = req.query;
  try {
    const updatedClassroom = await Classroom.findOneAndUpdate(
      { _id: id },
      { $set: { facility: facility, strength: strength, classroom_no: classroom_no } },
      { useFindAndModify: false, new: true }
    );

    if (!updatedClassroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    return res.status(200).json({ Updated_Classroom: updatedClassroom });
  } catch (err) {
    return res.status(500).json({ error: `Internal Server Error -> ${err}` });
  }
};


exports.pclass = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Classroom.findById(id);
    res.status(200).json({ msg: data })
  } catch (error) {
    console.log(error)
  }
}

exports.classrooms = async (req, res) => {
  try {
    const data = await Classroom.find({});
    res.status(200).json({ msg: data })
  } catch (error) {
    console.log(error)
  }
}

exports.signup = async (req, res) => {
  const { username, mail, subject, teacher_id, student_id, type, password, branch, yos } = req.body;


  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRege = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!mail || !password || !type) {
    return res.status(422).json({ error: "Please provide a valid username and password" });
  }

  if (!emailRegex.test(mail)) {
    alert("Invalid Email");
    return;
  }
  else if (!passRege.test(password)) {
    alert("Password must contain atleast 8 characters, including atleast 1 number and 1 includes both lower and uppercase letters and special characters for example #,?!");
    return;
  }



  try {
    let userType;

    if (type === 'Student') {
      userType = 'Student';
      if (!username || !password || !student_id || !mail || !branch || !yos) {
        console.log('Please add all the required fields');
        return res.status(422).json({ error: "Please add all the required fields" });
      }
    } else if (type === 'Admin') {
      userType = 'Admin';
      if (!username || !password || !mail) {
        console.log('Please add all the required fields');
        return res.status(422).json({ error: "Please add all the required fields" });
      }
    } else if (type === 'Teacher') {
      userType = 'Teacher';
      if (!username || !password || !teacher_id || !mail || !subject) {
        console.log('Please add all the required fields');
        return res.status(422).json({ error: "Please add all the required fields" });
      }
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
    const { strength } = req.query;

    if (isNaN(strength)) {
      return res.status(400).json({ error: "Strength parameter must be a valid number" });
    }

    const classrooms = await Classroom.find({
      isReserved: false,
      strength: { $gte: strength }
    }).select('classroom_no strength facility isReserved');


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
  const { id } = req.query;
  const{username} = req.body;
  try {
    const classroom = await Classroom.findOneAndUpdate(
      { _id: id },
      { $set: { isReserved: true, faculty_name:username } },
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

// Assuming you have the necessary imports and configurations

exports.putAttendance = async (req, res) => {
  const { student_id, sub_name, presentLec, totalLec } = req.body;

  try {
    const student = await Student.findOne({ student_id });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const existingAttendance = student.attendance.find(att => att.sub_name === sub_name);

    if (existingAttendance) {
      existingAttendance.presentLec += presentLec;
      existingAttendance.totalLec += totalLec;
      existingAttendance.timestamp = Date.now();
    } else {
      student.attendance.push({
        sub_name,
        presentLec,
        totalLec,
        timestamp: Date.now(),
      });
    }

    await student.save();

    res.status(200).json({ message: "Attendance updated successfully", });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAttendanceForStudent = async (req, res) => {
  const { student_id } = req.body;
  console.log("Request Body:", req.body);
  console.log("USERID:", student_id);
  try {
    const student = await Student.findOne({ student_id });
    console.log("STU:", student)
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const attendanceData = student.attendance;
    const totalAttendancePercentage = calculateTotalAttendancePercentage(attendanceData);
    const subjectWiseAttendance = calculateSubjectWiseAttendance(attendanceData);

    console.log(attendanceData);
    console.log(totalAttendancePercentage);
    console.log(subjectWiseAttendance)

    res.status(200).json({
      attendanceData,
      totalAttendancePercentage,
      subjectWiseAttendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to calculate total attendance percentage
const calculateTotalAttendancePercentage = (attendanceData) => {
  if (attendanceData.length === 0) {
    return 0; // To avoid division by zero
  }

  const totalPresentLectures = attendanceData.reduce((total, entry) => total + entry.presentLec, 0);
  const totalAbsentLectures = attendanceData.reduce((total, entry) => total + entry.totalLec, 0);
  const totalLectures = totalPresentLectures + totalAbsentLectures;

  const totalAttendancePercentage = (totalPresentLectures / totalLectures) * 100;
  return totalAttendancePercentage.toFixed(2); // Rounding to two decimal places
};

// Function to calculate subject-wise attendance percentages
const calculateSubjectWiseAttendance = (attendanceData) => {
  const subjectWiseAttendance = {};

  attendanceData.forEach((entry) => {
    const { sub_name, presentLec, totalLec } = entry;

    if (totalLec > 0) {
      const subjectAttendancePercentage = (presentLec / totalLec) * 100;
      subjectWiseAttendance[sub_name] = subjectAttendancePercentage.toFixed(2);
    } else {
      subjectWiseAttendance[sub_name] = "N/A"; // Not applicable when total lectures are zero
    }
  });

  return subjectWiseAttendance;
};

exports.revokeClass = async (req, res) => {
  const { classId } = req.body;
  if (!classId) {
    res.status(500).json({ error: "Please enter a valid ID" })
  }
  try {
    const className = await Classroom.findOneAndUpdate(
      { _id: classId },
      { isReserved: false },
      { useFindAndModify: false, new: true }
    )
    if (!className) {
      return res.status(404).json({ message: 'No reserved classrooms found.' });
    }

    res.status(200).json({ message: 'Classroom updated successfully', className });
  } catch (e) {
    console.log(e);
    res.json({ error: e })
  }
}