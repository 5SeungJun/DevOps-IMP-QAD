import React from "react";
import "../styles/Header.css";
import logo from "../assets/QadLogo.png";

const Header = ({
  dropdownValue,
  setDropdownValue,
  handleSelectProject,
  testDate,
  projectsData,
}) => {
  console.log("프로젝트 데이터:", projectsData);
  return (
    
    <header className="header-root">
      <div className="header-left">
        <div className="logo-mark">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <div className="header-right">
        <div className="select-wrap">
          <label className="label">프로젝트</label>
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            className="project-select"
          >
            {projectsData?.map(
              // 기존 헤더에서 API로 받아온 프로젝트명으로 변경
              (project) => (
                <option key={project.project_uid} value={project.project_no}>
                  {project.project_name.trim()}
                </option>
              )
            )}
          </select>
          <button className="apply-btn" onClick={handleSelectProject}>
            적용
          </button>
        </div>

        <div className="recent-wrap">
          <div className="recent-label">최근 업데이트</div>
          <div className="recent-date">{testDate}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
