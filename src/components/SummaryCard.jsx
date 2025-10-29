import React from "react";
import "../styles/SummaryCard.css";

const SummaryCard = ({ title, value, color, icon: Icon, onClick, isActive, isToggle, chartKey }) => {
  const cardClasses = `summary-card ${isActive ? "active" : "inactive"} ${
    isToggle ? "clickable" : ""
  }`;

  const displayColor = isActive ? color : "#9e9e9e";

  return (
    <div
      className={cardClasses}
      style={{ borderColor: displayColor }}
      onClick={isToggle ? () => onClick(chartKey) : undefined}
    >
      <div className="summary-header">
        <h4 className="summary-title">{title}</h4>
        <Icon className="summary-icon" style={{ color: displayColor }} />
      </div>
      <p className="summary-value" style={{ color: displayColor }}>
        {value}
      </p>
    </div>
  );
};

export default SummaryCard;
