import Letter from "./letter";

type Row = Array<string>;
type RowProps = { letters: Row; row: number };

const Row = ({ letters, row }: RowProps) => {
  return (
    <div className="row">
      {letters.map((l, i) => (
        <Letter key={i} letter={l} row={row} col={i} />
      ))}
    </div>
  );
};

export default Row;
