import React, { useState } from "react";
import Cards from "./components/Cards";

export default () => {
  const [attempts, setAttempts] = useState(0)

  return (
    <div className="max-w-[1200px] my-8 mx-auto px-2">
      <p className="flex justify-end text-xl px-2 py-5">Jogadas: {attempts}</p>
      <Cards attempts={attempts} setAttempts={setAttempts} />
    </div>
  )
}