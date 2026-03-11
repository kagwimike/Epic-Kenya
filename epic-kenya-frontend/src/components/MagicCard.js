import React from "react";
import "../styles/magic.css";

const MagicCard = ({ title, value }) => {
  return (
    <div className="magic-card">
      <h3 className="magic-title">{title}</h3>
      <p className="magic-value">{value}</p>
    </div>
  );
};

export default MagicCard;
