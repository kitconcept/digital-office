import logo from "./logo.svg";
import "./App.css";
import Jitsi from "react-jitsi";
import Office from "./Office/Office.js";

const roomName =
  "kitconcept-digital-office-123e4567-e89b-12d3-a456-426655440000";
const userFullName = "Timo Stollenwerk";

function App() {
  return (
    <div className="App">
      <Office />
    </div>
  );
}

export default App;
