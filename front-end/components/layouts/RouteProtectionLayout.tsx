import React, { ReactNode } from "react";
import useRouteModifyer from "../useRouteModifyer";
import Loading from "../Loading";

interface RouteProtectionLayoutProps {
  children: ReactNode;
}

const RouteProtectionLayout: React.FC<RouteProtectionLayoutProps> = React.memo(
  ({ children }) => {
    let isRedirecting = useRouteModifyer();

    if (isRedirecting) {
      return <Loading />;
    }
    return <>{children}</>;
  }
);

export default RouteProtectionLayout;
