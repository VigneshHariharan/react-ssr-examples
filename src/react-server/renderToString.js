import fs from 'fs';
import { expressServer, viteServer, __dirname } from '../server/baseServerAPI.js'
import path from "path";

expressServer.get("/renderToString", async (req, res, next) => {
  const url = req.originalUrl;
  try {
    // try with utf-8
    let htmlTemplate = fs.readFileSync(
      path.resolve(__dirname, "./vite-ssr/index.html"),
      "utf-8"
    );

    htmlTemplate = await viteServer.transformIndexHtml(url, htmlTemplate);

    const entryServerFilePath = path.resolve(
      __dirname,
      "/src/entryServer.jsx"
    );
    const loadedSSRModule = await viteServer.ssrLoadModule(entryServerFilePath);
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
