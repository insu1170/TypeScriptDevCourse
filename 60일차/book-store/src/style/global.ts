import 'sanitize.css';
// global style 지정
import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './theme';



interface Props {
    // theme.ts에서 작성한 ThemeName 타입으로 light와 dark로 제한!
    themeName: ThemeName;
}


export const GlobalStyle = createGlobalStyle<Props>`
    body {
        padding: 0;
        margin: 0;
        background-color: ${(props) => (props.themeName === 'light' ? 'white' : 'black')};
    }

    h1 {
        margin: 0;
    }

    /* 모든 엘리먼트에 적용 */
    * {
        color: ${(props) => (props.themeName === 'light' ? 'black' : 'white')}
    }
`