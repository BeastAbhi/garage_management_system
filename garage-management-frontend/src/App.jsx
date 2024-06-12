import BillState from "./context/bill/BillState";
import CarState from "./context/car/CarState";
import CarChecksState from "./context/carChecks/CarChecksState";
import StockState from "./context/stocks/StockState";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <CarState>
        <CarChecksState>
          <BillState>
            <StockState>
              <h1 className="text-red-500">hihihihihih</h1>
            </StockState>
          </BillState>
        </CarChecksState>
      </CarState>
    </UserState>
  );
}

export default App;
