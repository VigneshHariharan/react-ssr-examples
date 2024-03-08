import { use } from 'react';

function Comments({ getCommentsPromise }) {

  const data = use(getCommentsPromise());
  // const data = use(fetchData)
  console.log("comments ", data.results);
  const newResults = new Array(1000).fill(data.results[0])
  return (
    <div className="comments-container">
      <h1>Pokemons list</h1>
      <div>
        {newResults?.map(({ name }) => (
          <div
            key={name}
            style={{
              padding: "4px 8px",
              fontFamily: "monospace",
            }}
          >
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Comments }