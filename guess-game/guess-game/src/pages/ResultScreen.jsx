import { useLocation, useNavigate } from "react-router-dom";

export default function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state;

  // Eğer state yoksa (sayfaya doğrudan gelmişse)
  if (!state) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>Sonuç Ekranı</h1>
        <p>Bu sayfaya doğrudan geldin. Oyuna geri dönmek için butona bas.</p>
        <button
          onClick={() => navigate("/game")}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
          }}
        >
          Oyuna Dön
        </button>
      </div>
    );
  }

  const { isWin, winOn, correctImage } = state;

  let title = "";
  let description = "";

  if (isWin && winOn === "first") {
    title = "Tebrikler! 🎉";
    description = "İlk tahmininde doğru görseli buldun.";
  } else if (isWin && winOn === "second") {
    title = "Güzel İş! 👏";
    description =
      "İlk tahminin yanlış olsa da, ipucunu kullanarak ikinci denemede doğru görseli buldun.";
  } else {
    title = "Bu Sefer Olmadı 😔";
    description =
      "İki denemede de AI görselini bulamadın. Bir sonraki turda daha dikkatli bak!";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{title}</h1>
      <p>{description}</p>

      {correctImage && (
        <div style={{ marginTop: "24px" }}>
          <p>Doğru cevap olan AI görseli:</p>
          <img
            src={correctImage.url}
            alt="Doğru AI görseli"
            style={{
              width: "260px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "2px solid #4CAF50",
            }}
          />
        </div>
      )}

      <div style={{ marginTop: "32px" }}>
        <button
          onClick={() => navigate("/game")}
          style={{
            padding: "10px 20px",
            marginRight: "12px",
          }}
        >
          Yeni Tur Oyna
        </button>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
          }}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}
