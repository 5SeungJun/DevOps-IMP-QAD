import React from "react";
import "../styles/SummaryCard.css";
import Tooltip from "./Tooltip";

const SummaryCard = ({
  title,
  value,
  color,
  icon: Icon,
  onClick,
  isActive,
  isToggle,
  chartKey,
  tooltipText,
}) => {
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

        <p className="summary-value" style={{ color: displayColor }}>
          {value}
        </p>

        <Tooltip text={tooltipText}>
          <Icon className="summary-icon" style={{ color: displayColor }} />
        </Tooltip>
      </div>
    </div>
  );
};

export default SummaryCard;
