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

  const tooltipTexts = {
    vulner: "보안 취약점은 중요한 보안 이슈를 나타냅니다.",
    security: "보안 경고는 잠재적 위험이 있는 보안 결함을 의미합니다.",
    bug: "오류는 소프트웨어 버그의 개수를 나타냅니다.",
    smell: "개선 권장은 코드 내 유지보수가 필요한 부분입니다.",
    complexity: "복잡도는 코드의 복잡 정도를 평가합니다.",
  };

  return (
    <div className="issue-tab-container">
      {summaryKeys.map((key) => (
        // SummaryCard 컴포넌트는 외부에서 정의되어 있다고 가정합니다.
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
          tooltipText={tooltipTexts[key]} // 툴팁 텍스트 전달
        />
      ))}
    </div>
  );
};

export default IssueTab;
