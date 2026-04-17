// npm run test를 통해서 테스트 진행 가능
// npm test -- InputText (npm run test Title.tsx?) 를 사용하여 원하는 파일만 테스트도 가능
// 
import {render, screen} from '@testing-library/react'
import { BookStoreThemeProvider } from '../../context/themeContext'
import InputText from './InputText'
import React from 'react'

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더가 제대로 되었는가?
        render(
            // Title의 size를 ThemeProvider에 적용해줬기 때문에 테스트에서도 BookStoreThemeProvider로 감싸줘야한다.
            <BookStoreThemeProvider>
                <InputText placeholder='여기에 입력' />
            </BookStoreThemeProvider>
        )
        // 1의 과정을 통해 가상화면에 렌더가 되었다 생각하고
        // 2. 확인
        // 렌더에서 children으로 설정해준 제목이 toBeInTheDocument를 통해 텍스트가 화면상에 있는지를 확인!
        expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument()
    })
    // 확장시 깨질 가능성 있기때문에.. 한번 써두면 잘 써먹을 수 있다!
    it('forwartRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
                <InputText placeholder='여기에 입력' ref={ref} />
            </BookStoreThemeProvider>
        )
        // 전달된 ref가 HTMLInputElement가 맞는지!?
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

})