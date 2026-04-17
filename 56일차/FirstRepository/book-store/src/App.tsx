import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";

function App() {
  // const [themeName, setThemeName] = useState<ThemeName>("light");
  // themeContext에 설정해 놓은 값 가져옴 light
  // const {themeName, setThemeName} = useContext(ThemeContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
      // 오류가 발생했을 때 페이지 404
      errorElement: <Error />,
    },
    {
      path: "/books",
      element: (
        <Layout>
          <Books />
        </Layout>
      ),
    },
    {
      path: "/signup",
      element: (
        <Layout>
          <Signup />
        </Layout>
      ),
    },
    {
      path: "/reset",
      element: (
        <Layout>
          <ResetPassword />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/book/:bookId",
      element: (
        <Layout>
          <BookDetail />
        </Layout>
      ),
    },
  ]);

  return (
    <BookStoreThemeProvider>
      {/* <ThemeSwitcher /> */}
      {/* 라우터에서 레이아웃을 포함한 컴포넌트를 관리해줘야하기 때문에 Layout을 router element로 빼준다 */}
      {/* <Layout> */}
      <RouterProvider router={router} />
      {/* <Home /> */}
      {/* </Layout> */}
    </BookStoreThemeProvider>
  );
}

export default App;
