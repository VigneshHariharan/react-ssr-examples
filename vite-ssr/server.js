import { expressServer } from '../src/server/baseServerAPI.js'
import '../src/react-server/index.js'

async function createServer() {
    console.log("listening to port http://localhost:5173");
    expressServer.listen(5173);
}

createServer();

