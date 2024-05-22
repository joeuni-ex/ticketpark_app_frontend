import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import BasicFooter from "../components/footer/BasicFooter";

function BasicLayout({ children }) {
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

export default BasicLayout;
