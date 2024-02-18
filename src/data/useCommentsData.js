import { useContext, createContext, useState, useEffect } from "react";
import { commentsData } from "./data";


export const APP_CONTEXT = createContext(null);

export const useCommentsData = () => {
  const contextData = useContext(APP_CONTEXT);

  if (contextData !== null) {
    try {
       contextData.read();
    } catch (err) {
      console.log("Context data read", err);
    }
  }
  return commentsData;
};

export const useCommentsDataWithState = () => {
  const contextData = useContext(APP_CONTEXT);
  const [data, setData] = useState(null);

  console.log("context data", contextData);

  useEffect(() => {
    console.log("use effect working",contextData)
    if(!contextData) return;
    async function callApi() {
      try {
        const newData = await contextData.readWithPromise();
        console.log('new Data',newData)
        setData(newData);
      } catch(err) {
        console.log("Error in useCommentsDataWithState : ",err);
      }
    }
    callApi()
  }, [contextData])

  return { data }
}