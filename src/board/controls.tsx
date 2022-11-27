import { useGuess } from "./guess";

const Controls = () => {
  const guess = useGuess();

  const submit = async () => {
    const word = guess.value.map((g) => g.letter).join("");

    const resp = await fetch("/.netlify/functions/lookup?word=" + word)
      .then((res) => res.json())
      .catch(console.log);
    console.log(" word valid : ", resp);
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
