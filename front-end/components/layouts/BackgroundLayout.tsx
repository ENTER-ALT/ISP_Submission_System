import React, { ReactNode } from "react";
import DefaultHead from "../DefaultHead";

interface BackgroundLayoutProps {
  children: ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = React.memo(
  ({ children }) => {
    return (
      <>
        <DefaultHead />
        <div className="font-poppins text-white font-bold text-2xl bg-secondary">
          {children}
        </div>
      </>
    );
  }
);

export default BackgroundLayout;
