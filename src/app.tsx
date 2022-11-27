import { useState } from "preact/hooks";
import "./app.css";
import Board from "./board";
import { GuessProvider } from "./board/guess";

export function App() {
  //
  const letters = [
    "abcd".split(""),
    "fghi".split(""),
    "klmn".split(""),
    "prst".split(""),
  ];

  return (
    <>
      <header>
        <h1>Boggle</h1>
      </header>
      <main>
        <GuessProvider>
          <Board letters={letters} />
        </GuessProvider>
      </main>
    </>
  );
}
