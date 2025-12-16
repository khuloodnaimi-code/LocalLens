import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const UpdateTrip = () => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const location = useLocation();
  const tripData = location.state?.trip;

  const tripId = paramId || tripData?._id;

  const [name, setName] = useState(tripData?.name || "");
  const [description, setDescription] = useState(tripData?.description || "");
  const [address, setAddress] = useState(tripData?.address || "");
  const [price, setPrice] = useState(tripData?.price || "");
  const [lat, setLat] = useState(tripData?.location?.lat || "");
  const [lng, setLng] = useState(tripData?.location?.lng || "");
  const [image, setImage] = useState(tripData?.image || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const mapUrl =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      : null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !address || !price || !lat || !lng || !image) {
      alert("Please fill all fields including coordinates and image URL.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/trips/${tripId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          address,
          price,
          image,
          location: { lat: Number(lat), lng: Number(lng) },
        }),
      });

      if (res.ok) {
        alert("Trip updated successfully!");
        navigate("/trips-crud");
      } else {
        alert("Failed to update trip.");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating trip.");
    }
  };

  const handleDelete = async () => {
    if (!tripId) {
      console.error("Trip ID is missing, cannot delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      const res = await fetch(`http://localhost:5000/trips/${tripId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Trip deleted successfully!");
        navigate("/trips-crud");
      } else {
        alert("Failed to delete trip.");
      }
    } catch (err) {
      console.error("Error deleting trip:", err);
    } finally {
      setShowDeleteConfirm(false);
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
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h2>Update Trip</h2>

      <form
        onSubmit={handleUpdate}
        style={{
          maxWidth: "500px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Price (OMR):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Latitude:</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Longitude:</label>
          <input
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: "100%" }}
            placeholder="Paste image URL here"
          />
        </div>

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

        <button type="submit" style={{ padding: "10px 20px", marginRight: "10px" }}>
          Update Trip
        </button>

        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "white",
          }}
        >
          Delete Trip
        </button>
      </form>

      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <p>Are you sure you want to delete this trip?</p>
            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleDelete}
                style={{
                  padding: "8px 15px",
                  marginRight: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Sure
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{ padding: "8px 15px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTrip;
