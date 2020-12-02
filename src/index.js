import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './css/style.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CompleteDataProvider } from './Context';

ReactDOM.render(
  <React.StrictMode>
    <CompleteDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CompleteDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
