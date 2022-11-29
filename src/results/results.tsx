import { useEffect, useState } from "preact/hooks";
import { checkResults } from "../util/game";
import { guess, guesses } from "../util/store";

import { results, score } from "../util/store";

type Props = {
  restart: () => void;
};

export default function Results({ restart }: Props) {
  console.log(results.value);

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
            <li>
              <span>{res.valid ? "v" : "x"}</span> -<span>{res.word}</span>
              <span>+{res.score}</span>
            </li>
          ))}
        </ul>
        <div>total : {score.value}</div>
      </div>
      <div>
        <h4>Nice one! - wnat to play again?</h4>
        <div>
          <button onClick={restartClick}>Restart</button>
        </div>
      </div>
    </div>
  );
}
