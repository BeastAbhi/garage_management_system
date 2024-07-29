import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

import hamburger from "../assets/icons/hamburger.svg";
import homeIcon from "../assets/icons/home.svg";
import carIcon from "../assets/icons/car.svg";
import inventoryIcon from "../assets/icons/inventoryIcon.svg";


const MobileNav = () => {
  const location = useLocation();

  return (
    <section className="hidden max-md:inline-block w-full max-w-8">
      <Sheet>
        <SheetTrigger>
          <img src={hamburger} className="max-h-8" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-1 px-4"
          >
            {/* <Image
              src={"/icons/logo.svg"}
              width={34}
              height={34}
              alt="horizon logo"
            /> */}
            <h1 className="text-26 font-serif font-bold text-gray-900">MGM</h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <div className="w-full">
                <Link
                  to={"/"}
                  className={`mobilenav-sheet_close w-full ${
                    location.pathname === "/" ? "bg-nav-gradient" : ""
                  }`}
                >
                  <img
                    src={homeIcon}
                    className={`${
                      location.pathname === "/" ? "brightness-200 invert-0" : ""
                    }`}
                  />
                  <div
                    className={`text-16 font-semibold text-gray-700 ${
                      location.pathname === "/" ? "!text-white" : ""
                    }`}
                  >
                    Home
                  </div>
                </Link>

                <Link
                  to={"/cars"}
                  className={`mobilenav-sheet_close w-full ${
                    location.pathname === "/cars" ? "bg-nav-gradient" : ""
                  }`}
                >
                  <img
                    src={ carIcon }
                    className={`${
                      location.pathname === "/cars" ? "brightness-200 invert-0" : ""
                    }`}
                  />
                  <div
                    className={`text-16 font-semibold text-gray-700 ${
                      location.pathname === "/cars" ? "!text-white" : ""
                    }`}
                  >
                    Cars
                  </div>
                </Link>

                <Link
                  to={"/stock"}
                  className={`mobilenav-sheet_close w-full ${
                    location.pathname === "/stock" ? "bg-nav-gradient" : ""
                  }`}
                >
                  <img
                    src={ inventoryIcon }
                    className={`${
                      location.pathname === "/stock" ? "brightness-200 invert-0" : ""
                    }`}
                  />
                  <div
                    className={`text-16 font-semibold text-gray-700 ${
                      location.pathname === "/stock" ? "!text-white" : ""
                    }`}
                  >
                    Inventory
                  </div>
                </Link>

              </div>
            </SheetClose>
            <p className="text-black">User Details</p>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
