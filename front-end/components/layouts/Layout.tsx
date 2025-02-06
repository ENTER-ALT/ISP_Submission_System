import React, { ReactNode } from "react";
import DefaultHead from "../DefaultHead";
import Header from "../header/Header";
interface LayoutProps {
  children: ReactNode;
  translations: any;
}

const Layout: React.FC<LayoutProps> = React.memo(({ children, translations }) => {

  return (
    <>
      <DefaultHead />
      <div className="font-poppins text-white font-bold text-2xl bg-secondary">
        <Header translations={translations}/>
        <main className="min-h-screen pb-10">{children}</main>
      </div>
    </>
  );
});



export default Layout;
