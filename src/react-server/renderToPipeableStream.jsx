import { renderToPipeableStream } from "react-dom/server";
import App from "../App";
import { fetchData } from '../data/serverDataUtils'

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
export const render = async (res) => {
    const stream = renderToPipeableStream(
      <Root getCommentsPromise={fetchData} />,
      {
        // bootstrapModules: ["/assets"],
        onShellReady() {
          console.log('stream pipe',res)
          stream.pipe(res);
        },
        progressiveChunkSize: 1000,
        onError: (error) => {
          console.log("Server error thrown due to: ",error)
        }
      }
    );
};


