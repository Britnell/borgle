import { effect, Signal, signal, useComputed } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

export type GuessT = {
  row: number;
  col: number;
  letter: string;
  ref: any;
};

type ContextType = {
  guess: Signal<Array<GuessT>>;
  word: Signal<string>;
  last: Signal<GuessT | null>;
  guesses: Signal<Array<string>>;
  hasOccured: Signal<boolean>;
};

export const GuessContext = createContext({} as ContextType);

export const GuessProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => {
  const guess = signal<GuessT[]>([]);
  const guesses = signal<string[]>([]);

  const word = useComputed(() => guess.value.map((g) => g.letter).join(""));
  const last = useComputed(() =>
    guess.value.length === 0 ? null : guess.value[guess.value.length - 1]
  );
  const hasOccured = useComputed(() => guesses.value.includes(word.value));

  const value = { guess, word, last, guesses, hasOccured };

  return (
    <GuessContext.Provider value={value}>{children}</GuessContext.Provider>
  );
};

export const useGuess = () => useContext(GuessContext);
