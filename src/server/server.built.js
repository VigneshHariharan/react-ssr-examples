// Import the framework and instantiate it
import Fastify from "fastify";
import { renderToString } from "react-dom/server";
import { ServerRoot } from '../ServerRoot.js';
import { jsx as _jsx } from "react/jsx-runtime";
const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  const html = renderToString( /*#__PURE__*/_jsx(ServerRoot, {}));
  reply.header("Content-Type", "text/html");
  reply.type("text/html");
  reply.send(html);
});

// Run the server!
try {
  await fastify.listen({
    port: 3000
  });
} catch (err) {
  fastify.log.error(err);
  // eslint-disable-next-line no-undef
  process.exit(1);
}
