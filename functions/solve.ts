import { A } from "../solve/letters";
import { solveLetters } from "../solve/solver";

export const handler = async (event) => {
  const solutions = solveLetters(A);
  console.log(" SOLUTIONS ====== \n", solutions);

  return {
    statusCode: 200,
    body: " [ ... ] ",
  };
};
