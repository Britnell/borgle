import { useContext, useRef } from "preact/hooks";
import { GuessContext, GuessT } from "../util/store";
import { useComputed } from "@preact/signals";

type LetterProps = {
  col: number;
  row: number;
  letter: string;
};

const shake = (el: HTMLElement) => {
  const keyframes = [
    { transform: "rotate(0deg)" },
    { transform: "rotate(20deg)" },
    { transform: "rotate(-20deg)" },
    { transform: "rotate(0deg)" },
    {},
  ];
  const options = {
    duration: 500,
    easing: "ease-in-out",
  };
  el.animate(keyframes, options);
};

const isValid = (guesses: GuessT[], row: number, col: number): boolean => {
  // is First
  if (guesses.length === 0) return true;

  // check neighbour
  const last = guesses[guesses.length - 1];
  if (Math.abs(last.row - row) > 1) return false;
  if (Math.abs(last.col - col) > 1) return false;

  // use letters only once
  const self = guesses.find((g) => g.row === row && g.col === col);
  if (self) return false;

  return true;
};

const Letter = ({ col, row, letter }: LetterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { guess, last } = useContext(GuessContext);

  const isSelected = useComputed(() =>
    guess.value.find((g) => g.row === row && g.col === col) ? true : false
  );

  const isLast = useComputed(() => {
    if (!last.value) return false;
    return last.value.row === row && last.value.col === col ? true : false;
  });

  const click = () => {
    if (!ref.current) return;

    const valid = isValid(guess.value, row, col);
    if (!valid) {
      shake(ref.current);
      return console.log(" X ");
    }

    guess.value = [
      ...guess.value,
      {
        row,
        col,
        letter,
        ref,
      },
    ];
  };

  return (
    <div
      ref={ref}
      onClick={click}
      className={[
        "letter",
        isLast.value ? "last" : isSelected.value ? "selected" : "",
      ].join(" ")}
    >
      {letter}
    </div>
  );
};

export default Letter;
