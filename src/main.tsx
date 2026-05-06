import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Overload console calls to omit known, harmless Three.js warnings requested by user
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    const msg = args[0];
    if (msg.includes('THREE.Clock') || 
        msg.includes('PCFSoftShadowMap has been deprecated') ||
        msg.includes('Context Lost')) {
      return; 
    }
  }
  originalWarn(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
