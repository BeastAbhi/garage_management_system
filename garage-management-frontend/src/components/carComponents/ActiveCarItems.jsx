import React from "react";
import { useLocation } from "react-router-dom";

const ActiveCarItems = () => {
  const location = useLocation();
  const car = location.state.car;
  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="flex flex-row justify-between px-4 items-center bg-nav-gradient text-white border-2 border-gray-200 shadow-sm rounded-md">
        <h1 className=" text-[40px]">Car Details</h1>
        <strong>{car.serviceStatus ? "In Service" : "Not In Service"}</strong>
      </div>
      <div className="mt-4 p-4 flex flex-col gap-4 border-2 border-gray-200 shadow-sm rounded-md">
        <div className="grid grid-cols-2 grid-flow-row gap-5 p-4 border-2 border-gray-200 shadow-sm rounded-md">
          <p>
            <strong>Car Number: </strong>
            {car.carNumber}
          </p>
          <p>
            <strong>Car Model: </strong>
            {car.carModel}
          </p>
          <p>
            <strong>Owner Name: </strong>
            {car.ownerName}
          </p>
          <p>
            <strong>Mobile Number: </strong>
            {car.ownerMobNumber}
          </p>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-5 p-4 border-2 border-gray-200 shadow-sm rounded-md">
            ToDo show all the car bills
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-5 p-4 border-2 border-gray-200 shadow-sm rounded-md">
            ToDo show all the car checks
        </div>
      </div>
    </div>
  );
};

export default ActiveCarItems;
