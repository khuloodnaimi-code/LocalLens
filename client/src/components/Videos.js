import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./Videos.css";

const Videos = () => {
  const navigate = useNavigate();

  return (
    <div className="videosPage">
      <div className="backBtn" onClick={() => navigate(-1)}>
        <IoIosArrowBack size={28} color="#000" />
      </div>

      <h1 className="videoTitle">Explore Oman – Reels 🎥</h1>

      <div className="reelsContainer">
        <div className="reel">
          <video className="reelVideo" controls playsInline>
            <source src="/videos/video1.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="reel">
          <video className="reelVideo" controls playsInline>
            <source src="/videos/video2.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="reel">
          <video className="reelVideo" controls playsInline>
            <source src="/videos/video3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Videos;
