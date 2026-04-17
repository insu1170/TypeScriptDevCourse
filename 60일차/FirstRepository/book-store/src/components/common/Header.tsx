import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwitcher";

import { ReactComponent as ProfileIcon } from "@/assets/images/profile.svg";
import { ReactComponent as MenuIcon } from "@/assets/images/menu.svg";
import { ReactComponent as CancelIcon } from "@/assets/images/cancel.svg";
import { useState } from "react";

// 리액트 아이콘 v19와 호환성 문제..
// import {FaSignInAlt, FaRegUser} from 'react-icons/fa'

function Header() {
  const { category } = useCategory();
  const { isLoggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {!isMobileOpen ? <MenuIcon /> : <CancelIcon />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.category_id}>
              {/* 링크를 위한 a 태그, 쿼리스트링 이용*/}
              <Link
                to={
                  item.category_id === null
                    ? "/books"
                    : `/books?category_id=${item.category_id}`
                }
              >
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* 추후 로그인 인증과정을 거친 후 분기! */}
      <nav className="auth">
        <Dropdown toggleButton={<ProfileIcon />}>
          <>
            {" "}
            {isLoggedIn && (
              <ul>
                <li>
                  <Link to="/cart">장바구니</Link>
                </li>
                <li>
                  <Link to="/orderlist">주문내역</Link>
                </li>

                <button onClick={storeLogout}>로그아웃</button>
              </ul>
            )}
            {!isLoggedIn && (
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
            )}
            <ThemeSwitcher />
          </>
        </Dropdown>
      </nav>
      {/* <h1>book store</h1> */}
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}

// styled.태그명
const HeaderStyle = styled.header<HeaderStyleProps>`
  /* 반응형을 위해 width를 100% */
  width: 100%;
  /* 가운데 정렬 */
  margin: 0 auto;
  /* 1020px */
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }
  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }
  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
  @media ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;
    .logo {
      padding: 0 0 0 12px;
      img {
        width: 140px;
      }
    }
    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 14x;
        right: ${({ $isOpen }) => ($isOpen ? "63%" : "52px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }
      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;

        margin: 0;
        padding: 24px;
        z-index: 1000;

        flex-direction: column;
        gap: 16px;
      }
    }
  }
`;

export default Header;
