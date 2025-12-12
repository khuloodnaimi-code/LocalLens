import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  const loadTrip = async () => {
    try {
      const res = await fetch(`http://localhost:5000/trips/${id}`);
      const data = await res.json();
      setTrip(data);
    } catch (err) {
      console.error("Error loading trip:", err);
    }
  };

  useEffect(() => {
    loadTrip();
  }, [id]);

  if (!trip) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <FaArrowLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <h2 style={styles.heading}>{trip.name}</h2>
      </div>

      <img src={trip.image} alt={trip.name} style={styles.image} />

      <div style={styles.content}>
        <h3 style={styles.title}>{trip.name}</h3>

        <p style={styles.location}>
          <FaMapMarkerAlt /> {trip.location}
        </p>

        <p style={styles.price}>Price: {trip.price} OMR</p>

        <p style={styles.description}>{trip.description}</p>

        {/* BOOK NOW BUTTON */}
        <button
          style={styles.bookBtn}
          onClick={() =>
            navigate("/Book", {
              state: {
                title: trip.name,
                price: trip.price,
                image: trip.image,
              },
            })
          }
        >
          Book Now
        </button>
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
    paddingBottom: "40px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
  },

  backIcon: {
    fontSize: "22px",
    cursor: "pointer",
    marginRight: "15px",
  },

  heading: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2f3e2d",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },

  content: {
    padding: "20px",
  },

  title: {
    margin: "10px 0 5px 0",
    fontSize: "22px",
    fontWeight: "700",
  },

  location: {
    margin: "0 0 8px 0",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#333",
  },

  price: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  description: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#333",
    marginBottom: "20px",
  },

  bookBtn: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#2f3e2d",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};

export default TripDetails;
