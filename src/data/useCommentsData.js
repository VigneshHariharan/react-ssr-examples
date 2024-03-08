import { useContext, createContext } from 'react';
import { commentsData } from "./data";


export const APP_CONTEXT = createContext(null);

export const useCommentsData = () => {
  const contextData = useContext(APP_CONTEXT);

  if (contextData !== null) {
    try {
       console.log('context read')
       contextData.read();
    } catch (err) {
      console.log("Context data read", err);
    }
  }
  return commentsData;
};


export const useCommentsDataWithPromise = async () => {


}