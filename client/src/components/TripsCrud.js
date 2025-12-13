import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TripsCrud = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/trips");
      const data = await res.json();
      setTrips(data);
    } catch (err) {
      console.error("Fetch trips error:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);


  const deleteTrip = async (id) => {
    try {
      await fetch(`http://localhost:5000/trips/${id}`, { method: "DELETE" });
      fetchTrips(); 
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#AEDBBF", minHeight: "100vh", padding: "20px", fontFamily: "Arial" }}>
  
      <div style={{ cursor: "pointer", marginBottom: "10px" }} onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} />
      </div>

      <h1 style={{ textAlign: "center", fontSize: "28px", color: "#2F3E2D", fontWeight: "700", marginBottom: "12px" }}>
        Trips Management
      </h1>

    
      <button
        style={{
          display: "block",
          margin: "0 auto",
          marginBottom: "20px",
          padding: "12px 20px",
          backgroundColor: "#ffffff",
          border: "none",
          borderRadius: "10px",
          fontWeight: "700",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
        onClick={() => navigate("/add-trip")}
      >
        + Add New Place
      </button>

      <table style={{ width: "100%", backgroundColor: "#fff", borderCollapse: "collapse", borderRadius: "10px", overflow: "hidden" }}>
        <thead>
          <tr style={{ backgroundColor: "#E8F4EC" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Description</th>
            <th>Address</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {trips.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ padding: "20px", textAlign: "center" }}>
                No trips found.
              </td>
            </tr>
          ) : (
            trips.map((trip, idx) => (
              <tr key={trip._id}>
                <td>{idx + 1}</td>
                <td>{trip.name}</td>
                <td>
                  <img src={trip.image} alt={trip.name} style={{ width: "70px", height: "50px", objectFit: "cover" }} />
                </td>
                <td>{trip.price} OMR</td>
                <td>{trip.description || "-"}</td>
                <td>{trip.address || "-"}</td>
                <td>
                  <button
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#2b9116ff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                    onClick={() => navigate(`/update-trip/${trip._id}`, { state: { trip } })}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    style={{
                      padding: "6px 14px",
                      backgroundColor: "#912222ff",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                    onClick={() => deleteTrip(trip._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TripsCrud;
