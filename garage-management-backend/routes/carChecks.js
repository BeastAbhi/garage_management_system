const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const CarsChecks = require("../models/CarChecks");
const { body, validationResult } = require("express-validator");
const CarChecks = require("../models/CarChecks");

//Rout 1: GET all the carChecks of a perticular car: POST "/api/carchecks/fetchcarchecks" Login require
router.post(
  "/fetchcarchecks",
  fetchuser,
  [body("carNumber", "Car number is Invalid").isLength({ min: 10, max: 10 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    try {
      //This will fetch all the posts
      const carChaecks = await CarsChecks.find({
        carNumber: req.body.carNumber,
      });
      res.send({ carChaecks, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ err: "Oops Something went wrong!", success: false });
    }
  }
);

//Rout 2: add a carchecks: POST "/api/carchecks/addcarchecks" Login require
router.post(
  "/addcarchecks",
  fetchuser,
  [
    body("carNumber", "Car number is Invalid").isLength({ min: 10, max: 10 }),
    body("toolKit", "Please Selete Tool Kit").isBoolean(),
    body("centerLock", "Please Selete Center Lock").isBoolean(),
    body("powerWindow", "Please Selete Power Window").isBoolean(),
    body("images.frontImageURI", "Please Selete Front Imgae").notEmpty(),
    body("images.rightImageURI", "Please Selete Right side Imgae").notEmpty(),
    body("images.backImageURI", "Please Selete Back Imgae").notEmpty(),
    body("images.leftImageURI", "Please Selete Left side Imgae").notEmpty(),
  ],
  async (req, res) => {
    const {
      carNumber,
      toolKit,
      centerLock,
      powerWindow,
      images,
      technician,
      advisory,
      note
    } = req.body;
    const { frontImageURI, rightImageURI, backImageURI, leftImageURI } = images;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, error: errors.array() });
    }
    try {
      const carChecks = new CarsChecks({
        carNumber,
        toolKit,
        centerLock,
        powerWindow,
        images: {
          frontImageURI,
          rightImageURI,
          backImageURI,
          leftImageURI,
        },
        technician,
        advisory,
        note
      });
      const saveCar = await carChecks.save();
      res.send({ saveCar, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ err: "Oops some thing went wrong!!", success: false });
    }
  }
);

//Rout 3:delete the carCheck: delete "/api/posts/deletecarcheck" Login require
router.delete("/deletecarcheck/:id", fetchuser, async (req, res) => {
  try {
    // Find the car check to be deleted
    let carCheck = await CarChecks.findById(req.params.id);
    if (!carCheck) {
      return res.status(404).send({ err: "Not found", success: false });
    }
    //Delete the car Checks
    carCheck = await CarChecks.findByIdAndDelete(req.params.id);
    res.send({ msg: "Car Check has been deleted", success: true });
  } catch (error) {
    res
      .status(500)
      .send({ err: "Oops some thing went wrong!!", success: false });
  }
});

//Rout 4: GET all the carChecks: POST "/api/carchecks/allcarchecks" Login require
router.post("/allcarchecks", fetchuser, async (req, res) => {
  try {
    //This will fetch all the posts
    const carChaecks = await CarsChecks.find();
    res.send({ carChaecks, success: true });
  } catch (error) {
    res.status(500).send({ err: "Oops Something went wrong!", success: false });
  }
});

module.exports = router;
