import { useState } from "react";
import StockContext from "./stockContext";

const StockState = (props) => {
  const host = import.meta.env.VITE_APP_HOST_LINK;
  const stocksInitial = [];
  const [stocks, setStocks] = useState(stocksInitial);
  const authToken = localStorage.getItem("token");

  //Get all stocks
  const getAllStocks = async () => {
    //Api Call
    const response = await fetch(`${host}/api/stock/fetchstock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const json = await response.json();
    setStocks(json);
  };

  // Add Stock
  const addStock = async (itemName, quantity, minQuantity, price) => {
    //API call
    const response = await fetch(`${host}/api/stock/addstock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        itemName,
        quantity,
        minQuantity,
        price,
      }),
    });
    const stock = await response.json();
    setStocks(stocks.contat(stock));
  };

  //Update Stock
  const updateStock = async (id, itemName, quantity, minQuantity, price) => {
    //API call
    const response = await fetch(`${host}/api/stock/updatestock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        itemName,
        quantity,
        minQuantity,
        price,
      }),
    });
    response.json();
    //This line make a deep copy of the stock
    let newStock = JSON.parse(JSON.stringify(stocks));
    for (let index = 0; index < newStock.length; index++) {
      const element = newStock[index];
      if (element._id === id) {
        newStock[index].itemName = itemName;
        newStock[index].quantity = quantity;
        newStock[index].minQuantity = minQuantity;
        newStock[index].price = price;
        break;
      }
    }
    setStocks(newStock);
  };

  //Delete Stock
  const deleteStock = async (id) => {
    //Api Call
    const response = await fetch(`${host}/api/stock/deletestock/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    response.json();

    //Logic to Delete an stock
    let newStock = stocks.filter((stock) => {
      return stock._id !== id;
    });
    setStocks(newStock);
  };

  //Update Stock Quantity
  const updateStockQuantity = async (id, oldQuantity, newQuantity) => {
    //API call
    const response = await fetch(
      `${host}/api/stock/updatestockquantity/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
        body: JSON.stringify({
          oldQuantity,
          newQuantity,
        }),
      }
    );
    response.json();
    //This line make a deep copy of the stock
    let newStockQuantity = JSON.parse(JSON.stringify(stocks));
    for (let index = 0; index < newStockQuantity.length; index++) {
      const element = newStockQuantity[index];
      if (element._id === id) {
        newStockQuantity[index].quantity = newQuantity;
        break;
      }
    }
    setStocks(newStockQuantity);
  };

  return (
    <StockContext.Provider
      value={{ stocks, getAllStocks, addStock, updateStock, deleteStock, updateStockQuantity }}
    >
      {props.children}
    </StockContext.Provider>
  );
};

export default StockState;
