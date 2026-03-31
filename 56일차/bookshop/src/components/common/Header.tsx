import styled from "styled-components";
import logo from '../../assets/images/logo.png'
// 리액트 아이콘 v19와 호환성 문제..
// import {FaSignInAlt, FaRegUser} from 'react-icons/fa'

const CATEGORY = [
    {
        id: null,
        name: '전체',
    },
    {
        id: 0,
        name: '동화',
    },
    {
        id: 1,
        name: '소설',
    },
    {
        id: 2,
        name: '사회',
    },
]

function Header() {
    return(
        <HeaderStyle>
            <h1 className="logo">
                <img src={logo} alt="book store" />
            </h1>
            <nav className="category">
                <ul>
                    {CATEGORY.map((item) => (
                        <li key={item.id}>
                            {/* 링크를 위한 a 태그, 쿼리스트링 이용*/}
                            <a href={item.id === null ? '/books' : `/books?category_id=${item.id}`}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* 추후 로그인 인증과정을 거친 후 분기! */}
            <nav className="auth">
                <ul>
                    <li>
                        <a href="/login">
                            {/* <FaSignInAlt /> */}
                            로그인
                        </a>
                    </li>
                    <li>
                        <a href="signup">
                            {/* <FaRegUser /> */}
                            회원가입
                        </a>
                    </li>
                </ul>
            </nav>
            {/* <h1>book store</h1> */}
        </HeaderStyle>
    )
}
// styled.태그명
const HeaderStyle = styled.header`
    /* 반응형을 위해 width를 100% */
    width: 100%;
    /* 가운데 정렬 */
    margin: 0 auto;
    /* 1020px */
    max-width: ${({theme}) => theme.layout.width.large};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid${({theme}) => theme.colors.background};

    .logo {
        img {
            width: 200px;
        }
    }
    .category {
        ul{
            display: flex;
            gap: 32px;
            li{
                a{
                    font-size: 1.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    color: ${({theme}) => theme.colors.text};

                    &:hover {
                        color: ${({theme}) => theme.colors.primary}
                    }
                }
            }
        }
    }
    .auth {
        ul{
            display: flex;
            gap: 16px;
            li{
                a{
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    line-height: 1;
                    svg {
                        margin-right: 6px;
                    }
                }
            }
        }
    }
/* 구조분해할당으로 theme 호출 */
    /* background-color: ${({theme}) => theme.colors.background};

    h1 {
        color: ${({theme}) => theme.colors.primary}
    } */
`;

export default Header;