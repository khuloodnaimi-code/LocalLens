import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Faq.css"; 

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Back Button */}
      <div className="backRow">
        <IoIosArrowBack 
          size={28} 
          style={{ cursor: "pointer" }} 
          onClick={() => navigate(-1)} 
        />
        <h2 className="title">FAQs</h2>
      </div>

      {/* FAQ List */}
      <div className="faqBox">
        <p className="question">1. What is LocalLens?</p>
        <p className="answer">
          • A platform that provides information, booking, and interactive features 
          for exploring Oman.
        </p>
      </div>

      <div className="faqBox">
        <p className="question">
          2. What kind of content and features does Oman Explorer offer?
        </p>
        <p className="answer">
          • Destination guides, booking options, interactive maps, user reviews, 
          and admin management.
        </p>
      </div>

      <div className="faqBox">
        <p className="question">
          3. How can I book tours and activities through Oman Explorer?
        </p>
        <p className="answer">
          • Through the easy-to-use booking system on the website.
        </p>
      </div>
    </div>
  );
};

export default FAQ;
