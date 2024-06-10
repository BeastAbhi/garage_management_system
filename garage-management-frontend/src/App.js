import CarState from "./context/car/CarState";
import UserState from "./context/user/UserState";

function App() {
  return (
    <UserState>
      <CarState>
        <div>
          <h1 className="text-3xl font-bold underline text-center text-red-600">
            Hello world!
          </h1>
        </div>
      </CarState>
    </UserState>
  );
}

export default App;
