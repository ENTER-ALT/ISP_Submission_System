import React from "react";
import FixedCreateButton from "../buttons/FixedCreateButton";
import LowOpacityLayout from "./LowOpacityLayout";
import MapObjectsLayout from "./MapObjectsLayout";

interface ManageObjectsLayoutProps {
  objects: any[];
  isActive: boolean;
  headingTitle: string;
  children: (item: any, index: number) => React.ReactNode;
  flex: "row" | "col";
}

const ObjectsWithHeadingLayout = React.memo(
  ({
    objects,
    isActive,
    headingTitle,
    children,
    flex,
  }: ManageObjectsLayoutProps) => {
    return (
      <LowOpacityLayout isActive={!isActive}>
        <h1 className="text-center mt-5">{headingTitle}</h1>
        <MapObjectsLayout objects={objects} flex={flex} children={children} />
      </LowOpacityLayout>
    );
  }
);

export default ObjectsWithHeadingLayout;
