import { useGuess } from "../util/store";

export default function Count() {
  const { guesses } = useGuess();

  return (
    <div className="score">
      <div className="guesscount">Words : {guesses.value.length}</div>
      <div className="scorecount">Score : _</div>
    </div>
  );
}
