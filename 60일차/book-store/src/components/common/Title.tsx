import styled from "styled-components"
import React from "react"
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    // 해당 사이즈에 맞는 값을 theme.ts에서 모아 관리!
    // size: 'large' | 'mediem' | 'small';
    size: HeadingSize;
    color?: ColorKey;
}


function Title({children, size, color}: Props) {
    return (
        // TitleStyle이 children을 꾸며준다
        <TitleStyle size={size} color={color}>
            {children}
        </TitleStyle>
    )
}

// Omit -> 해당 요소를 제외한 타입만 가져온다!
const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({theme, size}) => theme.heading[size].fontSize};
    /* color는 optional이기 때문에 color가 있을때와 없을때 처리를 해준다. */
    color: ${({theme, color}) => color ? theme.color[color] : theme.color.primary};
    
`

export default Title;