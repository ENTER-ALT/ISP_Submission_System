import React, { ReactNode } from "react";

interface FullVerticalLayoutProps {
  children: ReactNode;
}

const FullVerticalLayout: React.FC<FullVerticalLayoutProps> = React.memo(
  ({ children }) => {
    return <div className={`bg-primary h-full m-auto max-w-65%w shadow-regular mt-4 p-8`}>{children}</div>;
  }
);

export default FullVerticalLayout;
