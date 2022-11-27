import { useRef } from "preact/hooks";
import { useGuess } from "../util/store";
import { lookupWord } from "../util/game";
import { batch } from "@preact/signals";

const Controls = () => {
  const submitRef = useRef(null);
  const { guess, word, guesses, hasOccured } = useGuess();

  const submit = async () => {
    const w = word.value;
    console.log("submit ", w);

    guesses.value = [...guesses.value, w];
    // guess.value = [];
    // const resp = await lookupWord(_word).catch((e) => {
    //   console.log(" err ");
    // });
  };

  const clear = () => (guess.value = []);
  const remove = () => (guess.value = guess.value.slice(0, -1));

  return (
    <>
      <div className="controls">
        <div className="row buttons">
          <button onClick={remove}>{"<<"}</button>
          <button onClick={clear}>Clear</button>
          <button
            ref={submitRef}
            className={`submit ${hasOccured.value ? "occured" : ""} `}
            onClick={submit}
            disabled={hasOccured.value}
          >
            +
          </button>
        </div>
        <h3>Your Word : </h3>
        <div className="guessrow">
          {guess.value.map((g, i) => (
            <span className="letter" key={i}>
              {g.letter}
            </span>
          ))}
        </div>
        <div className="row"></div>
      </div>
    </>
  );
};

export default Controls;
