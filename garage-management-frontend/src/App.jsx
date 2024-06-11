import CarState from "./context/car/CarState"
import CarChecksState from "./context/carChecks/CarChecksState"
import UserState from "./context/user/UserState"


function App() {
  return (
    <UserState>
      <CarState>
        {/* <CarChecksState> */}
          <h1 className="text-red-500">hihihihihih</h1>
        {/* </CarChecksState> */}
      </CarState>
    </UserState>
  )
}

export default App
