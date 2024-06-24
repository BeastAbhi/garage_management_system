import React, { useContext, useEffect, useState } from "react";
import carContext from "@/context/car/carContext";

const Cars = () => {
  const carCon = useContext(carContext);
  const { getAllCars, addCar, updateCar, deleteCar, getCar } = carCon;
  const [cars, setCars] = useState([]);
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await getAllCars();
        console.log(carData)
        setCars(carData.cars);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, [authToken]);

  return (
    <div className="h-full w-full p-3">
      <div className="flex flex-row justify-around items-center bg-gray-100 border-2 border-gray-200 shadow-sm rounded-md">
        <h1 className=" text-[40px]">Cars</h1>
        <p>search box</p>
        <button>Add car</button>
      </div>
      <div className=" p-2 mt-2 mb-2 flex flex-row justify-around items-center shadow-sm border-2 border-gray-200 rounded-md">
        <h1>Car Number</h1>
        <h1>Model Name</h1>
        <h1 className="max-md:hidden">Owner Name</h1>
        <h1 className="max-md:hidden">Owner Number</h1>
        <h1>Service Status</h1>
        <h1 className="max-md:hidden">Operations</h1>
      </div>
      <div className="flex flex-col-reverse">
        {cars.map((car) => (
          <div key={car._id} className="flex flex-row justify-around items-center mt-2 p-2 border-2 border-gray-200 shadow-sm rounded-md">
            <p>{car.carNumber}</p>
            <p className="min-w-14 max-w-14">{car.carModel}</p>
            <p  className="min-w-14 max-w-14 max-md:hidden">{car.ownerName}</p>
            <p className="max-md:hidden">{car.ownerMobNumber}</p>
            <p  className={`min-w-14 max-w-14 ${car.serviceStatus ? "text-green-500":"text-red-500"}`}>{car.serviceStatus ? "In Service":"Not In Service"}</p>
            <div className="max-md:hidden">CRUD</div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
