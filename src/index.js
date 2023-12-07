import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
//import './index.css';
import './app.css';

document.addEventListener('DOMContentLoaded', function() {
  createRoot(document.body.appendChild(document.createElement('div')))
    .render(<App />);
});
