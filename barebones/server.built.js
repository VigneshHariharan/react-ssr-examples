// Import the framework and instantiate it
import Fastify from "fastify";
import { useState } from 'react';
import { renderToString } from "react-dom/server";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function App() {
  const [count, setCount] = useState(0);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("h1", {
      children: "Vite + React client rendered"
    }), /*#__PURE__*/_jsxs("div", {
      className: "card",
      children: [/*#__PURE__*/_jsxs("button", {
        onClick: () => setCount(count => count + 1),
        children: ["count is ", count]
      }), /*#__PURE__*/_jsxs("p", {
        children: ["Edit ", /*#__PURE__*/_jsx("code", {
          children: "src/App.jsx"
        }), " and save to test HMR"]
      })]
    }), /*#__PURE__*/_jsx("p", {
      className: "read-the-docs",
      children: "Click on the Vite and React logos to learn more"
    })]
  });
}
function ServerRoot() {
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      id: "root",
      children: /*#__PURE__*/_jsx(App, {})
    }), /*#__PURE__*/_jsx("script", {
      src: "http://127.0.0.1:8080/client.js"
    })]
  });
}
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
