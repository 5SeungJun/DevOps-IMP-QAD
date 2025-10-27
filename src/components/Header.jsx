import React from 'react';
import '../styles/Header.css';

const Header = ({ dropdownValue, setDropdownValue, handleSelectProject, testDate, projectKeys }) => {
  return (
    <header className="header-root">
      <div className="header-left">
        <div className="logo-mark">◎</div>
        <div className="logo-text">DevOps QAD</div>
      </div>

      <div className="header-right">
        <div className="select-wrap">
          <label className="label">프로젝트</label>
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            className="project-select"
          >
            {projectKeys.map(pk => <option key={pk} value={pk}>{pk}</option>)}
          </select>
          <button className="apply-btn" onClick={handleSelectProject}>적용</button>
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
