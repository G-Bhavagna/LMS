import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { useParams, useNavigate } from 'react-router-dom';

const YouTubePlayer = () => {
  const { courseUrl } = useParams();
  const decodedUrl = decodeURIComponent(courseUrl);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous URL
  };
  
  return (
    <div>
      <style>{`
        .back-button {
          display: block;
          margin: 20px 250px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          top: 10;
        }

        .back-button:hover {
          background-color: #0056b3;
        }

        .player-container {
          position: relative;
          width: 70%;
          margin: 0 auto;
        }

        .player-wrapper {
          position: relative;
          padding-top: 56.25%;
        }

        .react-player {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
      <div className="player-container">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={decodedUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
      <button className="back-button" onClick={handleGoBack}>Back</button>
    </div>
  );
};

export default YouTubePlayer;
