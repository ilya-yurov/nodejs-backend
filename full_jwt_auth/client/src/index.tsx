import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, { store } from 'context'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={store}>
        <App />
    </Context.Provider>
);
