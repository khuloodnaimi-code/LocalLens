import React, { useState } from "react";

const AdminProfileUpdate = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Admin:", form);
    alert("Admin details updated!");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Update</h1>

      <select
        name="id"
        style={styles.input}
        value={form.id}
        onChange={handleChange}
      >
        <option value="">Choose ID:</option>
        <option value="1">Admin 1</option>
        <option value="2">Admin 2</option>
      </select>

      <input
        name="name"
        placeholder="Update your name:"
        style={styles.input}
        onChange={handleChange}
      />

      <input
        name="image"
        placeholder="Update your image:"
        style={styles.input}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Update your price:"
        style={styles.input}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Update your location:"
        style={styles.input}
        onChange={handleChange}
      />

      <button style={styles.button} onClick={handleSubmit}>
        Update
      </button>
    </div>
  );
};

const styles = {
  page: {
    background: "#B5D8C6",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    paddingTop: "60px",
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px",
    color: "#4B6F52",
  },
  input: {
    width: "300px",
    padding: "12px",
    borderRadius: "20px",
    border: "none",
    fontSize: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 26px",
    borderRadius: "20px",
    border: "none",
    background: "white",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default AdminProfileUpdate;
