import React, { useContext, useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import carContext from "@/context/car/carContext";
import loaderContext from "@/context/loader/loaderContext";

const AddCarForm = () => {
  const navigate = useNavigate();
  const carCon = useContext(carContext);
  const { addCar, updateCar } = carCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const [car, setCar] = useState({
    carNumber: "",
    ownerName: "",
    ownerMobNumber: "",
    carModel: "",
    serviceStatus: false,
  });
  const location = useLocation();

  const setValue = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (location.state.car) {
      const res = await updateCar(
        location.state.car._id,
        car.carNumber,
        car.ownerName,
        car.ownerMobNumber,
        car.carModel
      );
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/cars");
        showToast("Updated", "Car Updated Successfully");
      }
    } else {
      const res = await addCar(
        car.carNumber,
        car.ownerName,
        car.ownerMobNumber,
        car.carModel
      );
      if (!res.success) {
        showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
      } else {
        navigate("/cars");
        showToast("Added", "Car Added Successfully");
      }
    }
    setLoader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        if (location.state.car) {
          setCar(location.state.car);
        }
        setLoader(false);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="title-box-card">
        <h1 className=" text-[40px]">
          {location.state.edit ? "Update Car" : "Add Car"}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 grid-flow-row gap-4 p-10 mt-4 border-2 border-gray-200 shadow-sm rounded-md"
      >
        <div>
          <Label htmlFor="carNumber">Car Number</Label>
          <Input
            type="text"
            id="carNumber"
            name="carNumber"
            placeholder="Car Number"
            className="max-w-prose"
            value={car.carNumber}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            type="text"
            id="ownerName"
            name="ownerName"
            placeholder="Owner Name"
            className="max-w-prose"
            value={car.ownerName}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="ownerMobNumber">Mobile Number</Label>
          <Input
            type="text"
            id="ownerMobNumber"
            name="ownerMobNumber"
            placeholder="Owner Mobile Number"
            className="max-w-prose"
            value={car.ownerMobNumber}
            onChange={setValue}
          />
        </div>
        <div>
          <Label htmlFor="carModel">Car Model</Label>
          <Input
            type="text"
            id="carModel"
            name="carModel"
            placeholder="Car Model"
            className="max-w-prose"
            value={car.carModel}
            onChange={setValue}
          />
        </div>

        <Button type="submit" className="mt-6 max-w-24 bg-nav-gradient">
          {location.state.edit ? "Update Car" : "Add Car"}
        </Button>
      </form>
    </div>
  );
};

export default AddCarForm;
