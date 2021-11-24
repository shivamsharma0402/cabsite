const User = require("../models/user.model");
const UserDetails = require("../models/userdetails.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodeMailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

exports.signup = async (req,res,next)=>{
  const { email, password, userid } = req.body;
  console.log( email, password, userid );
  const hashedPwd = await bcrypt.hash(password,12);

  try{
    const user = new User({
      email: email,
      password: hashedPwd,
      userid: userid,
    });
    await user.save();
    await transporter.sendMail({
      to: email,
      from: 'er.shivam.webdev@gmail.com',
      subject: 'SignUp succeeded!!',
      html: '<h1>Your signup to my cab is succeded!</h1>'
    });
    return res.status(201).json({ message: 'user created successfully', data: user });
  } catch(err){
    if(!err.statusCode) {
      console.log(err.statusCode);
      err.statusCode=500;
    }
    next(err);
  }
};


exports.login = async (req,res,next)=>{
  const { email, password } = req.body;
  console.log( email, password, );
  try{
    const user = await User.findOne({email});
    if(!user){
      const error = new Error('no user found with this email');
      error.statusCode = 401;
      throw error;
    }
  let loadedUser = user;
  const isEqual = bcrypt.compare(user.password, password);
  if(!isEqual){
    const error = new Error("password doesn't match!")
    error.statusCode=401;
    throw error;
  }
  const token = jwt.sign({
    email: loadedUser.email,
    userid: loadedUser.userid,
    _id: loadedUser._id
  }, 'somecretsecretfffffffffff',
  {expiresIn: '1h'});
  res.status(200).json({ token: token, username: loadedUser.userid});

  } catch(err) {
      if(!err.statusCode) {
        console.log(err.statusCode);
        err.statusCode=500;
      }
      next(err);
    }
  };

  exports.userDetails = async (req,res,next)=>{
    const { firstname, lastname, age, gender, dob, usualtype } = req.body;
    const loadedUser = req.user;
    console.log("loadedUserid", loadedUser);

    try {
      const userDetails = await new UserDetails({ 
        userid : req.user._id,
        name: {
          firstname : firstname,
          lastname : lastname,
      },
        age : age,
        gender : gender,
        dob : dob,
        usualtype : usualtype,
      });
      await userDetails.save();
      return res.status(201).json({ message: 'details added', data: userDetails });
    }
    catch (err) {
      if(!err.statusCode) {
        console.log(err.statusCode);
        err.statusCode=500;
      }
      next(err);
    }
  
  };

  exports.resetPasswordLinkSend = async (req,res,next)=>{
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if(user) {
        
      }
      await user.save();
      return res.status(201).json({ message: 'details added', data: user });
    }
    catch (err) {
      if(!err.statusCode) {
        console.log(err.statusCode);
        err.statusCode=500;
      }
      next(err);
    }
  
  };



