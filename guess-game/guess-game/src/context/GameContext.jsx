import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [lastResult, setLastResult] = useState(null);

  // ✅ Oyun modu: "easy" | "hard"
  const [mode, setMode] = useState("easy");

  return (
    <GameContext.Provider value={{ lastResult, setLastResult, mode, setMode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
