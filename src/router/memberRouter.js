import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const AddGoodsPage = lazy(() => import("../pages/member/admin/goods/AddPage"));

const ModifyGoodsPage = lazy(() =>
  import("../pages/member/admin/goods/ModifyPage")
);

const ListGoodsPage = lazy(() =>
  import("../pages/member/admin/goods/ListPage")
);

const memberRouter = () => {
  return [
    {
      path: "admin/goods/",
      element: (
        <Suspense fallback={Loading}>
          <ListGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "admin/goods/list",
      element: (
        <Suspense fallback={Loading}>
          <ListGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "admin/goods/register",
      element: (
        <Suspense fallback={Loading}>
          <AddGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "admin/goods/modify/:gno",
      element: (
        <Suspense fallback={Loading}>
          <ModifyGoodsPage />
        </Suspense>
      ),
    },

    {
      path: "admin",
      element: <Navigate replace={true} to={"/admin/goods"} />,
    },
  ];
};

export default memberRouter;
