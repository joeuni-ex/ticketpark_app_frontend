import React from "react";
import BasicFooter from "../components/footer/BasicFooter";
import MemberMenu from "../components/menus/MemberMenu";

function MemberLayout({ children }) {
  return (
    <>
      <MemberMenu />
      <div>
        <main>{children}</main>
      </div>

      <BasicFooter />
    </>
  );
}

export default MemberLayout;
