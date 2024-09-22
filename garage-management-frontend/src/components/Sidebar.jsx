import React from "react";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/icons/home.svg";
import carIcon from "../assets/icons/car.svg";
import inventoryIcon from "../assets/icons/inventoryIcon.svg";
import billIcon from "../assets/icons/billicon.svg";

const Sidebar = () => {
  const location = useLocation();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
          {/* <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="horizon logo"
            className="size-[24px] max-xl:size-14"
          />{" "} */}
          <h1 className="sidebar-logo">MGM</h1>
        </Link>
        <Link
          to={"/"}
          className={`sidebar-link ${
            location.pathname === "/" ? "bg-nav-gradient" : ""
          }`}
        >
          <div className="relative size-6">
            <img
              src={homeIcon}
              className={`${
                location.pathname === "/" ? "brightness-200 invert-0" : ""
              }`}
            />
          </div>
          <div
            className={`sidebar-label ${
              location.pathname === "/" ? "!text-white" : ""
            }`}
          >
            Home
          </div>
        </Link>

        <Link
          to={"/cars"}
          className={`sidebar-link ${
            location.pathname === "/cars" ? "bg-nav-gradient" : ""
          }`}
        >
          <div className="relative size-6">
            <img
              src={carIcon}
              className={` h-full w-full ${
                location.pathname === "/cars" ? "brightness-200 invert-0" : ""
              }`}
            />
          </div>
          <div
            className={`sidebar-label ${
              location.pathname === "/cars" ? "!text-white" : ""
            }`}
          >
            Cars
          </div>
        </Link>

        <Link
          to={"/bills"}
          className={`sidebar-link ${
            location.pathname === "/bills" ? "bg-nav-gradient" : ""
          }`}
        >
          <div className="relative size-6">
            <img
              src={billIcon}
              className={` h-full w-full ${
                location.pathname === "/bills" ? "brightness-200 invert-0" : ""
              }`}
            />
          </div>
          <div
            className={`sidebar-label ${
              location.pathname === "/bills" ? "!text-white" : ""
            }`}
          >
            Bills
          </div>
        </Link>

        <Link
          to={"/stock"}
          className={`sidebar-link ${
            location.pathname === "/stock" ? "bg-nav-gradient" : ""
          }`}
        >
          <div className="relative size-6">
            <img
              src={inventoryIcon}
              className={` h-full w-full ${
                location.pathname === "/stock" ? "brightness-200 invert-0" : ""
              }`}
            />
          </div>
          <div
            className={`sidebar-label ${
              location.pathname === "/stock" ? "!text-white" : ""
            }`}
          >
            Inventory
          </div>
        </Link>
      </nav>
      <p className="text-black">User Details</p>
    </section>
  );
};

export default Sidebar;
