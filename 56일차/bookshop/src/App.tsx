import './App.css'
import Layout from "./layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import ThemeSwitcher from "./components/header/ThemeSwitcher.tsx";
import {useState} from "react";
import {BookStoreThemeProvider, ThemeContext} from "./context/themeContext.tsx";

function App() {
    const [themeName, setThemeName] = useState(ThemeContext)

  return (
      <BookStoreThemeProvider>
          <ThemeSwitcher />
          <Layout>
              <Home/>
          </Layout>
      </BookStoreThemeProvider>
  )
}

export default App
