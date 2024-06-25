import React from "react";
import BasicFooter from "../components/footer/BasicFooter";
import BasicMenu from "../components/menus/BasicMenu";

function MemberLayout({ children }) {
  return (
    <>
      <BasicMenu />
      <div>
        <main>{children}</main>
      </div>

      <BasicFooter />
    </>
  );
}

export default MemberLayout;
