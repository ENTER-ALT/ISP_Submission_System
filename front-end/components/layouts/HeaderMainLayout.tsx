import React, { ReactNode } from "react";
import Header from "../header/Header";

interface HeaderMainLayoutProps {
  children: ReactNode;
}

const HeaderMainLayout: React.FC<HeaderMainLayoutProps> = React.memo(
  ({ children }) => {
    return (
      <>
        <Header />
        <main className="min-h-screen">{children}</main>
      </>
    );
  }
);

export default HeaderMainLayout;
