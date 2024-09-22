import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import billContext from "@/context/bill/billContext";
import loaderContext from "@/context/loader/loaderContext";

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
        if (location.state.bill) {
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
        className="grid grid-cols-2 grid-flow-row gap-4 p-10 mt-4 border-2 border-gray-200 shadow-sm rounded-md"
      >
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
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            type="text"
            id="ownerName"
            name="ownerName"
            placeholder="Owner Name"
            className="max-w-prose"
            value={bill.items}
            onChange={setValue}
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Part Name" />
            </SelectTrigger>
            <SelectContent>
                {bill.map(()=>{
                    return(
                        <SelectItem value="light">Light</SelectItem>
                    )
                })}
            </SelectContent>
          </Select>
        </div>

        <div>Total: {bill.totalAmount}</div>

        <Button type="submit" className="mt-6 max-w-24 bg-nav-gradient">
          {location.state.edit ? "Update Car" : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default AddBillForm;
