export const dice = [
  "AAEEGN".split(""),
  "ABBJOO".split(""),
  "ACHOPS".split(""),
  "AFFKPS".split(""),
  "AOOTTW".split(""),
  "CIMOTU".split(""),
  "DEILRX".split(""),
  "DELRVY".split(""),
  "DISTTY".split(""),
  "EEGHNW".split(""),
  "EEINSU".split(""),
  "EHRTVW".split(""),
  "EIOSST".split(""),
  "ELRTTY".split(""),
  "HIMNUQu".split(""),
  "HLNNRZ".split(""),
];

export const createBoard = () => {
  let order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let shuffle = [];

  while (order.length > 0) {
    if (order.length === 0) {
      shuffle.push(order.pop());
    } else {
      const r = Math.floor(Math.random() * order.length);
      shuffle.push(order[r]);
      order = order.slice(0, r).concat(order.slice(r + 1));
    }
  }

  shuffle = shuffle.map((i) => {
    if (i === undefined) throw new Error("impossible");
    const options = dice[i];
    const r = Math.floor(Math.random() * options.length);
    return options[r];
  });
  return [
    shuffle.slice(0, 4),
    shuffle.slice(4, 8),
    shuffle.slice(8, 12),
    shuffle.slice(12),
  ];
};

export const createBoardFaulty = () =>
  dice.map((row) =>
    row.map((letters) => {
      const r = Math.floor(Math.random() * letters.length);
      return letters[r];
    })
  );

export const lookupWord = async (word: string) =>
  fetch("/.netlify/functions/lookup?word=" + word).then((res) => res.json());

export const checkResults = async (list: string[]) =>
  fetch("/.netlify/functions/results", {
    method: "POST",
    body: list.join(","),
  }).then((res) => res.json());
