import {
  expressServer,
} from "../server/baseServerAPI.js";
import { getJavascriptFile } from './getClientJSFiles.js'
import { build } from 'vite';
import viteConfig from '../../vite.config.js'


expressServer.get("/assets", async (req, res) => {

    build(viteConfig);
    res.sendFile(getJavascriptFile());
});
