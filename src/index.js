import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './css/style.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CompleteDataProvider } from './Context';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
Chart.plugins.unregister(ChartDataLabels);

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
