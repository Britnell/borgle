import { useEffect, useState } from "preact/hooks";
import { checkResults } from "../util/game";
import { guess, guesses } from "../util/store";

import { results, score } from "../util/store";

type Props = {
  restart: () => void;
};

export default function Results({ restart }: Props) {
  const restartClick = () => {
    results.value = [];
    guesses.value = [];
    guess.value = [];
    restart();
  };
  return (
    <main className="results">
      <div className="restart">
        <p>Nice one! - want to play again? </p>
        <button onClick={restartClick}>Restart</button>
      </div>
      <div>
        <h2 className="title">Results</h2>
        <ul>
          {results.value.map((res) => (
            <li className={"item " + (res.valid ? "valid" : "invalid")}>
              <span>{res.valid ? "✔ " : "❌"}</span>
              <span className="word">{res.word}</span>
              <span className="points">+{res.score}</span>
            </li>
          ))}
        </ul>
        <h4>Total Score : {score.value}</h4>
      </div>
    </main>
  );
}
