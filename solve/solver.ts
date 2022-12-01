import { type } from "os";

const lexicon = {
  a: () => require("../dict/a.json"),
  b: () => require("../dict/b.json"),
  c: () => require("../dict/c.json"),
  d: () => require("../dict/d.json"),
  e: () => require("../dict/e.json"),
  f: () => require("../dict/f.json"),
  g: () => require("../dict/g.json"),
  h: () => require("../dict/h.json"),
  i: () => require("../dict/i.json"),
  j: () => require("../dict/j.json"),
  k: () => require("../dict/k.json"),
  l: () => require("../dict/l.json"),
  m: () => require("../dict/m.json"),
  n: () => require("../dict/n.json"),
  o: () => require("../dict/o.json"),
  p: () => require("../dict/p.json"),
  q: () => require("../dict/q.json"),
  r: () => require("../dict/r.json"),
  s: () => require("../dict/s.json"),
  t: () => require("../dict/t.json"),
  u: () => require("../dict/u.json"),
  v: () => require("../dict/v.json"),
  w: () => require("../dict/w.json"),
  x: () => require("../dict/x.json"),
  y: () => require("../dict/y.json"),
  z: () => require("../dict/z.json"),
};

type RowT = string[];
type LettersT = RowT[];

const countGridLetters = (grid: LettersT) => {
  const letters = {};
  grid.forEach((row) => {
    row.forEach((letter) => {
      if (!letters[letter]) letters[letter] = 1;
      else letters[letter] += 1;
    });
  });
  return letters;
};

const countWordLetters = (word: string) => {
  const letters = {};
  word.split("").forEach((letter) => {
    if (!letters[letter]) letters[letter] = 1;
    else letters[letter] += 1;
  });
  return letters;
};

const checkWordCouldOccur = (grid: object, word: object) => {
  const letters = Object.keys(word);
  for (let l = 0; l < letters.length; l++) {
    const letter = letters[l];
    const g = grid[letter];
    if (!g) return false;
    const w = word[letter];
    if (g < w) return false;
  }
  return true;
};

const getDict = (ltr: string) => {
  let dictObj = lexicon[ltr]();
  return Object.keys(dictObj);
};

const filterPotentialWords = (dict: string[], gridLetters: object) => {
  const potentialWords: string[] = [];

  //   for (let l = 0; l < 1000; l++) {
  for (let l = 0; l < dict.length; l++) {
    const word = dict[l].toLowerCase();
    const wordLetters = countWordLetters(word);
    const lettersOccur = checkWordCouldOccur(gridLetters, wordLetters);
    if (lettersOccur) potentialWords.push(word);
  }
  return potentialWords;
};

type PosT = [number, number];

const getLetterPositions = (grid: LettersT, letter: string) => {
  const poss: PosT[] = [];
  grid.forEach((row, r) =>
    row.forEach((_letter, c) => {
      if (_letter === letter) poss.push([r, c]);
    })
  );
  return poss;
};
const getLetterMatrix = (grid: LettersT, word: string) => {
  return word.split("").map((letter) => getLetterPositions(grid, letter));
};

type MatrixT = Array<Array<PosT>>;

const validPosDiff = (a: PosT, b: PosT) => {
  if (Math.abs(a[0] - b[0]) > 1) return false;

  if (Math.abs(a[1] - b[1])) return false;
  return true;
};

const isPosInPath = (pos: PosT, path: PosT[]) =>
  path.find((_pos) => pos[0] === _pos[0] && _pos[1] === pos[1]);

const checkMatrixValid = (matrix: MatrixT) => {
  let validated = false;

  // iterative loop through tree branches
  const loop = (p: number, poss: PosT, path: PosT[]) => {
    const next = p + 1;

    if (next === matrix.length) {
      validated = true;
      return true;
    }

    matrix[next].forEach((nPoss) => {
      if (validated) return;

      // path is valid
      if (!validPosDiff(poss, nPoss)) return;

      // use letters only once
      const letterAlreadyUsed = isPosInPath(nPoss, path);
      if (letterAlreadyUsed) return;

      // continue
      loop(next, nPoss, [...path, poss]);
    });
  };

  // start tree looping
  matrix[0].forEach((poss) => {
    let path = [];
    loop(0, poss, path);
  });

  return validated;
};

const wordFitsIntoGrid = (grid: LettersT, word: string) => {
  const letterMatrix = getLetterMatrix(grid, word);

  const valid = checkMatrixValid(letterMatrix);
  if (valid) console.log(`${word} is valid `);

  return valid;
};

export const solveLetters = (grid: LettersT) => {
  // lowercase
  const _grid = grid.map((row) => row.map((letter) => letter.toLowerCase()));
  console.log(" SOLVE : \n", _grid);

  const gridLetters = countGridLetters(_grid);

  // Iterate over dicts by first letter
  let solutions: string[] = [];

  const allLetters = new Set(
    _grid.reduce((total, row) => total.concat(row), [])
  );

  [...allLetters].forEach((firstLetter) => {
    //  per Letter
    console.log(` # Solutions for '${firstLetter}' :  `);
    let dict = getDict(firstLetter);

    // Filter for possible only
    let potentialWords = filterPotentialWords(dict, gridLetters);
    potentialWords = potentialWords.filter((word) => word.length >= 3);

    console.log(" potential words : ", potentialWords.length);

    const validWords: string[] = [];
    potentialWords.forEach((word) => {
      if (wordFitsIntoGrid(_grid, word)) validWords.push(word);
    });
    console.log(" WOrds that are solutions : ", validWords);

    solutions = solutions.concat(validWords);
  });

  return solutions;
};
