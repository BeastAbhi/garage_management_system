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
import Login from "./components/authComponent/Login";
import Signup from "./components/authComponent/Signup";

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
