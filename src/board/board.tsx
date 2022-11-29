import Controls from "./controls";
import Count from "./count";
import Row from "./row";
import "./board.css";

type RowT = Array<string>;
type BoardT = Array<RowT>;
type BoardProps = {
  letters: BoardT;
};

export default function Board({ letters }: BoardProps) {
  return (
    <div className="boardcontainer">
      <Count />
      <div className="board">
        {letters.map((row, i) => (
          <Row key={i} letters={row} row={i} />
        ))}
      </div>
      <Controls />
    </div>
  );
}
