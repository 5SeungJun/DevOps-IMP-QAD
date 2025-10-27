import React, { useState, useMemo, useCallback } from "react";
import Header from "./Header";
import ChartComponent from "./ChartComponent";
import IssueTab from "./IssueTab";
import { projectData, projectKeys, chartKeyMap, chartColors } from "../data/constants";
import "../styles/Dashboard.css";

const DashBoard = () => {
  const [selectedProject, setSelectedProject] = useState(projectKeys[0]);
  const [dropdownValue, setDropdownValue] = useState(projectKeys[0]);

  const initialLineVisibility = useMemo(() => {
    return Object.values(chartKeyMap).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
  }, []);

  const [lineVisibility, setLineVisibility] = useState(initialLineVisibility);

  const currentData = useMemo(() => projectData[selectedProject], [selectedProject]);

  const handleSelectProject = useCallback(() => {
    setSelectedProject(dropdownValue);
    setLineVisibility(initialLineVisibility);
  }, [dropdownValue, initialLineVisibility]);

  const toggleLine = useCallback((key) => {
    setLineVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <div className="dashboard-container">
      <Header
        dropdownValue={dropdownValue}
        setDropdownValue={setDropdownValue}
        handleSelectProject={handleSelectProject}
        testDate={currentData.testDate}
        projectKeys={projectKeys}
      />
      <main className="dashboard-main">
        <ChartComponent
          chartData={currentData.chartData}
          lineVisibility={lineVisibility}
          chartKeyMap={chartKeyMap}
          chartColors={chartColors}
        />
        <IssueTab
          summaryData={currentData.summary}
          lineVisibility={lineVisibility}
          toggleLine={toggleLine}
          chartKeyMap={chartKeyMap}
        />
      </main>
    </div>
  );
};

export default DashBoard;
