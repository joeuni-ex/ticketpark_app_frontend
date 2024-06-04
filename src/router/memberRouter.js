import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const AddGoodsPage = lazy(() => import("../pages/member/admin/AddGoodsPage"));

const ModifyGoodsPage = lazy(() =>
  import("../pages/member/admin/ModifyGoodsPage")
);

const memberRouter = () => {
  return [
    {
      path: "admin/goods/register",
      element: (
        <Suspense fallback={Loading}>
          <AddGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "admin/goods/modify",
      element: (
        <Suspense fallback={Loading}>
          <ModifyGoodsPage />
        </Suspense>
      ),
    },

    {
      path: "admin",
      element: <Navigate replace={true} to={"/admin/goods/register"} />,
    },
  ];
};

export default memberRouter;
