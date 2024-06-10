import CarChecksContext from "./carChecksContext";

import React from "react";

const CarChecksState = (props) => {
  const host = process.env.REACT_APP_HOST_LINK;
  const carChecksInitial = [];
  const [carChecks, setCarChecks] = useState(carChecksInitial);
  const authToken = localStorage.getItem("token");

  //get car check
  const getCarChecks = async (carNumber) => {
    const response = await fetch(`${host}/api/carchecks/fetchcarchecks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({ carNumber }),
    });
    return response.json();
  };
  // Add car checks
  const addCarChecks = async (
    carNumber,
    toolKit,
    centerLock,
    powerWindow,
    images,
    technician,
    advisoryl,
    note
  ) => {
    //API call
    const response = await fetch(`${host}/api/carchecks/addcarchecks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify({
        carNumber,
        toolKit,
        centerLock,
        powerWindow,
        images,
        technician,
        advisoryl,
        note,
      }),
    });
    const carCheck = await response.json()
    setCarChecks(carChecks.concat(carCheck))
  };

  //delete car check
  const deleteCarCheck = async (id)=>{
    const response = await fetch(`${host}/api/carchecks/deletecarcheck/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });
      response.json()
      let newCarChecks = carChecks.filter((carCheck)=>{
        return carCheck._id !== id;
      })
      setCarChecks(newCarChecks);
  }

  //Get all car checks
  const getAllCarChecks = async () => {
    //Api Call
    const response = await fetch(`${host}/api/carchecks/allcarchecks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const json = await response.json();
    setCarChecks(json);
  };


  return (
    <CarChecksContext.Provider value={{carChecks, getCarChecks, addCarChecks, deleteCarCheck, getAllCarChecks }}>
      {props.childern}
    </CarChecksContext.Provider>
  );
};

export default CarChecksState;
