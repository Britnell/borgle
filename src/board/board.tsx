import Controls from "./controls";
import Header from "./header";
import "./board.css";
import { useEffect, useRef } from "preact/hooks";
import Letter, { isNeighbour, isUsed } from "./letter";
import { guess, GuessT, lastLetter } from "../util/store";

type RowT = Array<string>;
type BoardT = Array<RowT>;
type BoardProps = {
  letters: BoardT;
  state: [string, any];
};

const checkSquares = (x: number, y: number, w: number, h: number) => {
  // relative pos inside grid
  const Relx = (x / w) * 8;
  const Rely = (y / h) * 8;
  const nearX = Math.round(Relx);
  const nearY = Math.round(Rely);

  // distance to nearest square (relative)
  const Dx = Math.abs(nearX - Relx);
  const Dy = Math.abs(nearY - Rely);
  const distance = Math.sqrt(Dx * Dx + Dy * Dy);

  const lim = 0.35;
  if (distance > lim) return;
  if (nearX % 2 == 0 || nearY % 2 == 0) return; // even ones are midpoints between tiles

  const row = (nearY - 1) / 2;
  const col = (nearX - 1) / 2;
  return [row, col];
};

type PosType = number[];

export default function Board({ letters, state }: BoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lastTouched = useRef<PosType>([]);

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const addLetter = ({ row, col, letter }: GuessT) =>
      (guess.value = [...guess.value, { letter, row, col }]);

    const drag = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (!touch) return;

      const p = { x: touch.clientX - rect.x, y: touch.clientY - rect.y };

      const squ = checkSquares(p.x, p.y, rect.width, rect.height);
      if (!squ) return;

      const last = lastTouched.current;

      const isNew = squ[0] !== last[0] || squ[1] !== last[1];

      if (!isNew) return;
      lastTouched.current = squ;

      /// check if valid choice
      const [row, col] = squ;
      const touched = {
        letter: letters[row][col],
        row,
        col,
      };

      // first letter
      if (!lastLetter.value) return addLetter(touched);

      if (isUsed(row, col, guess.value)) return;
      if (!isNeighbour(row, col, lastLetter.value)) return;
      addLetter(touched);
    };

    ref.current.addEventListener("touchmove", drag);
    return () =>
      ref.current && ref.current.removeEventListener("touchmove", drag);
  }, [ref, lastTouched]);

  return (
    <>
      <main className="boardcontainer">
        <h3>Your Word : </h3>
        <div className="guessrow">
          {guess.value.map((g, i) => (
            <span className="letter" key={i}>
              {g.letter}
            </span>
          ))}
        </div>
        <div className="board" ref={ref}>
          {letters.map((letters, row) =>
            letters.map((letter, i) => (
              <Letter key={i} letter={letter} row={row} col={i} />
            ))
          )}
        </div>
        <Controls />
      </main>
    </>
  );
}
