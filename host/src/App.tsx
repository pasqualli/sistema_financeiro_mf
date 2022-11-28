import React from "react";
import ReactDOM from "react-dom";
import Navbar from 'navbar/Navbar';
import Dash from 'dash/Dash';

const App = () => (
  <>
    <Navbar/>
    <Dash/>
  </>
);
ReactDOM.render(<App />, document.getElementById("app"));
