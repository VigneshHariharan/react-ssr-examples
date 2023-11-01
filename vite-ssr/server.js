import fs from 'fs';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
    const app = express();

    const viteServer = await createViteServer({
      appType: "custom",
      server: {
        middlewareMode: true,
        hmr: false
      },
    });

    app.use(viteServer.middlewares);

    app.use("*",async (req, res, next) => {
        const url = req.originalUrl;

        try {
            // try with utf-8
            let htmlTemplate = fs.readFileSync(path.resolve(__dirname, './index.html'),'utf-8');

            htmlTemplate = await viteServer.transformIndexHtml(
              url,
              htmlTemplate
            );

            const entryServerFilePath = path.resolve(__dirname, "../src/entryServer.jsx");
            const loadedSSRModule = await viteServer.ssrLoadModule(
              entryServerFilePath
            );
            const { render } = loadedSSRModule;

            const appHtml = await render(url);

            const html = htmlTemplate.replace("<!--ssr-outlet-->", appHtml);
            res
              .status(200)
              .set({
                "Content-Type": "text/html",
              })
              .end(html);
        } catch (err) {
          // If an error is caught, let Vite fix the stack trace so it maps back
          // to your actual source code.
          viteServer.ssrFixStacktrace(err);
          next(err);
        }
    });

    console.log("listening to port 5173");
    app.listen(5173);
}

createServer();

