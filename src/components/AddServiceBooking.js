import React, { useEffect, useState } from "react";

function AddServiceBooking() {
  const [customerName, setCustomerName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bikes, setBikes] = useState([]);
  const [selectedBikeId, setSelectedBikeId] = useState("");

  // Fetch all bikes for dropdown
  useEffect(() => {
    fetch("http://localhost:8080/api/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customerName || !serviceType || !bookingDate || !selectedBikeId) {
      alert("Please fill all fields");
      return;
    }

    const bookingData = {
      customerName,
      serviceType,
      bookingDate,
      bike: { id: selectedBikeId }, // send bike object with id
    };

    fetch("http://localhost:8080/api/service-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Service booking added!");
        // reset form
        setCustomerName("");
        setServiceType("");
        setBookingDate("");
        setSelectedBikeId("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <label>Service Type:</label>
          <input
            type="text"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          />
        </div>
        <div>
          <label>Booking Date:</label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </div>
        <div>
          <label>Select Bike:</label>
          <select
            value={selectedBikeId}
            onChange={(e) => setSelectedBikeId(e.target.value)}
          >
            <option value="">-- Select a Bike --</option>
            {bikes.map((bike) => (
              <option key={bike.id} value={bike.id}>
                {bike.brand} - {bike.model} ({bike.registrationNumber})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book Service</button>
      </form>
    </div>
  );
}

export default AddServiceBooking;