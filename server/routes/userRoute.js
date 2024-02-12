const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleSignup,
  handleGetUser,
  handleUpdateProfile,
  handleForgetPassword,
  handleResetPassword,
  handleApplication,
} = require("../controllers/userController");
const upload = require("../middleware/uploadMiddleware");

//login route
router.route("/").post(handleLogin);
//register route
router.route("/signup").post(handleSignup);
//get user details
router.route("/get-user").post(handleGetUser);
//Update user details
router
  .route("/user-profile", upload.single("profilePicture"))
  .post(handleUpdateProfile);
//forget password
router.route("/forgetpassword").post(handleForgetPassword);
//password reset
router.route("/resetpassword/:token").post(handleResetPassword);
//application
router.route("/apply-mentor").post(handleApplication);

module.exports = router;
