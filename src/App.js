import React from "react";
import "./App.css";
import AddBike from "./components/AddBike";
import BikeList from "./components/BikeList";
import AddServiceBooking from "./components/AddServiceBooking";
import ServiceBookingList from "./components/ServiceBookingList";

function App() {
  return (
    <div className="container">
      <h1>Bike Service Management</h1>

      <AddBike />
      <hr />

      <BikeList />
      <hr />

      <AddServiceBooking /> 
      <hr />

      <ServiceBookingList />
    </div>
  );
}

export default App;
