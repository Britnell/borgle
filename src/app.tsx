import { useState } from "preact/hooks";

import Board from "./board";
import Counter from "./counter";
import Results from "./results";

import { createBoard } from "./util/game";
import "./app.css";

export type StateT = {
  playing: boolean;
  time: number;
};

export function App() {
  const playState = useState("ready");
  const [letters, setLetter] = useState<Array<Array<string>> | null>(null);
  const [playing, setPlaying] = playState;

  const start = () => {
    const newLetters = createBoard();
    setLetter(newLetters);
    setPlaying("playing");
  };

  return (
    <>
      <header>
        <h1>Borgle </h1>{" "}
        {playing === "playing" && <Counter state={playState} />}
      </header>
      <main>
        {playing === "ready" && (
          <div className="start">
            <h2>Start a new game</h2>
            <button className="button start" onClick={start}>
              Start
            </button>
          </div>
        )}
        {playing === "playing" && letters && (
          <>
            <Board letters={letters} />
          </>
        )}
        {playing === "finished" && (
          <div>
            <button onClick={() => setPlaying("ready")}>done</button>
            <Results />
          </div>
        )}
      </main>
    </>
  );
}
