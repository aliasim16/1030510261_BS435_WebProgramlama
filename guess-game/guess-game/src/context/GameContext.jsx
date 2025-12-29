import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [lastResult, setLastResult] = useState(null);
  const [mode, setMode] = useState("easy");

  // SCORE & STATS
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const resetGame = () => {
    setScore(0);
    setTotalRounds(0);
    setCorrectCount(0);
  };

  return (
    <GameContext.Provider
      value={{
        lastResult,
        setLastResult,
        mode,
        setMode,
        score,
        setScore,
        totalRounds,
        setTotalRounds,
        correctCount,
        setCorrectCount,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
