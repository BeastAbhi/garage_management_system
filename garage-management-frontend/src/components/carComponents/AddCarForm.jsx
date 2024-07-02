import React, { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import carContext from "@/context/car/carContext";
import loaderContext from "@/context/loader/loaderContext";

const AddCarForm = () => {
  const navigate = useNavigate();
  const carCon = useContext(carContext);
  const { addCar } = carCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const [car, setCar] = useState({
    carNumber: "",
    ownerName: "",
    ownerMobNumber: "",
    carModel: "",
    serviceStatus: false,
  });

  const setValue = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const res = await addCar(
      car.carNumber,
      car.ownerName,
      car.ownerMobNumber,
      car.carModel
    );
    if (!res.success) {
      showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
    }
    else{
      navigate("/cars");
      showToast("Added", "Car Added Successfully");
    }
    setLoader(false);
  };

  return (
    <div className="h-screen w-full p-3 bg-blue-50">
      <div className="px-4 items-center bg-nav-gradient text-white border-2 border-gray-200 shadow-sm rounded-md">
        <h1 className=" text-[40px]">Add Car</h1>
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
            onChange={setValue}
          />
        </div>

        <Button type="submit" className="mt-6 max-w-24 bg-nav-gradient">
          Add Car
        </Button>
      </form>
    </div>
  );
};

export default AddCarForm;
