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

  // exists
  if (dict.hasOwnProperty(word)) return true;

  // plurals
  if (word.slice(-1) === "s") {
    const hasSingular = dict.hasOwnProperty(word.slice(0, -1));
    if (hasSingular) return true;
  }
  if (word.slice(-2) === "es") {
    const hasSingular = dict.hasOwnProperty(word.slice(0, -2));
    if (hasSingular) return true;
  }

  return false;
};

export const handler = async (event) => {
  const word = event.queryStringParameters?.word.toLowerCase();

  try {
    if (!word) throw new Error(" xx ");

    const valid = lookup(word);

    return {
      statusCode: 200,
      body: JSON.stringify({ word, valid }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
