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

  const { isWin, winOn, correctImage,mode } = lastResult;

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
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{title}</h1>
      <p>{description}</p>
         <p>
            Mod: <strong>{mode?.toUpperCase()}</strong>
        </p>
      <img
        src={correctImage.url}
        alt="AI"
        style={{ width: 260, border: "2px solid green" }}
      />

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate("/game")}>Yeni Tur</button>
        <button onClick={() => navigate("/")}>Ana Sayfa</button>
      </div>
    </div>
    </PageWrapper>
  );
}
