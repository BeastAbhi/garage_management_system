import BillState from "./context/bill/BillState";
import CarState from "./context/car/CarState";
import CarChecksState from "./context/carChecks/CarChecksState";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <CarState>
        <CarChecksState>
          <BillState>
            <h1 className="text-red-500">hihihihihih</h1>
          </BillState>
        </CarChecksState>
      </CarState>
    </UserState>
  );
}

export default App;
