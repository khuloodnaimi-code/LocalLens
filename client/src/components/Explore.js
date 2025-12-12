import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  // Fetch trips from server
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

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Explore Places in Oman</h2>

      <div style={styles.grid}>
        {trips.length === 0 ? (
          <p>No trips available.</p>
        ) : (
          trips.map((trip) => (
            <div key={trip._id} style={styles.card}>
              <img src={trip.image} alt={trip.name} style={styles.image} />
              <div style={styles.cardContent}>
                <h3 style={styles.title}>{trip.name}</h3>
                <p style={styles.price}>{trip.price} OMR</p>
                {trip.description && <p style={styles.description}>{trip.description}</p>}
                {trip.address && <p style={styles.address}>{trip.address}</p>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ---------------------- STYLES ---------------------- */
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#AEDBBF",
    padding: "20px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2F3E2D",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "1fr 1fr",
  },
  card: {
    backgroundColor: "#6E8B5E",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "12px",
    color: "white",
  },
  title: {
    margin: "0 0 5px 0",
    fontSize: "18px",
    fontWeight: "600",
  },
  price: {
    margin: "0 0 5px 0",
    fontSize: "14px",
    fontWeight: "500",
  },
  description: {
    margin: "0 0 5px 0",
    fontSize: "13px",
  },
  address: {
    margin: 0,
    fontSize: "12px",
    fontStyle: "italic",
  },
};

export default Explore;
