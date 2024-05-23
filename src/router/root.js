import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import goodsRouter from "./goodsRouter";

// 로딩중 표시
const Loading = <div>Loading...</div>;

// 페이지
const Main = lazy(() => import("../pages/MainPage"));
const GoodsIndex = lazy(() => import("../pages/goods/IndexPage"));

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
    path: "goods",
    element: (
      <Suspense fallback={Loading}>
        <GoodsIndex />
      </Suspense>
    ),
    children: goodsRouter(),
  },
]);
export default root;
