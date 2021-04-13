import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Office from "./components/Office/Office";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/Office" component={Office} />
    </Router>
  );
}

export default App;
