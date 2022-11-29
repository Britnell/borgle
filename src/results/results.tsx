import { useEffect, useState } from "preact/hooks";
import { checkResults } from "../util/game";
import { useGuess } from "../util/store";

export default function Results({}) {
  const [loading, setLoading] = useState(true);

  const { guesses } = useGuess();

  useEffect(() => {
    if (!loading) return;
    // CHECK RESULTS
    checkResults(guesses.value)
      .then((result) => {
        console.log(" RESYLT : ", result);
      })
      .catch(console.log);
  }, [loading]);

  return (
    <div>
      <h2>Results</h2>

      <ul>
        {guesses.value.map((str) => (
          <li>{str}</li>
        ))}
      </ul>
    </div>
  );
}
