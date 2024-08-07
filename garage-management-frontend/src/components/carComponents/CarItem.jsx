import React, { useContext } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import MoveIcon from "@/assets/icons/MoveIcon";
import carContext from "@/context/car/carContext";
import loaderContext from "@/context/loader/loaderContext";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CarItem = (props) => {
  const { car } = props;
  const carCon = useContext(carContext);
  const { deleteCar } = carCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const navigate = useNavigate()

  const EditCar = (car) => {
    navigate("/addcar", {state:{car:car,edit:true}})
  };
  const DeleteCar = async (car) => {
    setLoader(true)
    const res = await deleteCar(car._id)
    if (!res.success) {
      showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
    }
    else{
      navigate("/cars");
      showToast("Deleted", "Car Deleted Successfully");
    }
    setLoader(false)
  };
  const moveInGarage = (car) => {
    if (!car.serviceStatus) {
      console.log(car);
    }
  };
  const displayCar = (car)=>{
    navigate('/showcar', {state:{car:car}})
  }
  return (
    <div className="info-box-card">
      <Button className="p-0" variant="link" onClick={()=>{displayCar(car)}}>{car.carNumber}</Button>
      <p className="min-w-14 max-w-14">{car.carModel}</p>
      <p className="min-w-14 max-w-14 max-md:hidden">{car.ownerName}</p>
      <p className="max-md:hidden">{car.ownerMobNumber}</p>
      <p
        className={`min-w-14 max-w-14 ${
          car.serviceStatus ? "text-green-500" : "text-red-500"
        }`}
      >
        {car.serviceStatus ? "In Service" : "Not In Service"}
      </p>

      <div className="flex flex-row gap-2">
        {/* below code is for delete button */}
        <AlertDialog>
          <AlertDialogTrigger>
            <DeleteIcon className="fill-red-400  hover:cursor-pointer hover:fill-red-600" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                car data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  DeleteCar(car);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Below code is for edit button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditIcon
                className="fill-yellow-400 hover:cursor-pointer hover:fill-yellow-500"
                onClick={() => {
                  EditCar(car);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* Below code is for move button which moves the car in the garage for service or any work */}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MoveIcon
                className={`fill-green-500 hover:cursor-pointer hover:fill-green-700 ${
                  car.serviceStatus
                    ? "fill-green-200 hover:cursor-not-allowed hover:fill-green-300"
                    : ""
                }`}
                onClick={() => {
                  moveInGarage(car);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Move to Service</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CarItem;
