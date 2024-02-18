import { renderToNodeStream } from "react-dom/server";
import App from '../App'

// res: response object
export const render = (res) => {
    const stream = renderToNodeStream(<App />);
    stream.pipe(res)

    // stream.on("data",(args) => {
    //   console.log('data chunks',Buffer.from(args, 'utf-8').toString())
    //   console.count("data chunk count ---- : ")
    // });

    return stream;
}

