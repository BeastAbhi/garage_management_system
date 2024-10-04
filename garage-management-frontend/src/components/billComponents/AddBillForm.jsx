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
        location.state.bill._id,
        bill.carNumber,
        bill.items,
        bill.totalAmount,
        bill.isPaid
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
  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">
          {location.state.edit ? "Update Bill" : "New Bill"}
        </h1>
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
          <div>
            <Label htmlFor="carNumber">Car Number</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Part Name" />
              </SelectTrigger>
              <SelectContent>
                {stocks.map((stock) => {
                  return (
                    <SelectItem value={stock.itemName} key={stock._id}>
                      {stock.itemName}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
        <div className=" p-2 mt-2 mb-2 heading-box-card">
          <h1>Name</h1>
          <h1>Quantity</h1>
          <h1>Price</h1>
          <h1>Operation</h1>
        </div>
          {bill.items.map((item)=>{
            return(
              <div className="info-box-card" key={item._id}>
                <p>{item.itemName}</p>
                <p>{item.quantity}</p>
                <p>{item.price}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-2 grid-flow-row gap-4">
          <div><strong>Total:</strong> {bill.totalAmount}</div>

          <Button type="submit" className="max-w-24 bg-nav-gradient">
            {location.state.edit ? "Update Bill" : "Add Bill"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBillForm;
