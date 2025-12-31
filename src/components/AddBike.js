import React, { useState } from "react";

function AddBike() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const addBike = async (e) => {
    e.preventDefault();

    const bike = {
      brand,
      model,
      registrationNumber,
    };

    await fetch("http://localhost:8080/api/bikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bike),
    });

    alert("Bike added successfully!");

    setBrand("");
    setModel("");
    setRegistrationNumber("");
  };

  return (
    <div>
      <h2>Add Bike</h2>

      <form onSubmit={addBike}>
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Add Bike</button>
      </form>
    </div>
  );
}

export default AddBike;