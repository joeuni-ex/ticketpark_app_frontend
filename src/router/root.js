import { Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
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
]);
export default root;
