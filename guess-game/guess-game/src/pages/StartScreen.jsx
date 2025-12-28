import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function StartScreen() {
  const navigate = useNavigate();
  const { mode, setMode } = useGame();

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold mb-3">AI Guess Game</h1>
      <p className="text-muted">
        3 görsel arasından AI tarafından üretileni bul!
      </p>

      <div className="mt-4">
        <h5 className="mb-3">Oyun Modu</h5>

        <div className="d-flex justify-content-center gap-3">
          <button
            className={`btn ${
              mode === "easy" ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setMode("easy")}
          >
            Easy
          </button>

          <button
            className={`btn ${
              mode === "hard" ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => setMode("hard")}
          >
            Hard
          </button>
        </div>

        <p className="mt-3 text-secondary">
          Seçili mod: <strong>{mode.toUpperCase()}</strong>
        </p>
      </div>

      <button
        className="btn btn-primary btn-lg mt-4 px-5"
        onClick={() => navigate("/game")}
      >
        Başla
      </button>
    </div>
  );
}
