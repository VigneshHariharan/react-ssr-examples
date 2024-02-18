import { APP_CONTEXT } from './useCommentsData';

export const DataProvider = ({ children, data }) => {
    return <APP_CONTEXT.Provider value={data}>{children}</APP_CONTEXT.Provider>
}

