const express = require("express");
const { 
  signup,
  login,
  userDetails,
  resetpassword,
  deleteAcount,

} = require("../controllers/userController");

const isAuth = require('../middlewares/authentication.middleware');


const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').get(login);
router.route('/userDetails').post(isAuth, userDetails);


module.exports = router;