import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const UpdateTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const tripData = location.state?.trip;

  const [name, setName] = useState(tripData?.name || "");
  const [price, setPrice] = useState(tripData?.price || "");
  const [image, setImage] = useState(tripData?.image || "");
  const [description, setDescription] = useState(tripData?.description || "");
  const [address, setAddress] = useState(tripData?.address || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/trips/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, description, address }),
      });
      navigate("/trips-crud");
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update Trip</h1>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trip Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
};

export default UpdateTrip;
