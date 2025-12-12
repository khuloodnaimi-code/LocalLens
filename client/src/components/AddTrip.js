import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitTrip = async (e) => {
    e.preventDefault();

    const newTrip = { name, price, image, description, address };

    try {
      const res = await fetch("http://localhost:5000/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTrip),
      });

      if (res.ok) {
        setSuccessMsg("Trip added successfully!");
        setName("");
        setPrice("");
        setImage("");
        setDescription("");
        setAddress("");

        setTimeout(() => navigate("/trips-crud"), 1000);
      } else {
        const data = await res.json();
        alert("Failed to add trip: " + data.message);
      }
    } catch (err) {
      console.error("Add trip error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page" style={{ padding: "20px" }}>
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} />
      </div>

      <h1>Add New Trip</h1>
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <form onSubmit={submitTrip} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Trip Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default AddTrip;
