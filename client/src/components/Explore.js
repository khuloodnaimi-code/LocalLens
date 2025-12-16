import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Explore = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState(""); 
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/trips");
      const data = await res.json();
      setTrips(data);
      setFilteredTrips(data);
    } catch (err) {
      console.error("Fetch trips error:", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  useEffect(() => {
    let tempTrips = trips;

    
    if (searchTerm) {
      tempTrips = tempTrips.filter(trip =>
        trip.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

  
    if (priceFilter === "low") {
      tempTrips = tempTrips.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "high") {
      tempTrips = tempTrips.sort((a, b) => b.price - a.price);
    }

    setFilteredTrips([...tempTrips]);
  }, [searchTerm, priceFilter, trips]);

  const openInGoogleMaps = (lat, lng) => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.backBtn} onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h2 style={styles.heading}>Explore Places in Oman</h2>
      <p style={styles.descriptionText}>Discover beautiful places to visit across Oman. Use search or filter to find your next destination!</p>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          style={styles.selectInput}
        >
          <option value="">Sort by price</option>
          <option value="low">Lowest first</option>
          <option value="high">Highest first</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredTrips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          filteredTrips.map((trip) => {
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
                  {trip.description && <p style={styles.desc}>{trip.description}</p>}
                  {trip.address && <p style={styles.address}>{trip.address}</p>}

                  {hasLocation && (
                    <div style={{ marginTop: "10px" }}>
                      <iframe
                        title={`Map of ${trip.name}`}
                        width="100%"
                        height="180"
                        style={{ border: 0, borderRadius: "8px", cursor: "pointer" }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}
                        onClick={() => openInGoogleMaps(trip.location.lat, trip.location.lng)}
                      ></iframe>
                      <button
                        onClick={() => openInGoogleMaps(trip.location.lat, trip.location.lng)}
                        style={styles.mapBtn}
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
    fontSize: "28px",
    fontWeight: "700",
    color: "#2F3E2D",
    marginBottom: "5px",
    textAlign: "center",
  },
  descriptionText: {
    textAlign: "center",
    fontSize: "16px",
    color: "#2F3E2D",
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  searchInput: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  selectInput: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
  },
  card: {
    backgroundColor: "#6E8B5E",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "150px", 
    objectFit: "cover",
  },
  cardContent: {
    padding: "14px",
    color: "white",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "20px",
    fontWeight: "700",
  },
  price: {
    margin: "0 0 6px 0",
    fontSize: "14px",
    fontWeight: "600",
  },
  desc: {
    fontSize: "13px",
    margin: "0 0 4px 0",
  },
  address: {
    fontSize: "12px",
    fontStyle: "italic",
    margin: 0,
  },
  mapBtn: {
    marginTop: "5px",
    padding: "6px 10px",
    backgroundColor: "#fff",
    color: "#6E8B5E",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};


export default Explore;
