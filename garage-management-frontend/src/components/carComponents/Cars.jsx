import React, { useContext, useEffect } from "react";
import carContext from "@/context/car/carContext";
import CarItem from "./CarItem";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import loaderContext from "@/context/loader/loaderContext";

const Cars = () => {
  const carCon = useContext(carContext);
  const { cars, getAllCars } = carCon;
  const loaderCon = useContext(loaderContext);
  const { setLoader } = loaderCon;
  const navigate = useNavigate();

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        await getAllCars();
        setLoader(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, [authToken]);
  const addCar = () => {
    navigate("/addcar");
  };

  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="flex flex-row justify-between px-4 items-center bg-nav-gradient text-white border-2 border-gray-200 shadow-sm rounded-md">
        <h1 className=" text-[40px]">Cars</h1>
        <p>search box</p>
        <Button variant="secondary" onClick={addCar}>
          Add Car
        </Button>
      </div>
      <div className=" mt-3 p-3 shadow-sm border-2 border-gray-200 rounded-md">
      <div className=" p-2 mt-2 mb-2 flex flex-row bg-blue-100 justify-between items-center shadow-sm border-2 border-gray-200 rounded-md">
        <h1>Car Number</h1>
        <h1>Model Name</h1>
        <h1 className="max-md:hidden">Owner Name</h1>
        <h1 className="max-md:hidden">Owner Number</h1>
        <h1>Service Status</h1>
        <h1 className="max-md:hidden">Operations</h1>
      </div>
      <div className="flex flex-col-reverse">
        {cars.lenghtn === 0
          ? "No cars to Show"
          : cars.map((car) => <CarItem key={car._id} car={car} />)}
      </div>
      </div>
    </div>
  );
};

export default Cars;
