import { useState } from 'react';

export function Count({ text }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>{text} App file rendered in this </p>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}