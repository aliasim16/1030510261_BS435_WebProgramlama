import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import PageWrapper from "../components/PageWrapper";

export default function ResultScreen() {
  const navigate = useNavigate();
  const { lastResult } = useGame();

  if (!lastResult) {
    navigate("/");
    return null;
  }

  const { isWin, winOn, correctImage, mode } = lastResult;

  let title = "";
  let description = "";

  if (isWin && winOn === "first") {
    title = "Tebrikler! 🎉";
    description = "İlk tahmininde doğru bildin.";
  } else if (isWin && winOn === "second") {
    title = "Güzel İş! 👏";
    description = "İkinci tahminde doğru bildin.";
  } else {
    title = "Yanlış 😔";
    description = "Bu turda AI görselini bulamadın.";
  }

  return (
    <PageWrapper>
      <div
        className="card shadow-lg p-5 text-center"
        style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}
      >
        {/* Başlık */}
        <h1 className="fw-bold mb-2">{title}</h1>
        <p className="text-muted">{description}</p>

        {/* Mod etiketi */}
        <span
          className={`badge ${
            mode === "hard" ? "bg-danger" : "bg-success"
          } mb-4`}
        >
          Mod: {mode.toUpperCase()}
        </span>

        {/*  BÜYÜTÜLMÜŞ GÖRSEL */}
        <div className="d-flex justify-content-center my-4">
          <img
            src={correctImage.url}
            alt="Doğru AI görseli"
            className="img-fluid rounded shadow"
            style={{
              maxWidth: "420px",
              width: "100%",
              border: "4px solid #22c55e",
            }}
          />
        </div>

        {/*  GÜNCEL BUTONLAR */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button
            className="btn btn-secondary px-4 hover:scale-105 transition"
            onClick={() => navigate("/game")}
          >
            🔄 Yeni Tur
          </button>

          <button
            className="btn btn-outline-dark px-4 hover:scale-105 transition"
            onClick={() => navigate("/")}
          >
            🏠 Ana Sayfa
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
