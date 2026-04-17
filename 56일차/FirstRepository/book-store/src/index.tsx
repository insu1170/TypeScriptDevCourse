import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './style/global';
import { state, ThemeContext } from './context/themeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* ThemeContext 내부에 있는 컴포넌트들은 ThemeContext의 값을 사용할 수 있다. */}
    <ThemeContext.Provider value={state}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>
);
