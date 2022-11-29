import { useRef } from "preact/hooks";
import { lookupWord, scoreWord } from "../util/game";
import { guess, guesses, hasOccured, results, word } from "../util/store";

const Controls = () => {
  const submitRef = useRef(null);

  const submit = async () => {
    const w = word.value;

    guesses.value = [...guesses.value, w];
    // guess.value = [];

    const resp = await lookupWord(w).catch((e) => {
      throw e;
    });

    const result = {
      word: w,
      valid: resp.valid,
      score: scoreWord(w),
    };

    results.value = [...results.value, result];
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
