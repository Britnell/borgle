import Controls from "./controls";
import Count from "./count";
import Row from "./row";
import "./board.css";
import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";

type RowT = Array<string>;
type BoardT = Array<RowT>;
type BoardProps = {
  letters: BoardT;
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

  const lim = 0.24;
  if (Dx > lim || Dy > lim) return;
  if (nearX % 2 == 0 || nearY % 2 == 0) return; // even ones are midpoints between tiles

  const row = (nearY - 1) / 2;
  const col = (nearX - 1) / 2;
  return [row, col];
};

type PosType = number[];

// const swipeClick = (row: number, col: number) => {
//   if (!lastLetter.value) return;

//   if (isNeighbour(row, col, lastLetter.value)) {
//     console.log(row, col);
//   }
// };

export default function Board({ letters }: BoardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const lastTouched = useRef<PosType>([]);

  useEffect(() => {
    if (!ref.current) return;
    if (!logRef.current) return;

    const rect = ref.current.getBoundingClientRect();

    const drag = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (!touch) return;

      const p = { x: touch.clientX - rect.x, y: touch.clientY - rect.y };

      const squ = checkSquares(p.x, p.y, rect.width, rect.height);
      if (!squ) return;

      const last = lastTouched.current;

      const isNew = squ[0] !== last[0] || squ[1] !== last[1];

      if (isNew) {
        console.log(squ);
        lastTouched.current = squ;
        if (logRef.current)
          logRef.current.textContent = ` ${squ[0]} - ${squ[1]}`;
      }
    };

    ref.current.addEventListener("touchmove", drag);
    return () =>
      ref.current && ref.current.removeEventListener("touchmove", drag);
  }, [ref, lastTouched, logRef]);

  return (
    <div className="boardcontainer">
      <Count />
      <div className="board" ref={ref}>
        {letters.map((row, i) => (
          <Row key={i} letters={row} row={i} />
        ))}
      </div>
      <div ref={logRef}></div>

      <Controls />
    </div>
  );
}
