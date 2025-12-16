import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const AddTrip = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");

  const mapUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      : null;

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !description || !address || !price || !lat || !lng || !image) {
      alert("Please fill all fields including coordinates and image URL.");
      return;
    }

    const newTrip = {
      name,
      description,
      address,
      price,
      image,
      location: { lat: Number(lat), lng: Number(lng) },
    };

    try {
      const res = await fetch("http://localhost:5000/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrip),
      });

      if (res.ok) {
        alert("Trip added successfully!");
        navigate("/trips-crud");
      } else {
        alert("Failed to add trip.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding trip.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#AEDBBF",
        minHeight: "100vh",
      }}
    >
  
      <div
        style={{
          cursor: "pointer",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack size={28} />
      </div>

      <h2>Add New Trip</h2>

      <form
        onSubmit={handleAdd}
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (OMR)"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="number"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="Longitude"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        {image && (
          <div style={{ marginBottom: "10px" }}>
            <h4>Image Preview:</h4>
            <img
              src={image}
              alt={name}
              style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        {mapUrl && (
          <div style={{ marginBottom: "10px" }}>
            <h4>Map Preview:</h4>
            <iframe
              title="Trip Location"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: "8px" }}
              loading="lazy"
              allowFullScreen
              src={mapUrl}
            />
          </div>
        )}

        <button type="submit" style={{ padding: "10px 20px" }}>
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
