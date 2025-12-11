import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AlHootaCave from "../assets/AlHootaCave.jpg";

const TripsCrud = () => {
  const navigate = useNavigate();

  // Static trips entry
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: "Al Hoota Cave",
      image: AlHootaCave,
      price: 10,
    },
  ]);

  // Delete
  const deleteTrip = (id) => {
    setTrips(trips.filter((t) => t.id !== id));
  };

  return (
    <div style={styles.page}>
      {/* Back Button */}
      <div style={styles.backBtn} onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} />
      </div>

      <h1 style={styles.title}>Trips Management</h1>

      {/* Add New Place Button */}
      <button style={styles.addBtn} onClick={() => navigate("/add-trip")}>
        + Add New Place
      </button> 

      {/* Trips CRUD Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Update</th>
            <th style={styles.th}>Delete</th>
          </tr>
        </thead>

        <tbody>
          {trips.length === 0 ? (
            <tr>
              <td colSpan="6" style={styles.noData}>
                No trips found.
              </td>
            </tr>
          ) : (
            trips.map((trip) => (
              <tr key={trip.id}>
                <td style={styles.td}>{trip.id}</td>
                <td style={styles.td}>{trip.name}</td>
                <td style={styles.td}>
                  <img
                    src={trip.image}
                    alt={trip.name}
                    style={{
                      width: "70px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td style={styles.td}>{trip.price} OMR</td>
                <td style={styles.td}>
                  <button
                    style={styles.updateBtn}
                    onClick={() => navigate(`/update-trip/${trip.id}`)}
                  >
                    Update
                  </button>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteTrip(trip.id)}
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



const styles = {
  page: {
    backgroundColor: "#AEDBBF",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial",
  },
  backBtn: {
    cursor: "pointer",
    marginBottom: "10px",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#2F3E2D",
    fontWeight: "700",
    marginBottom: "12px",
  },
  addBtn: {
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
  },
  table: {
    width: "100%",
    backgroundColor: "#fff",
    borderCollapse: "collapse",
    borderRadius: "10px",
    overflow: "hidden",
  },
  th: {
    padding: "14px",
    backgroundColor: "#E8F4EC",
    fontWeight: "700",
    color: "#2F3E2D",
    fontSize: "15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "15px",
  },
  updateBtn: {
    padding: "6px 14px",
    backgroundColor: "#FFC933",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
  },
  deleteBtn: {
    padding: "6px 14px",
    backgroundColor: "#FF4A4A",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
  },
  noData: {
    padding: "20px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default TripsCrud;
