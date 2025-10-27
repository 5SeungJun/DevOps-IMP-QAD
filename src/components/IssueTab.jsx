import React from "react";
import SummaryCard from "./SummaryCard";
import { AlertTriangle, Shield, Bug, Sun, Zap } from "lucide-react";
import "../styles/IssueTab.css";
import { chartColors } from "../data/constants";

const IssueTab = ({ summaryData, lineVisibility, toggleLine, chartKeyMap }) => {
  const cardIcons = {
    vulner: AlertTriangle,
    security: Shield,
    bug: Bug,
    smell: Sun,
    complexity: Zap,
  };

  const summaryKeys = ["vulner", "security", "bug", "smell", "complexity"];

  return (
    <div className="issue-tab-container">
      {summaryKeys.map((key) => (
        <SummaryCard
          key={key}
          title={chartKeyMap[key]}
          value={summaryData[key]}
          color={chartColors[chartKeyMap[key]]}
          isToggle={true}
          icon={cardIcons[key]}
          chartKey={chartKeyMap[key]}
          onClick={toggleLine}
          isActive={lineVisibility[chartKeyMap[key]]}
        />
      ))}
    </div>
  );
};

export default IssueTab;
