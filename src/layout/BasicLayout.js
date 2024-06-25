import React from "react";
import BasicMenu from "../components/menus/BasicMenu";
import BasicFooter from "../components/footer/BasicFooter";
import CategoryHeader from "../components/menus/CategoryHeader";

function BasicLayout({ children }) {
  return (
    <>
      <BasicMenu />
      <CategoryHeader />
      <div>
        <main>{children}</main>
      </div>

      <BasicFooter />
    </>
  );
}

export default BasicLayout;
