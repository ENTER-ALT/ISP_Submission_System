import { User, UserShort } from "@/types";
import React from "react";

interface UserFullViewProps {
  user: User;
}

const UserFullView = React.memo(({ user }: UserFullViewProps) => {
  return (
    <article className="flex flex-col gap-2">
      <p>{`${user.userType} Id: ${user.id}`}</p>
      <p>{`Name: ${user.name}`}</p>
      <p>{`Email: ${user.email}`}</p>
      {/* <p>{`Password: ${user.password}`}</p> */}
    </article>
  );
});

export default UserFullView;
