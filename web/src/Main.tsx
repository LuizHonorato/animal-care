import React from 'react';
import App from './App';
import AppProvider from './hooks';

const Main: React.FC = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Main;
