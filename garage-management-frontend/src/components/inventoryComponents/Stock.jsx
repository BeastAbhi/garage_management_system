import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import loaderContext from "@/context/loader/loaderContext";
import stockContext from "@/context/stocks/stockContext";
import StockItem from "./StockItem";

const Stock = () => {
  const stockCon = useContext(stockContext);
  const { stocks, getAllStocks } = stockCon;
  const loaderCon = useContext(loaderContext);
  const { setLoader } = loaderCon;
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        await getAllStocks();
        setLoader(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };
    fetchData();
  }, [authToken]);

  const addStock = () => {
    navigate("/addstock", { state: { edit: false } });
  };

  return (
    <div className="h-full w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">Inventory</h1>
        <Button variant="secondary" onClick={addStock}>
          Add New Item
        </Button>
      </div>
      <div className=" mt-3 p-3 shadow-sm border-2 border-gray-200 rounded-md">
        <div className=" p-2 mt-2 mb-2 heading-box-card">
          <h1>Name</h1>
          <h1>Quantity</h1>
          <h1 className="max-md:hidden">Min Quantity</h1>
          <h1>Price</h1>
          <h1>Operations</h1>
        </div>
        <div className="flex flex-col-reverse">
          {stocks.length === 0
            ? "No cars to Show"
            : stocks.map((stock) => <StockItem key={stock._id} stock={stock} />)}
        </div>
      </div>
    </div>
  );
};

export default Stock;
