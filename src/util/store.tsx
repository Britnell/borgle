import { computed, effect, signal } from "@preact/signals";

export type GuessT = {
  row: number;
  col: number;
  letter: string;
};

export const guess = signal<GuessT[]>([]);
export const guesses = signal<string[]>([]);

export type ResultsT = {
  word: string;
  valid: boolean;
  score: number;
};

export const results = signal<ResultsT[]>([]);

export const word = computed(() => guess.value.map((g) => g.letter).join(""));

export const hasOccured = computed(() => guesses.value.includes(word.value));
export const lastLetter = computed(() =>
  guess.value.length === 0 ? null : guess.value[guess.value.length - 1]
);

export const score = computed(() => {
  console.log(" > total ", results.value);
  return results.value.reduce((t, res) => t + (res.valid ? res.score : 0), 0);
});
