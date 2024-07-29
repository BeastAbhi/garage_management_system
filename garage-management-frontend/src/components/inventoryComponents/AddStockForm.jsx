import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import loaderContext from "@/context/loader/loaderContext";
import stockContext from "@/context/stocks/stockContext";

const AddStockForm = () => {
  const navigate = useNavigate();
  const stockCon = useContext(stockContext);
  const { addStock, updateStock } = stockCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const [stock, setStock] = useState({
    itemName: "",
    quantity: "",
    minQuantity: "",
    price: "",
  });
  const location = useLocation();

  const setValue = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (location.state.stock) {
      const res = await updateStock(
        location.state.stock._id,
        stock.itemName,
        stock.quantity,
        stock.minQuantity,
        stock.price
      );
      console.log(res)
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/stock");
        showToast("Updated", "Stock Item Updated Successfully");
      }
    } else {
      const res = await addStock(
        stock.itemName,
        stock.quantity,
        stock.minQuantity,
        stock.price
      );
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/stock");
        showToast("Added", "Stock Item Added Successfully");
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        if (location.state.stock) {
          setStock(location.state.stock);
        }
        setLoader(false);
      } catch (error) {
        showToast("Error fetching stock data", error, "destructive");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">
          {location.state.edit ? "Update Stock Item" : "Add Stock Item"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 grid-flow-row gap-4 p-10 mt-4 border-2 border-gray-200 shadow-sm rounded-md"
      >
        <div>
          <Label htmlFor="itemName">Item Name</Label>
          <Input
            type="text"
            id="itemName"
            name="itemName"
            placeholder="Name"
            className="max-w-prose"
            value={stock.itemName}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="text"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            className="max-w-prose"
            value={stock.quantity}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="minQuantity">Minimun Quantity</Label>
          <Input
            type="text"
            id="minQuantity"
            name="minQuantity"
            placeholder="Minimun Quantity"
            className="max-w-prose"
            value={stock.minQuantity}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            className="max-w-prose"
            value={stock.price}
            onChange={setValue}
          />
        </div>

        <Button type="submit" className="mt-6 max-w-36 bg-nav-gradient">
          {location.state.edit ? "Update Stock Item" : "Add Stock Item"}
        </Button>
      </form>
    </div>
  );
};

export default AddStockForm;
