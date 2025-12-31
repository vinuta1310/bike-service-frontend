import React, { useEffect, useState } from "react";

function ServiceBookingList() {
  const [bookings, setBookings] = useState([]);

  // Fetch all service bookings
  const fetchBookings = () => {
    fetch("http://localhost:8080/api/service-bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Service Bookings</h2>
      {bookings.length === 0 ? (
        <p>No service bookings available</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              Customer: {booking.customerName} | Service: {booking.serviceType} | Date: {booking.bookingDate} | Bike: {booking.bike.brand} - {booking.bike.model} ({booking.bike.registrationNumber})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ServiceBookingList;