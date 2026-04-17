import { createContext, ReactNode, useEffect, useState } from "react";
import { getTheme, ThemeName } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

const DEFAULT_THEME_NAME = 'light'
const THEME_LOCALSTORAGE_KEY = 'book_store_theme'

interface State {
    themeName: ThemeName;
    toggleTheme: () => void;
}

export const state = {
    themeName: DEFAULT_THEME_NAME  as ThemeName,
    toggleTheme: () => {},
}

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({children}: {children: ReactNode}) => {
    const [themeName, setThemeName] = useState<ThemeName>(DEFAULT_THEME_NAME );

    const toggleTheme = () => {
        setThemeName(themeName === 'light' ? 'dark' : 'light')
        // 로컬스토리지에 테마 값 저장
        localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === 'light' ? 'dark' : 'light')
    }

    // 기본 값 받아오기
    // 기본 값이 있으면 해당 값 세팅. 없으면 default theme 적용
    useEffect(() => {
        // 기본 값 있는지 체크! localstorage에 해당 값 있니?
        const savedThemeName = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
        // savedThemeName이 있으면 해당 값 적용 없으면 DEFAULT_THEME_NAME 적용
        setThemeName(savedThemeName || DEFAULT_THEME_NAME)
    }, [])
   
    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={getTheme(themeName)}>   
                <GlobalStyle themeName={themeName} />     
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}