import "./confetti.css";

const random = (min: number, max: number) => Math.random() * (max - min);

const Confetti = () => {
  const length = Array(50).fill(0);

  return (
    <div className="confetti">
      {length.map((l, i) => (
        <div
          style={{
            "--l": Math.random(),
            "--r": Math.random(),
            "--v": Math.random(),
          }}
          key={i}
          className="piece"
        ></div>
      ))}
    </div>
  );
};

export default Confetti;
