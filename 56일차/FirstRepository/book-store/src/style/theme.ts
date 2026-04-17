import { DefaultTheme } from "styled-components";

// 무작위로 키를 추가하는 걸 막기 위해 키 제한!
export type ColorKey =
  | "primary"
  | "background"
  | "secondary"
  | "third"
  | "border"
  | "text";

export type ThemeName = "light" | "dark";
export type HeadingSize = "large" | "medium" | "small";
// 버튼
export type ButtonSize = "large" | "medium" | "small";
export type ButtonSchema = "primary" | "normal" | "like";

// layout 너비 제한하고 타입 지정
export type LayoutWidth = "large" | "medium" | "small";

declare module "styled-components" {
  export interface DefaultTheme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
      [key in HeadingSize]: { fontSize: string };
    };
    // 버튼 옵션
    button: {
      [key in ButtonSize]: {
        fontSize: string;
        padding: string;
      };
    };
    buttonSchema: {
      [key in ButtonSchema]: {
        color: string;
        backgroundColor: string;
      };
    };
    borderRadius: {
      default: string;
    };
    layout: {
      width: {
        [key in LayoutWidth]: string;
      };
    };
  }
}

// 테마도 타입으로 관리
// interface DefaultTheme {
//     name: ThemeName;
//     color: Record<ColorKey, string>;
// {
//여러개의 컬러를 받아올 때 하나씩 추가해줘야 된다면? 너무 번거로움!!!

// [key in ColorKey]: string
// background: string;
// }
// }
export const light: DefaultTheme = {
  name: "light",
  color: {
    primary: "hsl(344, 46%, 62%)",
    background: "lightgray",
    secondary: "#31a461",
    third: "green",
    border: "gray",
    text: "black",
  },
  heading: {
    large: {
      fontSize: "2rem",
    },
    medium: {
      fontSize: "1.5rem",
    },
    small: {
      fontSize: "1rem",
    },
  },
  button: {
    large: {
      fontSize: "2rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.75rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonSchema: {
    primary: {
      color: "white",
      backgroundColor: "midnightblue",
    },
    normal: {
      color: "black",
      backgroundColor: "lightgray",
    },
    like: {
      color: "white",
      backgroundColor: "coral",
    },
  },
  borderRadius: {
    default: "4px",
  },
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};

export const dark: DefaultTheme = {
  // heading같은 dark와 ligth가 같은 값을 갖는 부분 처리!
  ...light,
  name: "dark",
  color: {
    primary: "coral",
    background: "midnightblue",
    secondary: "darkblue",
    third: "darkgreen",
    border: "gray",
    text: "black",
  },
};

// themeName에 맞는 값 return!
export const getTheme = (themeName: ThemeName): DefaultTheme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
