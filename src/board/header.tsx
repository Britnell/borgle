import Counter from "../counter";
import { guesses, score } from "../util/store";

type Props = {
  state: [string, any];
};
export default function Header({ state }: Props) {
  const setPlaying = state[1];
  const finish = () => setPlaying("results");

  return (
    <header className="scoreheader">
      <Counter state={state} />
      <div className="count">
        <div className="guess">Words : {guesses.value.length}</div>
        <div className="score">Score : {score.value}</div>
      </div>
      <button className="exit" onClick={finish}>
        Finish
      </button>
    </header>
  );
}
