import { renderToPipeableStream } from "react-dom/server";
import App from "../App";
import { DataProvider } from '../data/useAppContext';

function Root({ data }) {
  return (
    <html id="root">
      <DataProvider data={data}>
        <App />
      </DataProvider>
    </html>
  );
}

// res: response object
export const render = (res) => {
    const serverData = createServerData();
    const stream = renderToPipeableStream(<Root data={serverData} />, {
      bootstrapModules: ['/assets'],
      onShellReady() {
        stream.pipe(res)
      }
    });
};


const API_DELAY = 2500;

function createServerData() {
  console.log("server data creation started ------");
  let promise = null;
  let done = null;

  const read = () => {
    if (done) return;
    if (promise) throw promise;

    try {
        promise = new Promise((resolve) => {
          setTimeout(() => {
            done = true;
            promise = null
            resolve();
            console.log('--------promise resolved')
          }, API_DELAY);
        });
    } catch (err) {
      console.log('err in reading from create server data',err)
    }

  };

  const readWithPromise = async () => {
    const pokeData = await fetch('https://pokeapi.co/api/v2/ability/battle-armor');
    return pokeData;
  }

  return {
    read,
    readWithPromise,
  };
}