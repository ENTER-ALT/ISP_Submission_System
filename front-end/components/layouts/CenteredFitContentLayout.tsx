import React, { ReactNode } from "react";

interface CenteredFitContentLayoutProps {
  children: ReactNode;
}

const CenteredFitContentLayout: React.FC<CenteredFitContentLayoutProps> = React.memo(
  ({ children }) => {
    return <div className={`bg-primary h-fit w-fit m-auto max-w-65%w shadow-regular mt-28 p-8`}>{children}</div>;
  }
);

export default CenteredFitContentLayout;
