import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_POOL } from "../data/images";
import ImageOption from "../components/ImageOption";
import { useGame } from "../context/GameContext";

export default function GameScreen() {
  const navigate = useNavigate();
  const { setLastResult, mode } = useGame();

  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const [step, setStep] = useState("first"); // "first" | "second"
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  const isHardMode = mode === "hard";

  // -----------------------------
  // Yeni turu hazırla
  // -----------------------------
  const setupNewRound = () => {
    const aiImages = IMAGE_POOL.filter((img) => img.type === "ai");
    const realImages = IMAGE_POOL.filter((img) => img.type === "real");

    const aiImage = aiImages[Math.floor(Math.random() * aiImages.length)];
    const shuffledReals = [...realImages].sort(() => Math.random() - 0.5);
    const selectedReals = shuffledReals.slice(0, 2);

    let roundImages = [aiImage, ...selectedReals];
    roundImages = roundImages.sort(() => Math.random() - 0.5);

    const aiIndex = roundImages.findIndex((img) => img.type === "ai");

    setImages(roundImages);
    setCorrectIndex(aiIndex);

    setStep("first");
    setFirstGuessIndex(null);
    setMessage("");
    setShowHint(false);
  };

  useEffect(() => {
    setupNewRound();
  }, [mode]); // ✅ mod değişince yeni tur hazırla

  // -----------------------------
  // Görsel tıklama
  // -----------------------------
  const handleImageClick = (index) => {
    // İlk tahmin
    if (step === "first") {
      setFirstGuessIndex(index);

      // ✅ Hard mod: tek şans => direkt sonuç
      if (isHardMode) {
        const isWin = index === correctIndex;
        setLastResult({
          isWin,
          winOn: isWin ? "first" : "none",
          correctImage: images[correctIndex],
          mode,
        });
        navigate("/result");
        return;
      }

      // ✅ Easy mod: iki şans
      if (index === correctIndex) {
        setLastResult({
          isWin: true,
          winOn: "first",
          correctImage: images[correctIndex],
          mode,
        });
        navigate("/result");
      } else {
        setStep("second");
        setShowHint(true);
        setMessage("Yanlış tahmin. İpucuna bak ve tekrar dene!");
      }
    }

    // İkinci tahmin (sadece Easy modda var)
    else if (step === "second") {
      if (index === firstGuessIndex) {
        setMessage("Bu görseli zaten seçtin. Diğerlerinden birini seç.");
        return;
      }

      const isWin = index === correctIndex;

      setLastResult({
        isWin,
        winOn: isWin ? "second" : "none",
        correctImage: images[correctIndex],
        mode,
      });

      navigate("/result");
    }
  };

  const aiImage = images[correctIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "32px" }}>
      <h1>AI Guess Game</h1>
      <p>
        Mod: <strong>{mode.toUpperCase()}</strong>{" "}
        {isHardMode ? "(Tek Şans)" : "(İpucu + 2 Şans)"}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginTop: "24px",
        }}
      >
        {images.map((img, index) => (
          <ImageOption
            key={img.id}
            image={img}
            onClick={() => handleImageClick(index)}
            isDisabled={!isHardMode && step === "second" && index === firstGuessIndex}
            isSelected={index === firstGuessIndex}
          />
        ))}
      </div>

      {/* ✅ Hard modda ipucu yok */}
      {!isHardMode && showHint && aiImage && (
        <div
          style={{
            marginTop: "24px",
            padding: "12px",
            backgroundColor: "#f2f2f2",
            display: "inline-block",
            borderRadius: "8px",
          }}
        >
          <strong>İpucu:</strong> {aiImage.hint}
        </div>
      )}

      {message && (
        <p style={{ marginTop: "16px", fontStyle: "italic" }}>{message}</p>
      )}

      <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={setupNewRound} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Yeni Tur
        </button>

        <button onClick={() => navigate("/")} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Mod Değiştir
        </button>
      </div>
    </div>
  );
}
