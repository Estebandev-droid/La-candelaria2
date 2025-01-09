import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './tailwind.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);