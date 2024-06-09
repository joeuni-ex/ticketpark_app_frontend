import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const LoginPage = lazy(() => import("../pages/member/LoginPage"));

// admin
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
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <LoginPage />
        </Suspense>
      ),
    },

    //admin 권한
    {
      path: "goods/",
      element: (
        <Suspense fallback={Loading}>
          <ListGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "goods/list",
      element: (
        <Suspense fallback={Loading}>
          <ListGoodsPage />
        </Suspense>
      ),
    },
    {
      path: "goods/register",
      element: (
        <Suspense fallback={Loading}>
          <AddGoodsPage /> w
        </Suspense>
      ),
    },
    {
      path: "goods/modify/:gno",
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
