import React, { useEffect, useState } from "react";

function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [editBikeId, setEditBikeId] = useState(null);
  const [editData, setEditData] = useState({ brand: "", model: "", registrationNumber: "" });

  // Fetch all bikes
  const fetchBikes = () => {
    fetch("http://localhost:8080/api/bikes")
      .then((res) => res.json())
      .then((data) => setBikes(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  // Delete a bike
 const deleteBike = (id) => {
  if (window.confirm("Are you sure you want to delete this bike?")) {
    fetch(`http://localhost:8080/api/bikes/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed");
        }
        fetchBikes(); // refresh list from backend
      })
      .catch((err) => console.error("Delete error:", err));
  }
};

  // Start editing a bike
  const startEdit = (bike) => {
    setEditBikeId(bike.id);
    setEditData({ brand: bike.brand, model: bike.model, registrationNumber: bike.registrationNumber });
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditBikeId(null);
    setEditData({ brand: "", model: "", registrationNumber: "" });
  };

  // Save updated bike
  const saveEdit = (id) => {
    fetch(`http://localhost:8080/api/bikes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    })
      .then(() => {
        fetchBikes();
        cancelEdit();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Bike List</h2>
      {bikes.length === 0 ? (
        <p>No bikes available</p>
      ) : (
        <ul>
          {bikes.map((bike) => (
            <li key={bike.id} style={{ marginBottom: "10px" }}>
              {editBikeId === bike.id ? (
                <>
                  <input
                    type="text"
                    value={editData.brand}
                    onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                    placeholder="Brand"
                  />
                  <input
                    type="text"
                    value={editData.model}
                    onChange={(e) => setEditData({ ...editData, model: e.target.value })}
                    placeholder="Model"
                  />
                  <input
                    type="text"
                    value={editData.registrationNumber}
                    onChange={(e) => setEditData({ ...editData, registrationNumber: e.target.value })}
                    placeholder="Registration Number"
                  />
                  <div className="action-buttons">
                    <button
                      className="update-btn"
                      onClick={() => saveEdit(bike.id)}
                    >
                      Save
                    </button>

                    <button
                      className="delete-btn"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>
                    {bike.brand} - {bike.model} ({bike.registrationNumber})
                  </span>

                  <div className="action-buttons">
                    <button
                      className="update-btn"
                      onClick={() => startEdit(bike)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteBike(bike.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BikeList;