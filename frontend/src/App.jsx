import React, { useState } from "react";
import Cards from "./components/Cards";
import ResultMessage from "./components/ResultMessage";

export default () => {
  const [attempts, setAttempts] = useState(0)
  const [hasWon, setHasWon] = useState(false);

  return (
    <div className="max-w-[1200px] my-2 mx-auto px-2">
      <p className="flex justify-end text-xl px-2 pb-5">Jogadas: {attempts}</p>
      <Cards attempts={attempts} setAttempts={setAttempts} setHasWon={setHasWon} />

      {hasWon && <ResultMessage attempts={attempts} />}
    </div>
  )
}