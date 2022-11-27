import { useGuess } from "./guess";

const Controls = () => {
  const guess = useGuess();

  const submit = () => {
    const word = guess.value.map((g) => g.letter);
    console.log(" submit ", word);
  };

  const clear = () => (guess.value = []);
  const remove = () => (guess.value = guess.value.slice(0, -1));

  return (
    <>
      <div className="controls">
        <div className="row buttons">
          <button onClick={remove}>{"<<"}</button>
          <button onClick={clear}>Clear</button>
          <button className="submit" onClick={submit}>
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
