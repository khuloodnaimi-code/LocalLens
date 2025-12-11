import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import so from "../assets/so.webp";

const SnowOman = () => {
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
        <img src={so} style={styles.image} alt="Snow Oman" />

        <h3 style={styles.title}>Snow Oman – Mall of Oman</h3>

        <div style={styles.details}>
          <p>• <b>Location:</b> Mall of Oman, Muscat.</p>
          <p>• <b>Best time to visit:</b> April to October.</p>
          <p>• <b>Main product:</b> Indoor snow activities.</p>
          <p>• <b>Cultural importance:</b> Family recreation destination.</p>
        </div>

        {/* ⭐ NO-API Google Map */}
        <div style={styles.mapContainer}>
          <iframe
            title="Snow Oman Location"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "10px" }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps?q=Snow+Oman+Mall+of+Oman&output=embed"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default SnowOman;

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
    marginTop: "15px",
    padding: "0 20px",
  },
};
