import TestComponent from "./components/TestComponent";
import BillState from "./context/bill/BillState";
import CarState from "./context/car/CarState";
import CarChecksState from "./context/carChecks/CarChecksState";
import LoaderState from "./context/loader/LoaderState";
import StockState from "./context/stocks/StockState";
import UserState from "./context/user/UserState";
import Toaster from "./components/ui/Toaster";
import Loader from "./components/Loader";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Cars from "./components/carComponents/Cars";
import AddCarForm from "./components/carComponents/AddCarForm";
import ActiveCarItems from "./components/carComponents/ActiveCarItems";

function App() {
  return (
    <UserState>
      <CarState>
        <CarChecksState>
          <BillState>
            <StockState>
              <LoaderState>
                <Loader />

                <Router>
                  <div className="mobilenav-layout">
                    <p>MGM</p>
                    <MobileNav />
                  </div>
                  <div className="flex flex-row no-scrollbar">
                    <Sidebar />
                    <Routes>
                      <Route exact path="/" element={<TestComponent />}></Route>
                      <Route exact path="/login" element={<Login />}></Route>
                      <Route exact path="/signup" element={<Signup />}></Route>
                      <Route exact path="/cars" element={<Cars />}></Route>
                      <Route exact path="/addcar" element={<AddCarForm />}></Route>
                      <Route exact path="/showcar" element={<ActiveCarItems />}></Route>
                    </Routes>
                  </div>
                </Router>

                <Toaster />
              </LoaderState>
            </StockState>
          </BillState>
        </CarChecksState>
      </CarState>
    </UserState>
  );
}

export default App;
