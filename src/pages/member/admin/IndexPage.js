import React from "react";
import MemberLayout from "../../../layout/MemberLayout";
import SideMenu from "../../../components/menus/SideMenu";
import { Outlet } from "react-router-dom";
import useCustomLogin from "../../../hooks/useCustomLogin";

function IndexPage() {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn(); //로그인 여부 체크
  }
  return (
    <MemberLayout>
      <div className="flex">
        <div className="hidden lg:block md:w-1/5">
          <SideMenu />
        </div>
        <div className="w-full lg:w-4/5 ">
          <Outlet />
        </div>
      </div>
    </MemberLayout>
  );
}

export default IndexPage;
