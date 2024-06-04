import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Outlet } from "react-router-dom";
import MemberLayout from "../../layout/MemberLayout";

function IndexPage() {
  return (
    <MemberLayout>
      <div className="flex">
        <div className="w-1/4">menu</div>
        <div className="w-3/4 ">
          <Outlet />
        </div>
      </div>
    </MemberLayout>
  );
}

export default IndexPage;
