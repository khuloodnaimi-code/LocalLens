import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCoffee } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";

import jabel from "../assets/jabel_akhdar.jpg"; 
import "./BookTrip.css";

const BookTrip = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleBooking = () => {
    setShowMessage(true);
  };

  return (
    <div className="page">
      {/* Back arrow */}
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h1 className="title">Local Lens offers tour trip</h1>
      <p className="subtitle">
        Enjoy a group rose picking tour every Saturday in April
      </p>

      <img src={jabel} alt="Jabel Akhdar" className="mainImage" />

      <div className="section">
        <h3 className="sectionTitle">WHAT'S INCLUDED :</h3>
        <ul className="list">
          <li>Visit the rose farms in the mountain terraces</li>
          <li>Flower picking experiences</li>
          <li>Visit traditional rose factory</li>
        </ul>

        <div className="iconRow">
          <div className="iconBox">
            <GiMoneyStack size={22} />
            <span>15 OMR</span>
          </div>

          <div className="iconBox">
            <FaCalendarAlt size={22} />
            <span>Friday, 24 Oct</span>
          </div>

          <div className="iconBox">
            <FaCoffee size={22} />
            <span>Omani Coffee</span>
          </div>
        </div>

        <div className="transport">
          <input type="checkbox" />
          <span>Transportation included</span>
        </div>

        <button 
          className="bookBtn" 
          onClick={handleBooking}
        >
          Book
        </button>

        {/* Success Popup */}
        {showMessage && (
          <div className="popupOverlay">
            <div className="popupBox">
              <button className="closeBtn" onClick={() => setShowMessage(false)}>×</button>
              <p>Booking successful! 🎉<br/>We will contact you soon.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTrip;
