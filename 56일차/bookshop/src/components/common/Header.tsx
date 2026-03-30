import {styled} from "styled-components"

export default function Header() {
    return (
        <HeaderStyle>
            <h1>book store</h1>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
  background-color: ${({theme}) => theme.colors.background};
  
  h1 {
    color: white;
  }
`