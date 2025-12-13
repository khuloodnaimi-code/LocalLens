import React from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const bgImage = "https://connsect.com/wp-content/uploads/2024/10/%D8%B3%D8%A7%D8%AD%D9%84-%D8%A8%D9%86%D8%AF%D8%B1-%D8%A7%D9%84%D8%AC%D8%B5%D9%87Bandar-Jissah-Beach.webp";

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.overlay} />


      <div style={styles.menuContainer}>
        <Button text="Explore Oman" onClick={() => navigate("/explore")} />
        <Button text="Check Available tour trip" onClick={() => navigate("/book-trip")} />
        <Button text="Explore Oman In Motion" onClick={() => navigate("/videos")} />
        <Button text="About Us" onClick={() => navigate("/about-us")} />
        <Button text="FAQ" onClick={() => navigate("/faq")} />
      </div>

      <div style={styles.footer}>
        <h1 style={styles.footerTitle}>DISCOVER OMAN</h1>
        <h2 style={styles.footerSubtitle}>WITH LOCALENS</h2>
      </div>
    </div>
  );
};

const Button = ({ text, onClick }) => (
  <div style={styles.button} onClick={onClick}>
    <span>{text}</span>
    <FaArrowRight style={{ fontSize: "18px" }} />
  </div>
);

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255, 255, 255, 0.45)",
    backdropFilter: "blur(2px)",
  },

  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "rgba(255,255,255,0.7)",
    padding: "10px 15px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: 2,
    boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
  },

  menuContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "420px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    zIndex: 2,
  },

  button: {
    background: "rgba(255,255,255,0.65)",
    padding: "14px 22px",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
    transition: "0.3s",
  },

  footer: {
    position: "absolute",
    bottom: "50px",
    textAlign: "center",
    zIndex: 2,
  },

  footerTitle: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2F3E2D",
    letterSpacing: "3px",
  },

  footerSubtitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "300",
    color: "#2F3E2D",
    letterSpacing: "3px",
  },
};

export default HomePage;
