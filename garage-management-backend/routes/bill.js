const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Bill = require("../models/Bill");
const { body, validationResult } = require("express-validator");

//Rout 1: GET all the Bills of a perticular car: POST "/api/bill/fetchbills" Login require
router.post(
  "/fetchbills",
  fetchuser,
  [body("carNumber", "Car number is Invalid").isLength({ min: 10, max: 10 })],
  async (req, res) => {
    try {
      //This will fetch all the bills
      const bill = await Bill.find({ carNumber: req.body.carNumber });
      res.send({ bill, success: true });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send({ err: "Oops Something went wrong!", success: false });
    }
  }
);

//Rout 2: add a bill: POST "/api/bill/addbill" Login require
router.post(
  "/addbill",
  fetchuser,
  [
    body("carNumber", "Car number is Invalid").isLength({ min: 10, max: 10 }),
    body("totalAmount", "Total Amount should not be empty").notEmpty(),
  ],
  async (req, res) => {
    const { carNumber, items, totalAmount } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const bill = new Bill({
        carNumber,
        items,
        totalAmount,
        isPaid: false,
      });
      const savebill = await bill.save();
      res.send({ savebill, success: true });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ err: "Oops some thing went wrong!!", success: false });
    }
  }
);

//Rout 3: update the bill: PUT "/api/bill/updatebill" Login require
//:id is for taking the specific id of an post which we want to edit
router.put("/updatebill/:id", fetchuser, async (req, res) => {
    const { items, isPaid, totalAmount } = req.body;
    try {
      const newBill = {};
      if (items) {
        newBill.items = items;
      }
      if(isPaid){
        newBill.isPaid = isPaid
      }
      if(totalAmount){
        newBill.totalAmount = totalAmount
      }

      //Check weather the post with requested id is preaent or not
      //here params.id means the id we have passed by the url
      let bill = await Bill.findById(req.params.id);
      if (!bill) {
        return res.status(404).send({err:"Not found", success:false});
      }

      //Find the post to be updated
      bill = await Bill.findByIdAndUpdate(
        req.params.id,
        { $set: newBill },
        { new: true }
      );
      res.send({ bill, success:true });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({err:"Oops some thing went wrong!!", success: false});
    }
  });


  //Rout 4:delete the bill: delete "/api/bill/deletebill" Login require
router.delete("/deletebill/:id", fetchuser, async (req, res) => {
    try {
      // Find the bill to be deleted
      let bill = await Bill.findById(req.params.id);
      if (!bill) {
        return res.status(404).send({err:"Bill Not found", success: false});
      }
  
      //Delete the post
      bill = await Bill.findByIdAndDelete(req.params.id);
      res.send({msg:"Bill has been deleted", success: true});
    } catch (error) {
      console.error(error.message);
      res.status(500).send({err:"Oops some thing went wrong!!", success:false});
    }
  });

  //Rout 5: GET all the bills: POST "/api/bill/allbills" Login require
router.post("/allbills", fetchuser, async (req, res) => {
    try {
      //This will fetch all the posts
      const bills = await Bill.find();
      res.send({ bills, success: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ err: "Oops Something went wrong!", success: false });
    }
  });


module.exports = router;
