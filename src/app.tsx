import { useState } from "preact/hooks";

import Board from "./board";
import Counter from "./counter";
import Results from "./results";

import "./util/store";
import { createBoard } from "./util/game";

import "./app.css";
import Header from "./board/header";

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
      {playing === "playing" ? (
        <Header state={playState} />
      ) : (
        <header>
          <h1>Borgle </h1>{" "}
        </header>
      )}
      {playing === "ready" && (
        <main className="start">
          <h2>Start a new game</h2>
          <button className="button start" onClick={startGame}>
            Start
          </button>
        </main>
      )}
      {playing === "playing" && letters && (
        <Board letters={letters} state={playState} />
      )}
      {playing === "finished" && <Results restart={startGame} />}
    </>
  );
}
