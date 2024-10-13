import React, { useState } from "react";
import BillContext from "./billContext";

const BillState = (props) => {
  const host = import.meta.env.VITE_APP_HOST_LINK;
  const billInitial = [];
  const [bills, setBills] = useState(billInitial);
  const authToken = localStorage.getItem("token");

  //Get all bills
  const getAllBills = async () => {
    //Api Call
    const response = await fetch(`${host}/api/bill/allbills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const json = await response.json();
    setBills(json.bills);
  };

  // Add bill
  const addBill = async (carNumber, items, totalAmount, isPaid) => {
    //API call
    const response = await fetch(`${host}/api/bill/addbill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber,
        items,
        totalAmount,
        isPaid,
      }),
    });
    const bill = await response.json();
    setBills(bills.contat(bill));
  };

  //Update bill
  const updateBill = async (items,totalAmount, id) => {
    //API call
    const response = await fetch(`${host}/api/bill/updatebill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        items,
        totalAmount
      }),
    });
    //This line make a deep copy of the bills
    let newBill = JSON.parse(JSON.stringify(bills));
    for (let index = 0; index < newBill.length; index++) {
      const element = newBill[index];
      if (element._id === id) {
        newBill[index].items = items;
        newBill[index].totalAmount = totalAmount;

        break;
      }
    }
    setBills(newBill);
    return(response.json())
  };

  //Delete Bill
  const deleteBill = async (id) => {
    //Api Call
    const response = await fetch(`${host}/api/bill/deletebill/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    //Logic to Delete an car
    let newBill = bills.filter((bill) => {
      return bill._id !== id;
    });
    setBills(newBill);
    return response.json();
  };

  const getBill = async (carNumber) => {
    //API call
    const response = await fetch(`${host}/api/bill/fetchbills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber,
      }),
    });
    return response.json();
  };

  //Update Payment
  const updatePay = async (id, isPaid) => {
    //API call
    const response = await fetch(`${host}/api/bill/updatebill/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        isPaid,
      }),
    });
    response.json();
    //This line make a deep copy of the bills
    let newBill = JSON.parse(JSON.stringify(bills));
    for (let index = 0; index < newBill.length; index++) {
      const element = newBill[index];
      if (element._id === id) {
        newBill[index].isPaid = true;
        break;
      }
    }
    setBills(newBill);
  };

  return (
    <BillContext.Provider
      value={{ bills, getAllBills, addBill, updateBill, deleteBill, getBill, updatePay }}
    >
      {props.children}
    </BillContext.Provider>
  );
};

export default BillState;
