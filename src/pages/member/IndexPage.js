import React from "react";

import { Outlet } from "react-router-dom";
import MemberLayout from "../../layout/MemberLayout";

function IndexPage() {
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
