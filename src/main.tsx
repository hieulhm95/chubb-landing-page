import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const isOnEvent = false;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App isOnEvent={isOnEvent} />
  </StrictMode>
);
