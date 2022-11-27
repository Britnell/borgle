import { Signal, signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { useContext } from "preact/hooks";

export type GuessT = {
  row: number;
  col: number;
  letter: string;
  ref: any;
};

type ContextType = Signal<Array<GuessT>>;

export const GuessContext = createContext({} as ContextType);

const createGuessState = () => signal<GuessT[]>([]);

export const GuessProvider = ({
  children,
}: {
  children: ComponentChildren;
}) => {
  const val = createGuessState();

  return <GuessContext.Provider value={val}>{children}</GuessContext.Provider>;
};

export const useGuess = () => useContext(GuessContext);
