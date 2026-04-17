// npm run test를 통해서 테스트 진행 가능
// npm test Title (npm run test Title.tsx?) 를 사용하여 원하는 파일만 테스트도 가능
// 
import {render, screen} from '@testing-library/react'
import Title from './Title'
import { BookStoreThemeProvider } from '../../context/themeContext'

describe("title 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더가 제대로 되었는가?
        render(
            // Title의 size를 ThemeProvider에 적용해줬기 때문에 테스트에서도 BookStoreThemeProvider로 감싸줘야한다.
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )
        // 1의 과정을 통해 가상화면에 렌더가 되었다 생각하고
        // 2. 확인
        // 렌더에서 children으로 설정해준 제목이 toBeInTheDocument를 통해 텍스트가 화면상에 있는지를 확인!
        expect(screen.getByText('제목')).toBeInTheDocument()
    })

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )
        // firstChild -> Title의 size가 2rem이면 통과!
        expect(container?.firstChild).toHaveStyle({ fontSize: "2rem"})
    })

    it('color props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title color="primary" size="large" >제목</Title>
            </BookStoreThemeProvider>
        )
        expect(container?.firstChild).toHaveStyle({color: "black"})
    })

})