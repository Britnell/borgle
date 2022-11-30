import { useState } from "preact/hooks";

import Board from "./board";
import Counter from "./counter";
import Results from "./results";

import "./util/store";
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

  const startGame = () => {
    const newLetters = createBoard();
    setLetter(newLetters);
    setPlaying("playing");
  };

  return (
    <>
      {playing === "ready" && (
        <>
          <header>
            <h1>Borgle </h1>{" "}
          </header>
          <main className="start">
            <h2>Start a new game</h2>
            <button className="button start" onClick={startGame}>
              Start
            </button>
          </main>
        </>
      )}
      {playing === "playing" && letters && (
        <main>
          <Board letters={letters} state={playState} />
        </main>
      )}
      {playing === "finished" && (
        <main>
          <Results restart={startGame} />
        </main>
      )}
    </>
  );
}
