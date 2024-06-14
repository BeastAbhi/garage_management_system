import TestComponent from "./components/TestComponent";
import BillState from "./context/bill/BillState";
import CarState from "./context/car/CarState";
import CarChecksState from "./context/carChecks/CarChecksState";
import LoaderState from "./context/loader/LoaderState";
import StockState from "./context/stocks/StockState";
import UserState from "./context/user/UserState";
import Toaster from "./components/ui/Toaster";

function App() {
  return (
    <UserState>
      <CarState>
        <CarChecksState>
          <BillState>
            <StockState>
              <LoaderState>
                <h1 className="text-red-500">hihihihihih</h1>
                <TestComponent></TestComponent>
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
