import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { BookStoreThemeProvider } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import ToastContainer from "./components/common/toast/ToastContainer";

const routeList = [
  {
    path: "/",
    element: <Home />,
    // 오류가 발생했을 때 페이지 404
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/orderlist",
    element: <OrderList />,
  },
];

function App() {
  const router = createBrowserRouter(
    routeList.map((item) => {
      return {
        ...item,
        element: <Layout>{item.element}</Layout>,
        errorElement: <Error />,
      };
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        {/* <ThemeSwitcher /> */}
        {/* 라우터에서 레이아웃을 포함한 컴포넌트를 관리해줘야하기 때문에 Layout을 router element로 빼준다 */}
        {/* <Layout> */}
        <RouterProvider router={router} />
        <ToastContainer />
        {/* <Home /> */}
        {/* </Layout> */}
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
