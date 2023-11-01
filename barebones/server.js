// Import the framework and instantiate it
import Fastify from "fastify";
import { useState } from 'react';
import { renderToString } from "react-dom/server";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React client rendered</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}


function ServerRoot() {
  return (
    <>
      <div id="root">
        <App />
      </div>
      <script src="http://127.0.0.1:8080/client.js"></script>
    </>
  );
}

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  const html = renderToString(<ServerRoot />);

  reply.header("Content-Type", "text/html");
  reply.type("text/html");
  reply.send(html)
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  // eslint-disable-next-line no-undef
  process.exit(1);
}
