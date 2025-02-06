import React, { ReactNode } from "react";

interface LowOpacityLayoutProps {
  isActive: boolean;
  children: ReactNode;
}

const LowOpacityLayout: React.FC<LowOpacityLayoutProps> = React.memo(
  ({ isActive, children }) => {
    return <div className={`${isActive ? "opacity-50" : ""}`}>{children}</div>;
  }
);

export default LowOpacityLayout;
