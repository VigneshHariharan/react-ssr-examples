import { renderToNodeStream } from "react-dom/server";
import App from '../App'

// res: response object
export const render = (res) => {
    const stream = renderToNodeStream(<App />);
    stream.on("*", (...args) => {
      console.log('stream event ',args)
    });
    
    stream.pipe(res)
    return stream;
}

