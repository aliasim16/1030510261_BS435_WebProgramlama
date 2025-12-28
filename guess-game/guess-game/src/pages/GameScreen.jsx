import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_POOL } from "../data/images";
import ImageOption from "../components/ImageOption";
import { useGame } from "../context/GameContext";
import PageWrapper from "../components/PageWrapper";

export default function GameScreen() {
  const navigate = useNavigate();

  const {
    setLastResult,
    mode,
    score,
    setScore,
    totalRounds,
    setTotalRounds,
    correctCount,
    setCorrectCount,
  } = useGame();

  const [images, setImages] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [step, setStep] = useState("first");
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    mode === "hard" ? 8 : 15
  );

  const isHard = mode === "hard";

  // ======================
  // Yeni tur ayarla
  // ======================
  const setupNewRound = () => {
    const ai = IMAGE_POOL.filter(i => i.type === "ai");
    const real = IMAGE_POOL.filter(i => i.type === "real");

    const aiImg = ai[Math.floor(Math.random() * ai.length)];
    const reals = [...real].sort(() => Math.random() - 0.5).slice(0, 2);

    const round = [aiImg, ...reals].sort(() => Math.random() - 0.5);

    setImages(round);
    setCorrectIndex(round.findIndex(i => i.type === "ai"));
    setStep("first");
    setFirstGuessIndex(null);
    setShowHint(false);
    setMessage("");
    setTimeLeft(mode === "hard" ? 8 : 15);
  };

  useEffect(() => {
    setupNewRound();
  }, [mode]);

  // ======================
  // TIMER
  // ======================
  useEffect(() => {
    if (timeLeft <= 0 && correctIndex !== null) {
      setLastResult({
        isWin: false,
        winOn: "none",
        correctImage: images[correctIndex],
        mode,
      });

      setTotalRounds(totalRounds + 1);
      navigate("/result");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // ======================
  // Tıklama mantığı
  // ======================
  const handleClick = (index) => {
    if (step === "first") {
      setFirstGuessIndex(index);

      // HARD MODE
      if (isHard) {
        if (index === correctIndex) {
          setScore(score + 15);
          setCorrectCount(correctCount + 1);
        }

        setTotalRounds(totalRounds + 1);

        setLastResult({
          isWin: index === correctIndex,
          winOn: index === correctIndex ? "first" : "none",
          correctImage: images[correctIndex],
          mode,
        });
        navigate("/result");
        return;
      }

      // EASY MODE - ilk tahmin
      if (index === correctIndex) {
        setScore(score + 10);
        setCorrectCount(correctCount + 1);
        setTotalRounds(totalRounds + 1);

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
      // EASY MODE - ikinci tahmin
      if (index === firstGuessIndex) return;

      if (index === correctIndex) {
        setScore(score + 5);
        setCorrectCount(correctCount + 1);
      }

      setTotalRounds(totalRounds + 1);

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
        <h2 className="fw-bold mb-2">
          AI Guess Game{" "}
          <span className={`badge ${isHard ? "bg-danger" : "bg-success"}`}>
            {mode.toUpperCase()}
          </span>
        </h2>

        {/* Skor & İstatistik */}
        <div className="d-flex justify-content-center gap-4 mb-3">
          <span className="badge bg-primary fs-6">Skor: {score}</span>
          <span className="badge bg-secondary fs-6">Tur: {totalRounds}</span>
          <span className="badge bg-success fs-6">
            Başarı:{" "}
            {totalRounds === 0
              ? "0%"
              : Math.round((correctCount / totalRounds) * 100) + "%"}
          </span>
        </div>

        {/* Timer */}
        <div className="mb-3">
          <span
            className={`badge ${
              timeLeft <= 3 ? "bg-danger" : "bg-warning"
            } fs-6`}
          >
            ⏱️ {timeLeft} sn
          </span>
        </div>

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
                  !isHard && step === "second" && idx === firstGuessIndex
                }
                isSelected={idx === firstGuessIndex}
              />
            </div>
          ))}
        </div>

        {/* İpucu */}
        {!isHard && showHint && (
          <div className="alert alert-info mt-4">
            <strong>İpucu:</strong> {images[correctIndex]?.hint}
          </div>
        )}

        {/* Mesaj */}
        {message && <p className="text-muted mt-2">{message}</p>}

        {/* Alt butonlar */}
        <div className="d-flex justify-content-center gap-3 mt-5">
          <button className="btn btn-secondary px-4" onClick={setupNewRound}>
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
