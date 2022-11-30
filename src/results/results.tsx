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
    <div>
      <h2>Results</h2>

      <div>
        <ul>
          {results.value.map((res) => (
            <li className={res.valid ? "valid" : "invalid"}>
              <span>{res.valid ? "✔ " : "❌"}</span> -<span>{res.word}</span>
              <span>+{res.score}</span>
            </li>
          ))}
        </ul>
        <h4>Total Score : {score.value}</h4>
      </div>
      <div>
        <h5>Nice one! - want to play again?</h5>
        <div>
          <button onClick={restartClick}>Restart</button>
        </div>
      </div>
    </div>
  );
}
