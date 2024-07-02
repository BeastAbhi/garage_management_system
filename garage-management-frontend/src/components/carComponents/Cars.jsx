import React, { useContext, useEffect } from "react";
import carContext from "@/context/car/carContext";
import CarItem from "./CarItem";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";


const Cars = () => {
  const carCon = useContext(carContext);
  const { cars, getAllCars } = carCon;
  const navigate = useNavigate()

  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllCars();
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, [authToken]);
const addCar = () =>{
  navigate('/addcar')
}

  return (
    <div className="h-full w-full p-3">
      <div className="flex flex-row justify-between px-4 items-center bg-gray-100 border-2 border-gray-200 shadow-sm rounded-md">
        <h1 className=" text-[40px]">Cars</h1>
        <p>search box</p>
        <Button className="bg-nav-gradient" onClick={addCar}>Add Car</Button>
      </div>
      <div className=" p-2 mt-2 mb-2 flex flex-row justify-between items-center shadow-sm border-2 border-gray-200 rounded-md">
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
          : cars.map((car) => (
            <CarItem key={car._id} car={car}/>
            ))}
      </div>
    </div>
  );
};

export default Cars;