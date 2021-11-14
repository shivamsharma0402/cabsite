module.exports = (error,req,res,next)=>{
  console.log(error.statusCode);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message: message, data: data});
};
