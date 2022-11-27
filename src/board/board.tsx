import "./board.css";
import WordInput from "./controls";
import Row from "./row";

type RowT = Array<string>;
type BoardT = Array<RowT>;
type BoardProps = {
  letters: BoardT;
};

export default function Board({ letters }: BoardProps) {
  return (
    <div>
      <div className="board">
        {letters.map((row, i) => (
          <Row key={i} letters={row} row={i} />
        ))}
      </div>
      <WordInput />
    </div>
  );
}
