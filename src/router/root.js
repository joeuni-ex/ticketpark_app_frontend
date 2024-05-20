import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// 로딩중 표시
const Loading = <div>Loading...</div>;

// 페이지
const Main = lazy(() => import("../pages/MainPage"));

const root = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
]);
export default root;
