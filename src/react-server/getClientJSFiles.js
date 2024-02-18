import { __dirname } from '../server/baseServerAPI.js'



export const getJavascriptFile = () => {

    const buildFolderPath = `${__dirname}/dist/`;
    return `${buildFolderPath}/entry.js`;
}
