import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Outlet } from "react-router-dom";
import MemberLayout from "../../layout/MemberLayout";
import SideMenu from "../../components/menus/SideMenu";

function IndexPage() {
  return (
    <MemberLayout>
      <div className="flex">
        <div className="w-1/5">
          <SideMenu />
        </div>
        <div className="w-4/5 ">
          <Outlet />
        </div>
      </div>
    </MemberLayout>
  );
}

export default IndexPage;
