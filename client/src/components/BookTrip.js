import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCoffee } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import jabel from "../assets/jabel_akhdar.jpg";
import "./BookTrip.css";

const BookTrip = () => {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [includeTransport, setIncludeTransport] = useState(false);

  // trip details
  const basePrice = 15;
  const transportPrice = 2;
  const tripDate = "Saturday, 24 April";
  const tripPlace = "Jabal Akhdar Rose Tour";

  const totalPrice = includeTransport ? basePrice + transportPrice : basePrice;

  const handleBooking = () => {
    setShowMessage(true);
  };

  return (
    <div className="page">
      {/* Back Button */}
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h1 className="title">Local Lens offers tour trip</h1>
      <p className="subtitle">
        Enjoy a group rose picking tour every Saturday in April
      </p>

      <img src={jabel} alt="Jabal Akhdar" className="mainImage" />

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
            <span>{tripDate}</span>
          </div>

          <div className="iconBox">
            <FaCoffee size={22} />
            <span>Omani Coffee</span>
          </div>
        </div>

        {/* Transportation Option */}
        <div className="transport">
          <input
            type="checkbox"
            checked={includeTransport}
            onChange={(e) => setIncludeTransport(e.target.checked)}
          />
          <span>Transportation included (+2 OMR)</span>
        </div>

        {/* Book Button */}
        <button className="bookBtn" onClick={handleBooking}>
          Book
        </button>

     
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="popupOverlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.div
                className="popupBox"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
              >
                <button
                  className="closeBtn"
                  onClick={() => setShowMessage(false)}
                >
                  ×
                </button>

                <motion.div
                  className="popupCheck"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  ✅
                </motion.div>

                <div className="popupText">
                  <strong>Booking Successful! 🎉</strong>
                  <p style={{ marginTop: "10px" }}>
                    <strong>Trip:</strong> {tripPlace}
                    <br />
                    <strong>Date:</strong> {tripDate}
                    <br />
                    <strong>Total Price:</strong> {totalPrice} OMR
                    <br />
                    {includeTransport ? (
                      <span>🚗 Transportation included</span>
                    ) : (
                      <span>🚗 No transportation selected</span>
                    )}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookTrip;
