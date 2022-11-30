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
          <h1 className="title">BORGLE </h1>{" "}
        </header>
      )}
      {playing === "ready" && (
        <main className="ready">
          <h2>Start a new game</h2>
          <div className="board">
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>

            <button className="start" onClick={startGame}>
              Start
            </button>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
            <div className="letter">
              <div className="square"></div>
            </div>
          </div>
        </main>
      )}
      {playing === "playing" && letters && (
        <Board letters={letters} state={playState} />
      )}
      {playing === "finished" && <Results restart={startGame} />}
    </>
  );
}
