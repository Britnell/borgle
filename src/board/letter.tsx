import { useEffect, useRef } from "preact/hooks";
import { useComputed } from "@preact/signals";
import { guess, GuessT, lastLetter } from "../util/store";

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

export const isUsed = (row: number, col: number, guess: GuessT[]) =>
  guess.find((g) => g.row === row && g.col === col) ? true : false;

export const isNeighbour = (row: number, col: number, guess: GuessT) => {
  if (Math.abs(guess.row - row) > 1) return false;
  if (Math.abs(guess.col - col) > 1) return false;
  return true;
};

const Letter = ({ col, row, letter }: LetterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isSelected = useComputed(() =>
    guess.value.find((g) => g.row === row && g.col === col) ? true : false
  );

  const isLast = useComputed(() => {
    if (!lastLetter.value) return false;
    return lastLetter.value.row === row && lastLetter.value.col === col
      ? true
      : false;
  });

  const rollback = () => {
    const g = guess.value.findIndex(
      (letter) => letter.row === row && letter.col === col
    );
    guess.value = guess.value.slice(0, g + 1);
  };

  const addletter = () =>
    (guess.value = [
      ...guess.value,
      {
        row,
        col,
        letter,
      },
    ]);

  const click = () => {
    if (!ref.current) return;

    // first letter
    if (!lastLetter.value) return addletter();

    // has been used
    if (isUsed(row, col, guess.value)) {
      rollback();
      return;
    }

    // neighbour
    if (isNeighbour(row, col, lastLetter.value)) return addletter();

    // Invalid letter
    shake(ref.current); // animation
  };

  return (
    <div
      ref={ref}
      onClick={click}
      onTouchStart={click}
      className={[
        "letter",
        isLast.value ? "last" : isSelected.value ? "selected" : "",
      ].join(" ")}
    >
      <div className="square"></div>
      <div className="content">{letter}</div>
    </div>
  );
};

export default Letter;
