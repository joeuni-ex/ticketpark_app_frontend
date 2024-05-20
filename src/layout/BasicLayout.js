import React from "react";
import BasicMenu from "../components/menus/BasicMenu";

function BasicLayout({ children }) {
  return (
    <>
      <BasicMenu />

      <div>
        <main>{children}</main>
      </div>
    </>
  );
}

export default BasicLayout;
