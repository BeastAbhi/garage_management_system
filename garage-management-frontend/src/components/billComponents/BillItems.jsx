import React, { useContext } from "react";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import MoveIcon from "@/assets/icons/MoveIcon";
import billContext from "@/context/bill/billContext";
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

const BillItems = (props) => {
  const { bill } = props;
  const billCon = useContext(billContext);
  const { deleteBill, updatePay } = billCon;
  const loaderCon = useContext(loaderContext);
  const { showToast, setLoader } = loaderCon;
  const navigate = useNavigate();

  const EditBill = (bill) => {
    navigate("/newbill", { state: { bill: bill, edit: true } });
  };
  const DeleteBill = async (bill) => {
    setLoader(true);
    const res = await deleteBill(bill._id);
    if (!res.success) {
      showToast("Error", res.err ? res.err : res.error[0].msg, "destructive");
    } else {
      navigate("/bills");
      showToast("Deleted", "Bill Deleted");
    }
    setLoader(false);
  };
  const displayBill = (bill) => {
    navigate("/showbill", { state: { bill: bill } });
  };
  let date
  const makeAsPaid = async (bill) => {
    setLoader(true)
    await updatePay(bill._id, true)
    setLoader(false)
  }
  return (
    <div className="info-box-card">
      <Button
        className="p-0"
        variant="link"
        onClick={() => {
          displayBill(bill);
        }}
      >
        {bill.carNumber}
      </Button>
      <p className="min-w-14 max-w-14 max-md:hidden">{bill.totalAmount}</p>
      <p
        className={`min-w-14 max-w-14 ${
          bill.isPaid ? "text-green-500" : "text-red-500"
        }`}
      >
        {bill.isPaid ? "Paid" : "Not Paid"}
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
                Bill data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  DeleteBill(bill);
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
                  EditBill(bill);
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MoveIcon
                className={`fill-green-500 hover:cursor-pointer hover:fill-green-700 `}
                onClick={() => {
                  makeAsPaid(bill)
                }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Make Paid</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BillItems;
