import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";

export default function StartScreen() {
  const navigate = useNavigate();
  const { mode, setMode } = useGame();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>AI Guess Game</h1>
      <p>3 görsel arasından AI tarafından üretileni bulmaya çalış!</p>

      <div style={{ marginTop: "24px" }}>
        <h3>Oyun Modu Seç</h3>

        <div style={{ display: "inline-flex", gap: "12px", marginTop: "12px" }}>
          <button
            onClick={() => setMode("easy")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: mode === "easy" ? "2px solid #4CAF50" : "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Easy (İpucu + 2 Şans)
          </button>

          <button
            onClick={() => setMode("hard")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: mode === "hard" ? "2px solid #4CAF50" : "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Hard (Tek Şans)
          </button>
        </div>

        <p style={{ marginTop: "12px", fontStyle: "italic" }}>
          Seçili mod: <strong>{mode.toUpperCase()}</strong>
        </p>
      </div>

      <button
        onClick={handleStart}
        style={{ padding: "10px 20px", marginTop: "24px" }}
      >
        Başla
      </button>
    </div>
  );
}
