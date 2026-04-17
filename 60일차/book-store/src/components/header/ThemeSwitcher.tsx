import { useContext } from "react"
// import { ThemeName } from "../../style/theme"
import { ThemeContext } from "../../context/themeContext"

function ThemeSwitcher() {
    const {themeName, toggleTheme} = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme}>
            {themeName}
        </button>
    )
}

// // themeName으로 light 또는 dark 값 받고 setThemeName으로 테마 설정해준다.
// interface Props {
//     themeName: ThemeName;
//     setThemeName: (themeName: ThemeName) => void;
// }

// function ThemeSwitcher({themeName, setThemeName} : Props) {
    
//     // light일 경우 dark로 아닐경우 light로!
//     const toggleTheme = () => {
//         setThemeName(themeName === 'light' ? 'dark' : 'light')
//     }
    
//     return (
//         <button onClick={toggleTheme}>
//             {themeName}
//         </button>
//     )
// }

export default ThemeSwitcher