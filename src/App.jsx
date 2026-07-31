import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './router/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#081621',
            color: '#fff',
            border: '1px solid rgba(38, 183, 154, 0.3)',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      />
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
