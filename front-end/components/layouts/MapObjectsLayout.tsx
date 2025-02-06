import React from "react";
import OverviewLayout from "./OverviewLayout";

interface MapObjectsLayoutProps {
  objects: any[];
  children: (item: any, index: number) => React.ReactNode;
  flex: "row" | "col";
  gap?: number;
}

const MapObjectsLayout = React.memo(
  ({ objects, children, flex, gap}: MapObjectsLayoutProps) => {
    const flexClass = flex === "row" 
      ? `flex-row ${gap ? `gap-${gap}` : "gap-8"} flex-wrap` 
      : `flex-col ${gap ? `gap-${gap}` : "gap-6"}`;

    return (
      objects && objects.length > 0 ? (
        <OverviewLayout>
          <section className={`flex ${flexClass}`}>
            {objects.map((obj, index) => {
              return (
                <div key={index} className="flex">
                  {children(obj, index)}
                </div>
              );
            })}
          </section>
        </OverviewLayout>
      ) : null
    );
  }
);

export default MapObjectsLayout;
