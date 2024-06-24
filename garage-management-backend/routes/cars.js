const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Cars = require("../models/Cars");
const { body, validationResult } = require("express-validator");

//Rout 1: GET all the cars: POST "/api/cars/fetchallcars" Login require
router.post("/fetchallcars", fetchuser, async (req, res) => {
  try {
    //This will fetch all the posts
    const cars = await Cars.find();
    res.send({ cars, success: true });
  } catch (error) {
    res.status(500).send({ err: "Oops Something went wrong!", success: false });
  }
});

//Rout 2: Add  a cars: POST "/api/cars/addcar" Login require
router.post(
  "/addcar",
  fetchuser,
  [
    body("carNumber", "Car number is not valid").isLength({ min: 10, max: 10 }),
    body("ownerName", "Owner name should not be empty").isLength({ min: 1 }),
    body("ownerMobNumber", "Mobile number is not valid").isLength({
      min: 10,
      max: 10,
    }),
    body("carModel", "Car model should not be empty").notEmpty(),
    body("serviceStatus", "Service status should not be empty").notEmpty(),
  ],
  async (req, res) => {
    const { carNumber, ownerName, ownerMobNumber, carModel, serviceStatus } =
      req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, error: errors.array() });
      }
    try {
      const car = new Cars({
        carNumber,
        ownerName,
        ownerMobNumber,
        carModel,
        serviceStatus,
      });
      const saveCar = await car.save();
      res.send({ saveCar, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ err: "Oops some thing went wrong!!", success: true });
    }
  }
);

//Rout 3: Update car detail: PUT "/api/cars/updatecar" Login require
//:id is for taking the specific id of an car which we want to edit
router.put(
  "/updatecar/:id",
  fetchuser,
  [
    body("carNumber", "Car number is not valid").isLength({ min: 10, max: 10 }),
    body("ownerName", "Owner name should not be empty").isLength({ min: 1 }),
    body("ownerMobNumber", "Mobile number is not valid").isLength({
      min: 10,
      max: 10,
    }),
    body("carModel", "Car model should not be empty").notEmpty(),
    body("serviceStatus", "Service status should not be empty").notEmpty(),
  ],
  async (req, res) => {
    const { carNumber, ownerName, ownerMobNumber, carModel, serviceStatus } =
      req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success, error: errors.array() });
      }
    try {
      const newCar = {
        carNumber,
        ownerName,
        ownerMobNumber,
        carModel,
        serviceStatus,
      };
      let updatedCar = await Cars.findById(req.params.id);
      if (!updatedCar) {
        return res.status(404).send({ err: "Car not found", success: false });
      }
      const car = await Cars.findByIdAndUpdate(
        updatedCar._id,
        { $set: newCar },
        { new: true }
      );
      res.send({ car, success: true });
    } catch (error) {
      res
        .status(500)
        .send({ err: "Oops some thing went wrong!!", success: false });
    }
  }
);

//Rout 4: Delete  a car: DELETE "/api/cars/deletecar/:id" Login require
router.delete("/deletecar/:id", fetchuser, async (req, res) => {
  try {
      let car = await Cars.findById(req.params.id)
      if(!car){
          return res.status(404).send({err:"Car not found", success: false})
        }
        car = await Cars.findByIdAndDelete(req.params.id)
        res.send({msg: "Car deleted", success: true})
  } catch (error) {
    res
      .status(500)
      .send({ err: "Oops some thing went wrong!!", success: false });
  }
});


//Rout 5: GET a specific car: POST "/api/posts/getcar" Login require
router.post("/getcar", fetchuser, async (req, res) => {
    try {
      //This will fetch all the posts
      const car = await Cars.find({carNumber: req.body.carNumber});
      res.send({car, success: true});
    } catch (error) {
      res.status(500).send({err:"Oops some thing went wrong!!",success:false});
    }
  });
module.exports = router;
