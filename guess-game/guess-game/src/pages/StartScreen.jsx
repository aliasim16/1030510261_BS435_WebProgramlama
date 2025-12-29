import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import PageWrapper from "../components/PageWrapper";


export default function StartScreen() {
  const navigate = useNavigate();
  const { mode, setMode } = useGame();

  return (
    <PageWrapper>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "520px", width: "100%", borderRadius: "20px" }}
      >
        {/*  Title */}
        <h1 className="fw-bold mb-3 text-dark">AI Guess Game</h1>

        <p className="text-muted mb-4">
          3 görsel arasından <strong>AI tarafından üretileni</strong> bul!
        </p>

        {/*  Mode Selector */}
        <div className="mb-4">
          <h5 className="mb-3">Oyun Modu</h5>

          <div className="btn-group w-100">
            <button
              className={`btn ${
                mode === "easy"
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setMode("easy")}
            >
              Easy
            </button>

            <button
              className={`btn ${
                mode === "hard"
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => setMode("hard")}
            >
              Hard
            </button>
          </div>

          <p className="mt-3 text-secondary small">
            Seçili mod:{" "}
            <span className="fw-semibold">{mode.toUpperCase()}</span>
          </p>
        </div>

        {/*  Start Button */}
        <button
          className="btn btn-primary btn-lg w-100 mt-2"
          style={{ borderRadius: "12px" }}
          onClick={() => navigate("/game")}
        >
           Oyunu Başlat
        </button>

        {/* ℹ Info */}
        <p className="text-muted small mt-4">
          Easy: İpucu + 2 şans <br />
          Hard: Tek şans, ipucu yok
        </p>
      </div>
    </div>
    </PageWrapper>
  );
}
