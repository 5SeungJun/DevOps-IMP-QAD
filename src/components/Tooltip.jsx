import React from "react";
import "../styles/Tooltip.css"; // 스타일용 CSS 별도 생성

const Tooltip = ({ children, text }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="tooltip-box">{text}</div>}
    </div>
  );
};

export default Tooltip;
