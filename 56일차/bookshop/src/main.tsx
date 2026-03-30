import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {state, ThemeContext} from "./context/themeContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeContext.Provider value={state}>
          <App />
      </ThemeContext.Provider>
  </StrictMode>,
)
