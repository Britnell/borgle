import { effect, Signal, signal, useComputed } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

export type GuessT = {
  row: number;
  col: number;
  letter: string;
  ref: any;
};

export type ScoreT = {
  word: string;
  valid: boolean;
  score: number;
};

type ContextType = {
  guess: Signal<Array<GuessT>>;
  word: Signal<string>;
  last: Signal<GuessT | null>;
  guesses: Signal<Array<string>>;
  hasOccured: Signal<boolean>;
  score: Signal<Array<ScoreT>>;
};

export const GuessContext = createContext({} as ContextType);

export const GuessProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => {
  const guess = signal<GuessT[]>([]);
  const guesses = signal<string[]>([]);
  const score = signal<ScoreT[]>([]);

  const word = useComputed(() => {
    console.log("word");
    return guess.value.map((g) => g.letter).join("");
  });
  const last = useComputed(() => {
    console.log("last");
    return guess.value.length === 0
      ? null
      : guess.value[guess.value.length - 1];
  });
  const hasOccured = useComputed(() => {
    console.log("hasoccured");
    return guesses.value.includes(word.value);
  });

  const value = { guess, word, last, guesses, hasOccured, score };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
};

export const useGuess = () => useContext(GuessContext);
