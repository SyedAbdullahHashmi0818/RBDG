import { React, useState } from "react";
import "../cssFiles/diagramCard.css";

const DiagramCard = ({ diagramName, defaultImg, hoveredImg }) => {
  const [source, setSource] = useState(defaultImg);

  const handleHover = () => {
    setSource(hoveredImg);
  };

  const handleHoverOver = () => {
    setSource(defaultImg);
  };

  const sendSelection = () => {
    console.log(diagramName);
  };

  return (
    <div
      className="card"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOver}
      onClick={sendSelection}
    >
      <img src={source} alt="img" />
    </div>
  );
};

export default DiagramCard;
