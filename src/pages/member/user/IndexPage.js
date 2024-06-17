import React from "react";
import useCustomLogin from "../../../hooks/useCustomLogin";
import MemberLayout from "../../../layout/MemberLayout";
import SideMenu from "../../../components/menus/SideMenu";
import { Outlet } from "react-router-dom";

function IndexPage() {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn(); //로그인 여부 체크
  }
  return (
    <MemberLayout>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/5">
          <SideMenu />
        </div>
        <div className="md:w-4/5 ">
          <Outlet />
        </div>
      </div>
    </MemberLayout>
  );
}

export default IndexPage;
