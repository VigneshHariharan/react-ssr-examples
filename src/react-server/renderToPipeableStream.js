import path from "path";
import {
  expressServer,
  viteServer,
  __dirname,
} from "../server/baseServerAPI.js";

expressServer.get("/renderToPipeableStream", async (req, res) => {
  const entryServerFilePath = path.resolve(
    __dirname,
    "/src/react-server/renderToPipeableStream.jsx"
  );
  const { render } = await viteServer.ssrLoadModule(entryServerFilePath);
  render(res);
});
