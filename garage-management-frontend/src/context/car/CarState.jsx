import CarContext from "./carContext";
import React, { useState } from "react";

const CarState = (props) => {
  const host = import.meta.env.VITE_APP_HOST_LINK;
  const carsInitial = [];
  const [cars, setCars] = useState(carsInitial);
  const authToken = localStorage.getItem("token");

  //Get all cars
  const getAllCars = async () => {
    //Api Call
    const response = await fetch(`${host}/api/cars/fetchallcars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const json = await response.json();
    setCars(json);
  };

  // Add car
  const addCar = async (
    carNumber,
    ownerName,
    ownerMobNumber,
    carModel,
    serviceStatus
  ) => {
    //API call
    const response = await fetch(`${host}/api/cars/addcar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber,
        ownerName,
        ownerMobNumber,
        carModel,
        serviceStatus,
      }),
    });
    const car = await response.json();
    setCars(cars.contat(car));
  };

  //Update car
  const updateCar = async (
    id,
    carNumber,
    ownerName,
    ownerMobNumber,
    carModel,
    serviceStatus
  ) => {
    //API call
    const response = await fetch(`${host}/api/cars/updatecar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber,
        ownerName,
        ownerMobNumber,
        carModel,
        serviceStatus,
      }),
    });
    response.json();
    //This line make a deep copy of the cars
    let newCar = JSON.parse(JSON.stringify(cars));
    for (let index = 0; index < newCar.length; index++) {
      const element = newCar[index];
      if (element._id === id) {
        newCar[index].carNumber = carNumber;
        newCar[index].ownerName = ownerName;
        newCar[index].ownerMobNumber = ownerMobNumber;
        newCar[index].carModel = carModel;
        newCar[index].serviceStatus = serviceStatus;
        break;
      }
    }
    setCars(newCar);
  };

  //Delete Car
  const deleteCar = async (id) => {
    //Api Call
    const response = await fetch(`${host}/api/cars/deletecar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });

    response.json();

    //Logic to Delete an car
    let newCar = cars.filter((car) => {
      return car._id !== id;
    });
    setCars(newCar);
  };

  const getCar = async (carNumber) => {
    //API call
    const response = await fetch(`${host}/api/cars/getcar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber
      })
    });
    return response.json()
  };

  return (
    <CarContext.Provider
      value={{ cars, getAllCars, addCar, updateCar, deleteCar, getCar }}
    >
      {props.children}
    </CarContext.Provider>
  );
};

export default CarState;
