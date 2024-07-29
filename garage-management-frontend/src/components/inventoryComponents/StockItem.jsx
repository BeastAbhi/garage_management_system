import React, { useContext, useState } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import loaderContext from "@/context/loader/loaderContext";
import stockContext from "@/context/stocks/stockContext";

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
import PlusIcon from "@/assets/icons/PlusIcon";
import { Input } from "../ui/input";

const StockItem = (props) => {
  const { stock } = props;
  const stockCon = useContext(stockContext);
  const { deleteStock, addStockQuantity } = stockCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const EditStock = (stock) => {
    navigate("/addstock", { state: { stock: stock, edit: true } });
  };
  const DeleteStock = async (stock) => {
    setLoader(true);
    const res = await deleteStock(stock._id);
    if (!res.success) {
      showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
    } else {
      navigate("/stock");
      showToast("Deleted", "Stock Item Deleted Successfully");
    }
    setLoader(false);
  };

  const setValue = (e) => {
    setQuantity(e.target.value);
  };
  const AddQuantity = async (stock) => {
    if(Number(quantity) > 0){
        setLoader(true)
        let res = await addStockQuantity(stock._id, Number(quantity))
        if (!res.success) {
            showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
          } else {
            navigate("/stock");
            showToast("Added", "Quantity Updated.");
          }
          setLoader(false);
    }
    else{
        showToast("Number NOT Valid","Number should not be less than Zero.", "destructive");
    }
  };
  return (
    <div className="info-box-card">
      <p className="min-w-14 max-w-14">{stock.itemName}</p>
      <p
        className={`min-w-14 max-w-14 ${
          stock.quantity > stock.minQuantity ? "text-green-500" : "text-red-500"
        }`}
      >
        {stock.quantity}
      </p>
      <p className="min-w-14 max-w-14 max-md:hidden">{stock.minQuantity}</p>
      <p>{stock.price}</p>

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
                Stock Item data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  DeleteStock(stock);
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
                  EditStock(stock);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* Below code is for adding quantity */}
        <AlertDialog>
          <AlertDialogTrigger>
            <PlusIcon className="fill-green-500 hover:cursor-pointer hover:fill-green-700" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Add Quantity of {stock.itemName}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="number"
                  placeholder="Quantity"
                  onChange={setValue}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  AddQuantity(stock);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default StockItem;
