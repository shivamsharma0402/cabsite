const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.signup = async (req,res,next)=>{
  const { email, name, password, userid } = req.body;
  console.log( email, name, password, userid );
  const hashedPwd = await bcrypt.hash(password,12);

  try{
    const user = new User({
      email: email,
      name: name,
      password: hashedPwd,
      userid: userid
    });
    await user.save();
    console.log(res);
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
    userid: loadedUser.userid
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
    const { firstname, lastname, age, gender, usualtype } = req.body;
    const loadedUserid = req.userid;
    try {
      const user = await User.findOne({ userid: loadedUserid });
      if(user) {
        user.name.firstname = firstname;
        user.name.lastname = lastname;
        user.age = age;
        user.gender = gender;
        user.usualtype = usualtype;
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
