import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { AuthProvider } from './src/contexts/AuthContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}
