import "../styles/Button.css";

const Button = ({ text }) => {
  return (
    <button className="btn" type="submit">
      {text}
    </button>
  );
};

export default Button;
