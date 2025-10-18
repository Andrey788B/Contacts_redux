import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import { MainApp } from '@/apps/MainApp/MainApp';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);


import reportWebVitals from '@/reportWebVitals';
reportWebVitals(console.log);