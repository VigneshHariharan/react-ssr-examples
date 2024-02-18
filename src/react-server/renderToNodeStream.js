import path from 'path';
import { expressServer, viteServer, __dirname } from '../server/baseServerAPI.js';


// Deprecated but using this to learn why we are using
expressServer.get('/renderToNodeStream', async (req, res) => {
  const entryServerFilePath = path.resolve(__dirname,"/src/react-server/renderToNodeStreamApp.jsx");
  const { render } = await viteServer.ssrLoadModule(entryServerFilePath);
  render(res)
})



