import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const UpdateTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Get trip data from location.state or fallback static trip
  const tripData = location.state?.trip || {
    id,
    name: "Al Hoota Cave",
    image: "https://via.placeholder.com/150",
    price: 10,
  };

  const [name, setName] = useState(tripData.name);
  const [image, setImage] = useState(tripData.image);
  const [price, setPrice] = useState(tripData.price);

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log updated trip
    const updatedTrip = { id, name, image, price };
    console.log("Updated Trip:", updatedTrip);

    // Navigate back to TripsCrud after update
    navigate(-1, { state: { updatedTrip } });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Update Trip</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Name:</label>
        <input
          style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={styles.label}>Image URL:</label>
        <input
          style={styles.input}
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label style={styles.label}>Price (OMR):</label>
        <input
          style={styles.input}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button style={styles.submitBtn} type="submit">
          Update Trip
        </button>
      </form>
    </div>
  );
};

/* ------------------ STYLES ------------------ */
const styles = {
  page: {
    backgroundColor: "#AEDBBF",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    color: "#2F3E2D",
    fontWeight: "700",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  label: {
    fontWeight: "600",
    color: "#2F3E2D",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  submitBtn: {
    padding: "10px",
    backgroundColor: "#FFC933",
    border: "none",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default UpdateTrip;
