import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_POOL } from "../data/images";
import ImageOption from "../components/ImageOption";

export default function GameScreen() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);          // O turdaki 3 görsel
  const [correctIndex, setCorrectIndex] = useState(null); // AI olanın index'i
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [secondGuessIndex, setSecondGuessIndex] = useState(null);
  const [step, setStep] = useState("first");         // "first" | "second"
  const [hintVisible, setHintVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Yeni tur başlatma fonksiyonu
  const setupNewRound = () => {
    const aiImages = IMAGE_POOL.filter((img) => img.type === "ai");
    const realImages = IMAGE_POOL.filter((img) => img.type === "real");

    // Rasgele 1 AI + 2 REAL seçelim
    const randomAi = aiImages[Math.floor(Math.random() * aiImages.length)];
    const shuffledReal = [...realImages].sort(() => Math.random() - 0.5);
    const selectedReals = shuffledReal.slice(0, 2);

    let roundImages = [randomAi, ...selectedReals];

    // Sıralamayı karıştır
    roundImages = roundImages.sort(() => Math.random() - 0.5);

    const aiIndex = roundImages.findIndex((img) => img.type === "ai");

    setImages(roundImages);
    setCorrectIndex(aiIndex);
    setFirstGuessIndex(null);
    setSecondGuessIndex(null);
    setStep("first");
    setHintVisible(false);
    setMessage("");
  };

  useEffect(() => {
    setupNewRound();
  }, []);

  const handleImageClick = (index) => {
    if (images.length === 0) return;

    // İlk tahmin aşamasındaysak
    if (step === "first") {
      setFirstGuessIndex(index);

      if (index === correctIndex) {
        // İlk seferde doğru
        navigate("/result", {
          state: {
            isWin: true,
            winOn: "first",
            correctImage: images[correctIndex],
            firstGuessIndex: index,
            secondGuessIndex: null,
          },
        });
      } else {
        // Yanlışsa ipucu + ikinci şans
        setHintVisible(true);
        setMessage("İlk tahminin yanlış oldu. İpucuna göre tekrar dene!");
        setStep("second");
      }
    }

    // İkinci tahmin aşamasındaysak
    else if (step === "second") {
      // Aynı görseli tekrar seçmesin
      if (index === firstGuessIndex) {
        setMessage("Bu görseli zaten seçtin, diğerlerinden birini dene.");
        return;
      }

      setSecondGuessIndex(index);

      const isWin = index === correctIndex;

      navigate("/result", {
        state: {
          isWin,
          winOn: isWin ? "second" : "none",
          correctImage: images[correctIndex],
          firstGuessIndex,
          secondGuessIndex: index,
        },
      });
    }
  };

  const aiImage = images[correctIndex];

  return (
    <div style={{ textAlign: "center", marginTop: "32px" }}>
      <h1>Hangi Görsel AI Tarafından Üretildi?</h1>
      <p>3 görselden yalnızca biri yapay zekâ üretimi. Hangisi olduğunu tahmin et!</p>

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
            isSelected={index === firstGuessIndex || index === secondGuessIndex}
          />
        ))}
      </div>

      {hintVisible && aiImage && (
        <div
          style={{
            marginTop: "24px",
            padding: "12px 16px",
            display: "inline-block",
            borderRadius: "8px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <strong>İpucu:</strong> {aiImage.hint}
        </div>
      )}

      {message && (
        <p style={{ marginTop: "16px", fontStyle: "italic" }}>{message}</p>
      )}

      <button
        onClick={setupNewRound}
        style={{
          marginTop: "24px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        Yeni Tur Başlat
      </button>
    </div>
  );
}
