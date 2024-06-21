import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>;

const LoginPage = lazy(() => import("../pages/member/LoginPage"));
const RegisterPage = lazy(() => import("../pages/member/RegisterPage"));

// admin
const AddGoodsPage = lazy(() => import("../pages/member/admin/goods/AddPage"));

const ModifyGoodsPage = lazy(() =>
  import("../pages/member/admin/goods/ModifyPage")
);

const ListGoodsPage = lazy(() =>
  import("../pages/member/admin/goods/ListPage")
);

// user
const ReservationListPage = lazy(() =>
  import("../pages/member/user/reservation/ListPage")
);
const ReservationModifyPage = lazy(() =>
  import("../pages/member/user/reservation/ModifyPage")
);

const ReviewListPage = lazy(() =>
  import("../pages/member/user/review/ListPage")
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
    {
      path: "register",
      element: (
        <Suspense fallback={Loading}>
          <RegisterPage />
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
          <AddGoodsPage />
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

    // user권한
    {
      path: "reservation/",
      element: (
        <Suspense fallback={Loading}>
          <ReservationListPage />
        </Suspense>
      ),
    },
    {
      path: "reservation/modify/:rno",
      element: (
        <Suspense fallback={Loading}>
          <ReservationModifyPage />
        </Suspense>
      ),
    },
    {
      path: "reservation/list",
      element: (
        <Suspense fallback={Loading}>
          <ReservationListPage />
        </Suspense>
      ),
    },
    {
      path: "review/list",
      element: (
        <Suspense fallback={Loading}>
          <ReviewListPage />
        </Suspense>
      ),
    },

    {
      path: "user",
      element: <Navigate replace={true} to={"/user/reservation"} />,
    },
  ];
};

export default memberRouter;
