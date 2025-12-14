import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [lastResult, setLastResult] = useState(null);

  return (
    <GameContext.Provider value={{ lastResult, setLastResult }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
