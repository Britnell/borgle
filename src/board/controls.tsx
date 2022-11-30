import { useRef } from "preact/hooks";
import { lookupWord, scoreWord } from "../util/game";
import { guess, guesses, hasOccured, results, word } from "../util/store";

const Controls = () => {
  const submitRef = useRef(null);

  const submit = async () => {
    const w = word.value;

    guesses.value = [...guesses.value, w];
    guess.value = [];

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
      <button className="button" onClick={remove}>
        {"<<"}
      </button>
      <button className="button" onClick={clear}>
        Clear
      </button>
      <button
        ref={submitRef}
        className={`button submit ${hasOccured.value ? "occured" : ""} `}
        onClick={submit}
        disabled={hasOccured.value}
      >
        +
      </button>
    </>
  );
};

export default Controls;
