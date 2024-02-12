const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const Doctor = require("../models/Doctor");
dotenv.config();

//registerController
const calculateAge = (age) => {
  const dobDate = new Date(age);
  if (isNaN(dobDate.getTime())) {
    throw new Error("Invalid date of birth provided");
  }
  const diff = Date.now() - dobDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
async function handleSignup(req, res) {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Account already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const age = req.body.dob;
    const dob = calculateAge(age);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      dob,
    };
    const user = await User.create(newUser);
    res.status(200).json({ message: "Success", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
//loginController
async function handleLogin(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "solace"
      );
      loginUser = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      res.status(200).json({ message: "Success", token, loginUser });
    } else {
      res.status(401).json({ message: "Error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
//Get user details
handleGetUser = async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing Authorization header" });
    }

    const token = tokenHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token is null" });
    }

    try {
      const decodedToken = jwt.verify(token, "solace");

      const user = await User.findOne({ email: decodedToken.email });
      if (user) {
        const userData = {
          username: user?.username,
          email: user?.email,
          age: user?.dob,
          role: user?.role,
          profileImage: user?.profileImage,
          bio: user?.bio,
          UnseenNotifications: user?.UnseenNotifications,
          SeenNotifications: user?.SeenNotifications,
        };

        return res.json({ userData });
      }

      return res.status(401).json({ message: "No user found" });
    } catch (tokenError) {
      console.error("Token error:", tokenError);

      if (tokenError.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Unauthorized: Malformed token" });
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//delete user
//forgot-password
async function handleForgetPassword(req, res) {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  //Get reset token
  const resetToken = user.getResetToken();
  await user.save();
  //Create reset url
  const resetUrl = `http://localhost:5173/resetpassword/${resetToken}`;
  const message = `
    You have requested a password reset\n
    Please go to this link to reset your password\n
  `;
  sendMail(user.email, message, resetUrl);

  res.status(200).json({ message: "Email Sent" });
}
//password reset

async function handleResetPassword(req, res) {
  const { token } = req.params;
  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    resetpasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) return res.status(400).json({ message: "Invalid Token" });
  //Set new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  user.resetpasswordToken = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
}
//profile update
handleUpdateProfile = async (req, res) => {
  try {
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing Authorization header" });
    }

    const token = tokenHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "solace");
    const email = decodedToken.email;
    const user = await User.findOne({ email });
    const profileImage = req.file ? req.file.path : user.profileImage;
    console.log(profileImage);
    if (user) {
      // Update the user data based on the request body
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.dob = req.body.dob || user.dob;
      user.bio = req.body.bio || user.bio;
      user.profileImage = profileImage || user.profileImage;

      // Save the updated user
      const updatedUser = await user.save();

      console.log(updatedUser);
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//Doctor Application
async function handleApplication(req, res) {
  try {
    const existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res.status(409).json({
        message: "Doctor account already exists",
      });
    }
    const newDoctor = new Doctor({
      username: req.body.username,
      email: req.body.email,
      experience: req.body.experience,
      description: req.body.bio,
      PhoneNumber: req.body.PhoneNumber,
      AvalibilityFrom: req.body.AvalibilityFrom,
      AvalibilityTo: req.body.AvalibilityTo,
      website: req.body.website,
      address: req.body.address,
      city: req.body.city,
      status: "pending",
    });
    await newDoctor.save();
    const adminUser = await User.findOne({ role: "admin" });
    console.log(adminUser);
    const UnseenNotifications = adminUser.UnseenNotifications;
    UnseenNotifications.push({
      message: `${newDoctor.username} has applied to be a doctor.`,
      data: {
        doctorId: newDoctor._id,
        doctorName: newDoctor.username,
        status: "pending",
      },
      onClickPath: "/applications",
    });
    await User.findByIdAndUpdate(adminUser._id, { UnseenNotifications });
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error applying for doctor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  handleLogin,
  handleSignup,
  handleGetUser,
  handleUpdateProfile,
  handleForgetPassword,
  handleResetPassword,
  handleApplication,
};
