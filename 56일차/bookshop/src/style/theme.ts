export type ThemeName = "light" | "dark"
type ColorKey = "primary" | "background" | "secondary" | "third"

interface Theme {
    name: string;
    colors: Record<ColorKey, string>;
}

export const light: Theme = {
    name: 'light',
    colors: {
        primary: "brown",
        background: "lightgray",
        secondary: "blue",
        third: "green"
    }
}

export const dark: Theme = {
    name: "dark",
    colors: {
        primary: "coral",
        background: "midnightblud",
        secondary: "darkblue",
        third: "darkgreen"
    }
}

export const getTheme = (themeName: ThemeName): Theme => {
    switch(themeName) {
        case "light":
            return light;
        case "dark":
            return dark;
    }
}