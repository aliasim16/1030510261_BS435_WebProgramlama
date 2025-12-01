import { useNavigate } from "react-router-dom";

export default function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>AI Guess Game</h1>
      <p>Gerçek ve yapay görselleri ayırt etme oyununa hoş geldin!</p>

      <button
        onClick={handleStart}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Başla
      </button>
    </div>
  );
}
