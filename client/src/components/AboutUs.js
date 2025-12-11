import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";   

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h1 className="title">About Us</h1>

      <p className="text">
        We share the best new places to explore in Oman!
        <br />
        Visit the amazing Al Hoota Cave, relax at the private Ladies Beach,
        enjoy a treat at the cozy Banana Cafe, and experience the stunning
        Rose Season in Jebel Akhdar.
        <br />
        Discover the beauty of Oman with us!
      </p>
    </div>
  );
};

export default AboutUs;