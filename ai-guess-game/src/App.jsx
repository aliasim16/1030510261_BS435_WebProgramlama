import { useState } from "react";
import "./styles/app.css";
import StartScreen from "./components/StartScreen";
import GameBoard from "./components/GameBoard";
import ResultScreen from "./components/ResultScreen";

export default function App() {
  const [stage, setStage] = useState("start"); // start | play | result
  const [lastResult, setLastResult] = useState(null); // { correct: boolean, answerIdx: number }

  return (
    <div className="app">
      {stage === "start" && (
        <StartScreen onStart={() => setStage("play")} />
      )}

      {stage === "play" && (
        <GameBoard
          onFinish={(result) => {
            setLastResult(result);
            setStage("result");
          }}
        />
      )}

      {stage === "result" && (
        <ResultScreen
          result={lastResult}
          onRestart={() => setStage("play")}
          onBackToStart={() => setStage("start")}
        />
      )}
    </div>
  );
}
