import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import billContext from "@/context/bill/billContext";
import loaderContext from "@/context/loader/loaderContext";
import stockContext from "@/context/stocks/stockContext";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddBillForm = () => {
  const navigate = useNavigate();
  const billCon = useContext(billContext);
  const { addBill, updateBill } = billCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const [bill, setBill] = useState({
    carNumber: "",
    items: [],
    totalAmount: "",
    isPaid: false,
  });
  const location = useLocation();
  const stockCon = useContext(stockContext);
  const { stocks, getAllStocks } = stockCon;

  const setValue = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (location.state.bill) {
      const res = await updateBill(
        bill.items,
        bill.totalAmount,
        location.state.bill._id
      );
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/bills");
        showToast("Updated", "Bill Updated Successfully");
      }
    } else {
      const res = await addBill(
        bill.carNumber,
        bill.items,
        bill.totalAmount,
        (bill.isPaid = false)
      );
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/bills");
        showToast("Added", "Bill Added Successfully");
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        await getAllStocks();
        if (location.state.edit) {
          setBill(location.state.bill);
        }
        setLoader(false);
      } catch (error) {
        showToast("Error fetching bill data", error, "destructive");
      }
    };
    fetchData();
  }, []);

  const [sellectedItem, setSellectedItem] = useState({});
  const [Quantity, setQuantity] = useState(1)

  const addItem = () => {
    bill.items.push({
      itemName: sellectedItem.itemName,
      quantity: Quantity,
      price: sellectedItem.price,
      stockItemId: sellectedItem._id,
    });
    updatePrice();
  };
  const updatePrice = () => {
    let price = 0;
    for (let index = 0; index < bill.items.length; index++) {
      price += bill.items[index].price * bill.items[index].quantity;
    }
    setBill({ ...bill, totalAmount: price });
  };
const updateQuantity = (e) =>{
  //There is a problem TODO
  setQuantity(e.target.value)
  console.log(Quantity)
  console.log(e.target.value)
}
  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">
          {location.state.edit ? "Update Bill" : "New Bill"}
        </h1>
      </div>
      <div>
        <div className="flex flex-row gap-3 p-3 justify-center items-center " name="selectDiv">
          <div>
            <Label htmlFor="selectDiv">Select Part</Label>
            <Select onValueChange={setSellectedItem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Part Name" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => {
                  return (
                    <SelectItem value={stock} key={stock._id}>
                      {stock.itemName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              className="max-w-prose"
              value={Quantity}
              onChange={updateQuantity}
            />
          </div>
          <Button className="max-w-24 bg-nav-gradient mt-6" onClick={addItem}>
            Add
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-10 mt-4 border-2 border-gray-200 shadow-sm rounded-md"
      >
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          <div>
            <Label htmlFor="carNumber">Car Number</Label>
            <Input
              type="text"
              id="carNumber"
              name="carNumber"
              placeholder="Car Number"
              className="max-w-prose"
              value={bill.carNumber}
              onChange={setValue}
            />
          </div>
        </div>
        <div>
          <div className=" p-2 mt-2 mb-2 heading-box-card">
            <h1>Name</h1>
            <h1>Quantity</h1>
            <h1>Price</h1>
            <h1>Operation</h1>
          </div>
          {bill.items.map((item) => {
            return (
              <div className="info-box-card" key={item._id}>
                <p>{item.itemName}</p>
                <p>{item.quantity}</p>
                <p>{item.price}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 grid-flow-row gap-4">
          <div>
            <strong>Total:</strong> {bill.totalAmount}
          </div>

          <Button type="submit" className="max-w-24 bg-nav-gradient">
            {location.state.edit ? "Update Bill" : "Add Bill"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBillForm;
