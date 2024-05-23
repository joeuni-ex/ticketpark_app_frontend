import { Suspense, lazy } from "react";

const Loading = <div>Loading...</div>;

const GoodsRead = lazy(() => import("../pages/goods/ReadPage"));

const goodsRouter = () => {
  return [
    {
      path: ":gno",
      element: (
        <Suspense fallback={Loading}>
          <GoodsRead />
        </Suspense>
      ),
    },
  ];
};

export default goodsRouter;
