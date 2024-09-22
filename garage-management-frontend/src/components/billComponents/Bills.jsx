import React, { useContext, useEffect } from "react";
import billContext from "@/context/bill/billContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import loaderContext from "@/context/loader/loaderContext";
import { Input } from "../ui/input";
import BillItems from "./BillItems";

const Bills = () => {
  const billCon = useContext(billContext);
  const {  bills, getAllBills, getBill } = billCon;
  const loaderCon = useContext(loaderContext);
  const { setLoader } = loaderCon;
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        await getAllBills();
        setLoader(false);
      } catch (error) {
        console.error("Error fetching bill data:", error);
      }
    };
    fetchData();
  }, [authToken]);

  const addBill = () => {
    navigate("/newbill", { state: { edit: false } });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (e.target.value.length >= 10) {
      const res = await getBill(e.target.value);
    }
  };

  return (
    <div className="h-full w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">Bills</h1>
        <Input
          placeholder="🔍 Search a bill"
          className="max-w-40 text-black"
          onChange={handleSearch}
        ></Input>
        <Button variant="secondary" onClick={addBill}>
           New Bill
        </Button>
      </div>
      <div className=" mt-3 p-3 shadow-sm border-2 border-gray-200 rounded-md">
        <div className=" p-2 mt-2 mb-2 heading-box-card">
          <h1>Car Number</h1>
          <h1>Total Amount</h1>
          <h1>Payment Status</h1>
          <h1>Operations</h1>
        </div>
        <div className="flex flex-col-reverse">
          {bills.length === 0
            ? "No bills to Show"
            : bills.map((bill) => <BillItems bill={bill} key={bill._id}/>)}
        </div>
      </div>
    </div>
  );
};

export default Bills;
