import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './features/store.js';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer position="top-right" autoClose={3000} />

  </React.StrictMode>,
)
