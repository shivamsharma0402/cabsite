const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    const error = new Error('Not authenticated')
  }
  const token = authHeader.split(' ')[1];
    let decodedToken;
  try{
    decodedToken = jwt.verify(token, 'somecretsecretfffffffffff');
  } catch(err) {
    console.log('fvfdfsd');
    err.statusCode = 500;
    throw err; 
  }
  if(!decodedToken) {
    const error = new Error('not auhenticated');
    error.statusCode = 401;
    throw error;
  }
  console.log('ffdgdfg');
  console.log(decodedToken);
  req.userid = decodedToken.userid;
  next();
}