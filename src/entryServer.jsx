import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// eslint-disable-next-line react-refresh/only-export-components
export const render = () => renderToString(<App />)