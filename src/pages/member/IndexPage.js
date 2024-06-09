import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Outlet } from "react-router-dom";
import MemberLayout from "../../layout/MemberLayout";
import SideMenu from "../../components/menus/SideMenu";
import useCustomLogin from "../../hooks/useCustomLogin";

function IndexPage() {
  const { isLogin, moveToLoginReturn } = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn(); //로그인 여부 체크
  }

  return (
    <MemberLayout>
      <div className="flex">
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </MemberLayout>
  );
}

export default IndexPage;
