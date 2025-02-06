import React from "react";

interface UserItemLayoutProps {
  children: React.ReactNode;
}

const UserItemLayout = React.memo(({ children }: UserItemLayoutProps) => {
  return (
    <section className="p-1 rounded shadow-regular bg-primary align-top text-left w-64 h-64">
      <div className="flex flex-row justify-between p-2">{children}</div>
    </section>
  );
});

export default UserItemLayout;
