import { guesses, score } from "../util/store";

export default function Count() {
  return (
    <div className="score">
      <div className="guesscount">Words : {guesses.value.length}</div>
      <div className="scorecount">Score : {score.value}</div>
    </div>
  );
}
