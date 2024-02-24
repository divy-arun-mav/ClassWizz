require('dotenv').config()
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt')
const authMiddleware = require('../middlewares/auth');
const jwt = require('jsonwebtoken')

exports.signin = async (req, res) => {
    const { username, password, type } = req.body;
  
    if (!username || !password) {
      return res.status(422).json({ error: "Please provide a valid username and password" });
    }
  
    if(type=="admin"){
        try {
            const user = await Admin.findOne({ username });
        
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
    else if(type=="teacher"){
        try {
            const user = await Teacher.findOne({ username });
        
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
    else{
        try {
            const user = await Student.findOne({ username });
        
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
      const userData = req.User;
      console.log(userData);
      res.status(200).json({ msg: userData })
    } catch (error) {
      console.log(error)
    }
  }

  

  exports.signup = async (req, res) => {
    const { username, password, mail, type, branch, yos, id, subject } = req.body;

    if (!username || !password) {
        console.log('Please add all the required fields');
        return res.status(422).json({ error: "Please add all the required fields" });
    }

    try {
        let userType;

        if (type === 'student') {
            userType = 'student';
        } else if (type === 'admin') {
            userType = 'admin';
        } else if (type === 'teacher') {
            userType = 'teacher';
        } else {
            console.log('Invalid user type');
            return res.status(422).json({ error: 'Invalid user type' });
        }

        const existingUser = await (userType === 'admin' ? Admin : (userType === 'student' ? Student : Teacher)).findOne({
            $or: [{ username: username }, { mail: mail }]
        });

        if (existingUser) {
            console.log(`User already exists with that username or email (${userType} type)`);
            return res.status(422).json({ error: `User already exists with that username or email (${userType} type)` });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = userType === 'admin' ? new Admin({ username, password: hashedPassword, mail })
            : (userType === 'student' ? new Student({ username, password: hashedPassword, mail, id, branch, yos })
                : new Teacher({ username, password: hashedPassword, mail, id,subject }));

        user.save().then(async (user) => {
            return res.json({
                message: "Registered Successfully",
                token: await user.generateToken(),
                userId: user._id.toString(),
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