import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_POOL } from "../data/images";
import ImageOption from "../components/ImageOption";
import { useGame } from "../context/GameContext";
import PageWrapper from "../components/PageWrapper";

export default function GameScreen() {
  const navigate = useNavigate();
  const { setLastResult, mode } = useGame();

  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [step, setStep] = useState("first");
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  const isHard = mode === "hard";

  // =========================
  // Yeni tur kur
  // =========================
  const setupNewRound = () => {
    const aiImages = IMAGE_POOL.filter(img => img.type === "ai");
    const realImages = IMAGE_POOL.filter(img => img.type === "real");

    const aiImg =
      aiImages[Math.floor(Math.random() * aiImages.length)];

    const reals = [...realImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const roundImages = [aiImg, ...reals].sort(
      () => Math.random() - 0.5
    );

    setImages(roundImages);
    setCorrectIndex(
      roundImages.findIndex(img => img.type === "ai")
    );
    setStep("first");
    setFirstGuessIndex(null);
    setShowHint(false);
    setMessage("");
  };

  useEffect(() => {
    setupNewRound();
  }, [mode]);

  // =========================
  // Tıklama logic
  // =========================
  const handleClick = (index) => {
    if (step === "first") {
      setFirstGuessIndex(index);

      // HARD: tek şans
      if (isHard) {
        setLastResult({
          isWin: index === correctIndex,
          winOn: index === correctIndex ? "first" : "none",
          correctImage: images[correctIndex],
          mode,
        });
        navigate("/result");
        return;
      }

      // EASY: ilk tahmin
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
        setMessage("Yanlış tahmin! İpucuna dikkat et.");
      }
    } else {
      // EASY: ikinci tahmin
      if (index === firstGuessIndex) return;

      setLastResult({
        isWin: index === correctIndex,
        winOn: index === correctIndex ? "second" : "none",
        correctImage: images[correctIndex],
        mode,
      });
      navigate("/result");
    }
  };

  return (
    <PageWrapper>
      <div className="container text-center mt-4">
        {/* Başlık */}
        <h2 className="fw-bold mb-4">
          AI Guess Game{" "}
          <span
            className={`badge ${
              isHard ? "bg-danger" : "bg-success"
            } fs-6`}
          >
            {mode.toUpperCase()}
          </span>
        </h2>

        {/* Görseller */}
        <div className="row justify-content-center mt-5 g-5">
          {images.map((img, idx) => (
            <div
              className="col-lg-4 col-md-6 d-flex justify-content-center"
              key={img.id}
            >
              <ImageOption
                image={img}
                onClick={() => handleClick(idx)}
                isDisabled={
                  !isHard &&
                  step === "second" &&
                  idx === firstGuessIndex
                }
                isSelected={idx === firstGuessIndex}
              />
            </div>
          ))}
        </div>

        {/* İpucu */}
        {!isHard && showHint && (
          <div className="alert alert-info mt-4">
            <strong>İpucu:</strong>{" "}
            {images[correctIndex]?.hint}
          </div>
        )}

        {/* Mesaj */}
        {message && (
          <p className="text-muted mt-2">{message}</p>
        )}

        {/* Alt butonlar */}
        <div className="d-flex justify-content-center gap-3 mt-5">
          <button
            className="btn btn-secondary px-4"
            onClick={setupNewRound}
          >
            🔄 Yeni Tur
          </button>
          <button
            className="btn btn-outline-dark px-4"
            onClick={() => navigate("/")}
          >
            🎮 Mod Değiştir
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
