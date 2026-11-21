import React from 'react';
import { createRoot } from 'react-dom/client';
import 'cs-design-system/tokens.css';
import 'cs-design-system/nav-link.css';
import './styles.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
