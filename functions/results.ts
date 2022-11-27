// import { lookup } from "../dict/helper";

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

const find_dict = (first_letter: string) => {
  const letter = first_letter.toLowerCase();
  const code = letter.charCodeAt(0);
  if (code < 97 || code > 122) throw new Error(" invalid letter character ");

  return lexicon[letter]();
};

const lookup = (word: string) => {
  if (word.length === 0) throw new Error(" empty string provided");

  const dict = find_dict(word[0]);
  return dict.hasOwnProperty(word);
};

export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ results: [{ x: 1 }, { b: 2 }] }),
  };
};
