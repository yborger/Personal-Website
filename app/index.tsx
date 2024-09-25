import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Import your main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './globals.css'; // Import global styles if any

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
