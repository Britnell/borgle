import { effect } from "@preact/signals";
import { useGuess } from "../util/store";

export default function Count() {
  const { guesses } = useGuess();

  return <div className="guesscount">{guesses.value.length}</div>;
}
