import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AgesMuseumImg from "../assets/oman-across-ages-museum.webp";

const AgesTrip = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      
      {/* Back Button */}
      <FaArrowLeft style={styles.backIcon} onClick={() => navigate(-1)} />

      {/* Title Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Spot details</h2>
      </div>

      {/* Main Card */}
      <div style={styles.card}>
        <img src={AgesMuseumImg} style={styles.image} alt="Ages Museum" />

        <h3 style={styles.title}>Oman Across Ages Museum</h3>

        <div style={styles.details}>
          <p>• <b>Location:</b> Wilayat of Manah, Ad Dakhiliyah Governorate</p>
          <p>• <b>Best time to visit:</b> October to March</p>
          <p>• <b>Main product:</b> Interactive historical exhibits</p>
          <p>• <b>Cultural importance:</b> Cultural heritage preservation</p>
        </div>

        {/* ⭐ Embedded Map (NO API KEY REQUIRED) */}
        <div style={styles.mapContainer}>
          <iframe
            title="Oman Across Ages Museum Location"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=Oman+Across+Ages+Museum&output=embed">
          </iframe>
        </div>

      </div>
    </div>
  );
};

export default AgesTrip;

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#AEDBBF",
    padding: "20px",
  },

  backIcon: {
    fontSize: "24px",
    cursor: "pointer",
  },

  header: {
    textAlign: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },

  heading: {
    display: "inline-block",
    backgroundColor: "#556B52",
    color: "white",
    padding: "8px 20px",
    borderRadius: "20px",
    fontSize: "18px",
  },

  card: {
    width: "100%",
    backgroundColor: "#6E8B5E",
    borderRadius: "14px",
    paddingBottom: "20px",
    overflow: "hidden",
    marginTop: "15px",
  },

  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },

  title: {
    textAlign: "center",
    color: "white",
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: "600",
  },

  details: {
    color: "white",
    marginTop: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontSize: "14px",
    lineHeight: "20px",
  },

  mapContainer: {
    padding: "0 20px",
    marginTop: "15px",
  },
};
