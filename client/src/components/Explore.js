import React from "react";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* Import Local Images */
import AlHootaCave from "../assets/AlHootaCave.jpg";
import SnowOman from "../assets/Snow_oman.jpg";
import LadiesBeach from "../assets/ladies_beach.jpg";
import AgesMuseum from "../assets/oman-across-ages-museum.webp";

const Explore = () => {
  const navigate = useNavigate();

  const places = [
    {
      id: 1,
      title: "Al Hoota Cave",
      location: "Location in Al-Hamra, Ad Dakhiliyah",
      image: AlHootaCave,
      navigateTo: "/Hootacave",
    },
    {
      id: 2,
      title: "Snow Oman",
      location: "Location in Muscat, Mall of Oman",
      image: SnowOman,
      navigateTo: "/Snowoman",
    },
    {
      id: 3,
      title: "Ladies Beach",
      location: "Location in A-Bustan Beach",
      image: LadiesBeach,
      navigateTo: "/Ladiesbeach",
    },
    {
      id: 4,
      title: "Oman across ages museum",
      location: "Location in Manah",
      image: AgesMuseum,
      navigateTo: "/ages-museum", // NEW
    },
  ];

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <FaArrowLeft style={styles.backIcon} onClick={() => navigate(-1)} />
        <h2 style={styles.heading}>Explore places in Oman</h2>
      </div>

      {/* Cards Grid */}
      <div style={styles.grid}>
        {places.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => p.navigateTo && navigate(p.navigateTo)} // NEW
          >
            <img src={p.image} alt={p.title} style={styles.image} />

            <div style={styles.cardContent}>
              <h3 style={styles.title}>{p.title}</h3>
              <p style={styles.location}>
                <FaMapMarkerAlt /> {p.location}
              </p>
            </div>
          </div>
        ))}
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

  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },

  backIcon: {
    fontSize: "22px",
    cursor: "pointer",
    marginRight: "10px",
  },

  heading: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#2f3e2d",
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
    cursor: "pointer", // NEW so user knows clickable
  },

  image: {
    width: "100%",
    height: "210px", // ⬆️ Increased height
    objectFit: "cover",
  },

  cardContent: {
    padding: "12px",
    color: "white",
    minHeight: "80px", // ⬆️ Makes blocks taller
  },

  title: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "600",
  },

  location: {
    margin: "6px 0 0 0",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};

export default Explore;
