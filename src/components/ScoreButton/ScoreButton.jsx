import "./ScoreButton.css";

function ScoreButton({ isActive, Disabeld, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={Disabeld}
      className={`score-button ${isActive ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

export default ScoreButton;
