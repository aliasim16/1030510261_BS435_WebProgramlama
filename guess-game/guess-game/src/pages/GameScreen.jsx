import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_POOL } from "../data/images";
import ImageOption from "../components/ImageOption";
import { useGame } from "../context/GameContext";

export default function GameScreen() {
  const navigate = useNavigate();
  const { setLastResult } = useGame();

  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const [step, setStep] = useState("first"); // "first" | "second"
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  // -----------------------------
  // Yeni turu hazırla
  // -----------------------------
  const setupNewRound = () => {
    const aiImages = IMAGE_POOL.filter(img => img.type === "ai");
    const realImages = IMAGE_POOL.filter(img => img.type === "real");

    const aiImage = aiImages[Math.floor(Math.random() * aiImages.length)];
    const shuffledReals = [...realImages].sort(() => Math.random() - 0.5);
    const selectedReals = shuffledReals.slice(0, 2);

    let roundImages = [aiImage, ...selectedReals];
    roundImages = roundImages.sort(() => Math.random() - 0.5);

    const aiIndex = roundImages.findIndex(img => img.type === "ai");

    setImages(roundImages);
    setCorrectIndex(aiIndex);
    setStep("first");
    setFirstGuessIndex(null);
    setMessage("");
    setShowHint(false);
  };

  useEffect(() => {
    setupNewRound();
  }, []);

  // -----------------------------
  // Görsel tıklama
  // -----------------------------
  const handleImageClick = (index) => {
    // İlk tahmin
    if (step === "first") {
      setFirstGuessIndex(index);

      if (index === correctIndex) {
        // DOĞRU – ilk tahmin
        setLastResult({
          isWin: true,
          winOn: "first",
          correctImage: images[correctIndex],
        });
        navigate("/result");
      } else {
        // YANLIŞ – ipucu + ikinci şans
        setStep("second");
        setShowHint(true);
        setMessage("Yanlış tahmin. İpucuna bak ve tekrar dene!");
      }
    }

    // İkinci tahmin
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
      });

      navigate("/result");
    }
  };

  const aiImage = images[correctIndex];

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ textAlign: "center", marginTop: "32px" }}>
      <h1>AI Guess Game</h1>
      <p>3 görselden hangisi AI tarafından üretilmiştir?</p>

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
            isDisabled={step === "second" && index === firstGuessIndex}
            isSelected={index === firstGuessIndex}
          />
        ))}
      </div>

      {showHint && aiImage && (
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
        <p style={{ marginTop: "16px", fontStyle: "italic" }}>
          {message}
        </p>
      )}

      <button
        onClick={setupNewRound}
        style={{
          marginTop: "24px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Yeni Tur Başlat
      </button>
    </div>
  );
}
