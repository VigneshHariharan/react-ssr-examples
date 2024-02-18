import {
  expressServer,
} from "../server/baseServerAPI.js";
import { getJavascriptFile } from './getClientJSFiles.js'
import { execSync } from 'child_process'

expressServer.get("/assets", async (req, res) => {
    console.log('assets call')
    execSync('yarn build', {
      timeout: 10000
    });
    console.log('exec timeout')
    res.sendFile(getJavascriptFile());
});
