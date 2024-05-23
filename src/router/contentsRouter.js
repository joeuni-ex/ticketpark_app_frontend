import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const ContentsList = lazy(() => import("../pages/contents/ListPage"));

const contentsRouter = () => {
  return [
    {
      path: "genre/:genre",
      element: (
        <Suspense fallback={Loading}>
          <ContentsList />
        </Suspense>
      ),
    },
    {
      path: "genre",
      element: <Navigate replace={true} to={"/contents/genre/concert"} />, //카테고리 기본값->콘서트
    },
  ];
};

export default contentsRouter;
