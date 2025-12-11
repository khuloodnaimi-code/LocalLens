import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./AddTrip.css"; // import the CSS file

const AddTrip = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const submitTrip = async (e) => {
    e.preventDefault();

    const newTrip = { name, price, image };

    await fetch("http://localhost:5000/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrip),
    });

    navigate("/trips-crud");
  };

  return (
    <div className="page">
      {/* Back Button */}
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} />
      </div>

      <h1 className="title">Add New Trip</h1>

      <form className="form" onSubmit={submitTrip}>
        <label className="label">Trip Name</label>
        <input
          type="text"
          className="input"
          placeholder="Enter trip name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="label">Price (OMR)</label>
        <input
          type="number"
          className="input"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label className="label">Image URL</label>
        <input
          type="text"
          className="input"
          placeholder="Enter image link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type="submit" className="addBtn">
          Add Trip
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
