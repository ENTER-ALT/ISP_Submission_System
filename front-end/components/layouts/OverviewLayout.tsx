import React from "react";

interface OverviewLayoutProps {
  children: React.ReactNode;
}

const OverviewLayout = React.memo(({ children }: OverviewLayoutProps) => {

  return (
    <section className="m-8 w-fit h-auto max-w-75%w">
      {children}
    </section>
  );
});

export default OverviewLayout;
