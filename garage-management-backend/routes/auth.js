const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fetchuser = require("../middleware/fetchUser");

secreate = process.env.JWT_SECRET;

//Rout 1: Create a User using: POST "/api/auth/signup" . NO login required
router.post(
  "/signup",
  [
    body("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    body("phoneNo", "Invalid phone Number").isLength({ min: 10, max:10 }),
    body("password", "Password must be at leat 6 characters").isLength({
      min: 8,
    }),
    body("userName", "User Name should not be Empty").isLength({ min: 1 }),
  ],
  async (req, res) => {
    //This will validate the entred data and respond as per the data
    //It will return bad request if there are any errors in the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    try {
      //This will check wheather user already exists with this phone number
      let user = await User.findOne({ userName: req.body.userName });
      if (user) {
        success = false;
        return res.status(400).json({
          success,
          err: "Sorry a user with this User Name already exists",
        });
      }

      //This will encrypt the password
      //We are using the npm package bcrypt for encryption
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //This will create new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        phoneNo: req.body.phoneNo,
        userName: req.body.userName,
      });

      // This is use for verifying the user by Json web token
      //And will generate authintication token for the user
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, secreate);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      success = false;
      res.status(500).send({ success, err: "Oops some thing went wrong!!" });
    }
  }
);

//Rout 2: Authenticateing an user using: POST "/api/auth/login" . NO login required
router.post(
  "/login",
  [
    body("userName", "Invalid userName").isLength({ min: 1 }),
    body("password", "Password should be at least 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    //This will validate the entred data and respond as per the data
    //It will return bad request if there are any errors in the data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    const { userName, password } = req.body;
    try {
      //This will check if user entered correct credentials
      let user = await User.findOne({ userName });
      if (!user) {
        success = false;
        return res.status(400).json({
          success,
          err: "Please Try to login with correct credentials!",
        });
      }
      const passCompair = await bcrypt.compare(password, user.password);
      if (!passCompair) {
        success = false;
        return res.status(400).json({
          success,
          err: "Please Try to login with correct credentials!",
        });
      }

      // This is use for verifying the user by Json web token
      //And will generate authintication token for the user
      //This id will be preasent in the authtoken
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, secreate);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      success = false;
      res.status(500).send(success, "Oops some thing went wrong!!");
    }
  }
);

//Rout 3: Getting User data using: POST "/api/auth/getuser" . login require
//The fecthuser in the below line is for authanticate the authtoken send by the user
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send({user, success:true});
  } catch (error) {
    res.status(500).send("Oops some thing went wrong!!");
  }
});

//Rout 4: Updating User data using: PUT "/api/auth/updateuser" . login require
router.put(
  "/updateuser",
  fetchuser,
  [
    body("name", "Name should be at least 5 characters").isLength({ min: 5 }),
    body("userName", "Invalid userName").isLength({ min: 1 }),
    body("phoneNo", "Invalid phone Number").isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }

    try {
      const newUser = {};
      const { name, userName, phoneNo } = req.body;

      if (name) {
        newUser.name = name;
      }
      if (userName) {
        newUser.userName = userName;
      }
      if (phoneNo) {
        newUser.phoneNo = phoneNo;
      }
      const userId = req.user.id;
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      ).select("-password");
      res.send({user, success:true});
    } catch (error) {
      success = false;
      res.status(500).send(success, "Oops some thing went wrong!!");
    }
  }
);

//Rout 5:delete the user: delete "/api/auth/deleteuser" Login require
router.delete("/deleteuser", fetchuser, async (req, res) => {
  //This will validate the entred data and respond as per the data
  //It will return bad request if there are any errors in the data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ success, error: errors.array() });
  }

  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user) {
      success = false;
      return res.status(400).json({ success, err: "User not Found!!" });
    }

    //Delete the user
    user = await User.findByIdAndDelete(req.user.id);
    res.send({msg:"User has been deleted", success:true});
  } catch (error) {
    res.status(500).send({err:"Oops some thing went wrong!!",success:false});
  }
});

//Rout 6: Changing User Password: PUT "/api/auth/changepassword" . login require
router.put(
  "/changepassword",
  fetchuser,
  [
    body("oldPassword", "Password should be at least 8 characters").isLength({ min: 8 }),
    body("newPassword", "Password should be at least 8 characters").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }

    try {
      const newUser = {};
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      let user = await User.findById(userId);
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, err: "Please Try to enter correct password!" });
      }
      const passCompair = await bcrypt.compare(oldPassword, user.password);
      if (!passCompair) {
        success = false;
        return res.status(400).json({
          success,
          err: "Please Enter correct Password!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(newPassword, salt);

      newUser.password = secPass;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      ).select("-password");
      success = true;
      res.json({ success, updatedUser });
    } catch (error) {
      success = false;
      return res
        .status(500)
        .send({ success, err: "Oops some thing went wrong!!" });
    }
  }
);

module.exports = router;
