const express = require("express");
const fetchuser = require("../middleware/fetchUser");
const router = express.Router();
const Stock = require("../models/Stock");
const { body, validationResult } = require("express-validator");

//Rout 1: add a stock: POST "/api/stock/addstock" Login require
router.post(
  "/addstock",
  fetchuser,
  [
    body("itemName", "Item Namem should not be empty").notEmpty(),
    body("quantity", "Quantity should not be empty").notEmpty(),
    body("price", "Price should not be empty").notEmpty(),
    body("minQuantity", "Minimum Quantity should not be empty").notEmpty(),
  ],
  async (req, res) => {
    const { itemName, quantity, minQuantity, price } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const stock = new Stock({
        itemName,
        quantity,
        minQuantity,
        price,
        lastAdded: Date.now()
      });
      const saveStock = await stock.save();
      res.send({ saveStock, success: true });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .send({ err: "Oops some thing went wrong!!", success: false });
    }
  }
);

//Rout 2: update the stock: PUT "/api/stock/updatestock" Login require
//:id is for taking the specific id of an post which we want to edit
router.put("/updatestock/:id", fetchuser, async (req, res) => {
  const { itemName, quantity, minQuantity, price } = req.body;
  try {
    const newStock = {};
    if (itemName) {
      newStock.itemName = itemName;
    }
    if (quantity) {
      newStock.quantity = quantity;
      newStock.lastAdded = Date.now;
    }
    if (minQuantity) {
      newStock.minQuantity = minQuantity;
    }
    if (price) {
      newStock.price = price;
    }

    //Check weather the stock with requested id is preaent or not
    //here params.id means the id we have passed by the url
    let stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).send({ err: "Not found", success: false });
    }

    //Find the stock to be updated
    stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { $set: newStock },
      { new: true }
    );
    res.send({ stock, success: true });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ err: "Oops some thing went wrong!!", success: false });
  }
});

//Rout 3:delete the stock: delete "/api/stock/deletestock" Login require
router.delete("/deletestock/:id", fetchuser, async (req, res) => {
  try {
    // Find the stock to be deleted
    let stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).send({ err: "Item Not found", success: false });
    }

    //Delete the post
    stock = await Stock.findByIdAndDelete(req.params.id);
    res.send({ msg: "Item has been deleted", success: true });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ err: "Oops some thing went wrong!!", success: false });
  }
});

//Rout 4: GET all the stock items: POST "/api/stock/fetchstock" Login require
router.post("/fetchstock", fetchuser, async (req, res) => {
  try {
    //This will fetch all the posts
    const stock = await Stock.find();
    res.send({ stock, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ err: "Oops Something went wrong!", success: false });
  }
});

//Rout 5: update the quantity of the stock items: POST "/api/stock/updatestockquantity" Login require
router.put("/updatestockquantity/:id", fetchuser, async (req, res) => {
  const { oldQuantity, newQuantity, quantity } = req.body;
  const newStock = {};
  try {
    let stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).send({ err: "Not found", success: false });
    }
    if (quantity) {
        newStock.quantity = stock.quantity - quantity;
    }
    if (oldQuantity > newQuantity) {
      newStock.quantity = stock.quantity + oldQuantity - newQuantity;
    }
    if (oldQuantity < newQuantity) {
        newStock.quantity = stock.quantity - (newQuantity - oldQuantity);
      }

    //Find the stock to be updated
    stock = await Stock.findByIdAndUpdate(
      req.params.id,
      { $set: newStock },
      { new: true }
    );

    res.send({ stock, success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ err: "Oops Something went wrong!", success: false });
  }
});

module.exports = router;
