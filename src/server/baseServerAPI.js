import express from 'express';
import path from 'path';
import { createServer as createViteServer } from "vite";

const expressServer = express();

const viteServer = await createViteServer({
      appType: "custom",
      server: {
        middlewareMode: true,
        hmr: false,
      },
});

expressServer.use(viteServer.middlewares);


const __filename = path.resolve(".", "package.json");
const __dirname = path.dirname(__filename);


export { viteServer, expressServer, __dirname }