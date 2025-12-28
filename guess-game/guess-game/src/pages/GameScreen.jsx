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
  const [step, setStep] = useState("first");
  const [firstGuessIndex, setFirstGuessIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);

  const isHard = mode === "hard";

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
  };

  useEffect(() => {
    setupNewRound();
  }, [mode]);

  const handleClick = (index) => {
    if (step === "first") {
      setFirstGuessIndex(index);

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
    <div className="container text-center mt-4">
      <h2 className="fw-bold">
        AI Guess Game{" "}
        <span className={`badge ${isHard ? "bg-danger" : "bg-success"}`}>
          {mode.toUpperCase()}
        </span>
      </h2>

      <div className="row justify-content-center mt-4 g-4">
        {images.map((img, idx) => (
          <div className="col-md-4" key={img.id}>
            <ImageOption
              image={img}
              onClick={() => handleClick(idx)}
              isDisabled={!isHard && step === "second" && idx === firstGuessIndex}
              isSelected={idx === firstGuessIndex}
            />
          </div>
        ))}
      </div>

      {!isHard && showHint && (
        <div className="alert alert-info mt-4">
          <strong>İpucu:</strong> {images[correctIndex]?.hint}
        </div>
      )}

      {message && <p className="text-muted mt-2">{message}</p>}

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-secondary" onClick={setupNewRound}>
          Yeni Tur
        </button>
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          Mod Değiştir
        </button>
      </div>
    </div>
  );
}
