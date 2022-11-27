import { render } from "preact";
import { App } from "./app";
import "./index.css";
import { GuessProvider } from "./util/store";

render(
  <GuessProvider>
    <App />
  </GuessProvider>,
  document.getElementById("app") as HTMLElement
);
