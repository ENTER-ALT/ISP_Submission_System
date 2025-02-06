import React, { ReactNode } from "react";

interface SmallTextLayoutProps {
  children: ReactNode;
}

const SmallTextLayout: React.FC<SmallTextLayoutProps> = React.memo(
  ({ children }) => {
    return (
      <div className="rounded-full h-full bg-inherit text-lg bg-gray-500 border-2 border-gray-700 focus:bg-gray-700 min-w-16 p-2">
        {children}
      </div>
    );
  }
);

export default SmallTextLayout;
