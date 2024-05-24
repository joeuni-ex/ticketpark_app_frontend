import React from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Outlet } from "react-router-dom";

function IndexPage() {
  return (
    <BasicLayout>
      <div className="w-full ">
        <Outlet />
      </div>
    </BasicLayout>
  );
}

export default IndexPage;
