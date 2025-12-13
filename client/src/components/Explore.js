import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Explore = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

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

  const openInGoogleMaps = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div className="page" style={styles.page}>

      <div className="backBtn" style={styles.backBtn} onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h2 style={styles.heading}>Explore Places in Oman</h2>

      <div style={styles.grid}>
        {trips.length === 0 ? (
          <p>No trips available.</p>
        ) : (
          trips.map((trip) => {
            const hasLocation = trip.location?.lat && trip.location?.lng;
            const mapUrl = hasLocation
              ? `https://www.google.com/maps?q=${trip.location.lat},${trip.location.lng}&z=15&output=embed`
              : null;

            return (
              <div key={trip._id} style={styles.card}>
                {trip.image && <img src={trip.image} alt={trip.name} style={styles.image} />}
                <div style={styles.cardContent}>
                  <h3 style={styles.title}>{trip.name}</h3>
                  <p style={styles.price}>{trip.price} OMR</p>
                  {trip.description && <p style={styles.description}>{trip.description}</p>}
                  {trip.address && <p style={styles.address}>{trip.address}</p>}

                 
                  {hasLocation && (
                    <div style={{ marginTop: "10px" }}>
                      <iframe
                        title={`Map of ${trip.name}`}
                        width="100%"
                        height="200"
                        style={{ border: 0, borderRadius: "8px", cursor: "pointer" }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}
                        onClick={() => openInGoogleMaps(trip.location.lat, trip.location.lng)}
                      ></iframe>
                      <button
                        onClick={() => openInGoogleMaps(trip.location.lat, trip.location.lng)}
                        style={{
                          marginTop: "5px",
                          padding: "5px 10px",
                          cursor: "pointer",
                        }}
                      >
                        Open in Google Maps
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#AEDBBF",
    padding: "20px",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "5px",
    cursor: "pointer",
    zIndex: 2,
  },
  heading: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2F3E2D",
    marginBottom: "20px",
    textAlign: "center",
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
