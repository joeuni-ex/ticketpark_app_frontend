import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import goodsRouter from "./goodsRouter";
import contentsRouter from "./contentsRouter";
import memberRouter from "./memberRouter";

// 로딩중 표시
const Loading = <div>Loading...</div>;

// 페이지
const Main = lazy(() => import("../pages/MainPage"));
const GoodsIndex = lazy(() => import("../pages/goods/IndexPage"));
const GenreIndexPage = lazy(() => import("../pages/contents/IndexPage"));
const MemberIndexPage = lazy(() => import("../pages/member/IndexPage"));
const AdminIndexPage = lazy(() => import("../pages/member/admin/IndexPage"));
const UserIndexPage = lazy(() => import("../pages/member/user/IndexPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },

  {
    path: "contents",
    element: (
      <Suspense fallback={Loading}>
        <GenreIndexPage />
      </Suspense>
    ),
    children: contentsRouter(),
  },
  {
    path: "goods",
    element: (
      <Suspense fallback={Loading}>
        <GoodsIndex />
      </Suspense>
    ),
    children: goodsRouter(),
  },
  {
    path: "member",
    element: (
      <Suspense fallback={Loading}>
        <MemberIndexPage />
      </Suspense>
    ),
    children: memberRouter(),
  },
  {
    path: "member/admin",
    element: (
      <Suspense fallback={Loading}>
        <AdminIndexPage />
      </Suspense>
    ),
    children: memberRouter(),
  },
  {
    path: "member/user",
    element: (
      <Suspense fallback={Loading}>
        <UserIndexPage />
      </Suspense>
    ),
    children: memberRouter(),
  },
]);
export default root;
