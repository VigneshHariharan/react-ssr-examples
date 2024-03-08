import { renderToNodeStream } from "react-dom/server";
import App from '../App'
import { Buffer } from 'node:buffer'
import { fetchData } from "../data/serverDataUtils";


function Root({ getCommentsPromise }) {
  return (
    <html>
      <body>
        <div id="root">
          <App getCommentsPromise={getCommentsPromise} />
        </div>
      </body>
    </html>
  );
}
// res: response object
export const render = (res) => {
    const stream = renderToNodeStream(<Root getCommentsPromise={fetchData} />);
    stream.pipe(res)

    stream.on("data",(args) => {
      console.log('data chunks',Buffer.from(args, 'utf-8').toString())
      console.count("data chunk count ---- : ")
    });

    return stream;
}

