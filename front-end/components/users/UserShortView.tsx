import { UserShort } from "@/types";
import React from "react";

interface UserShortViewProps {
  user: UserShort;
}

const UserShortView = React.memo(({ user }: UserShortViewProps) => {
  return (
    <article className="flex flex-col gap-2 items-center">
      <p>{`Id: ${user.id}`}</p>
      <p>{user.name}</p>
    </article>
  );
});

export default UserShortView;
