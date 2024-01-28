import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import Reducers from './Reducers'; // Importação corrigida

const store = createStore(Reducers);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
);
