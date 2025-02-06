import { Administrative } from "@/types";
import React from "react";
import SmallTextLayout from "../layouts/SmallTextLayout";
import MapObjectsLayout from "../layouts/MapObjectsLayout";

interface AdminDetailsViewProps {
  user: Administrative;
}

const AdminDetailsView = React.memo(({ user }: AdminDetailsViewProps) => {
  return (
    <>
      {user.privileges && user.privileges.length > 0 ? (
        <article className="flex flex-col gap-2">
          <p className="flex self-center">{`Privileges:`}</p>
          <MapObjectsLayout
            children={(priv, index) => (
              <SmallTextLayout>
                <p key={index}>{priv.description}</p>
              </SmallTextLayout>
            )}
            objects={user.privileges}
            flex="row"
            gap={2}
          />
        </article>
      ) : (
        <p className="flex self-center">{`No privileges available.`}</p>
      )}
    </>
  );
});

export default AdminDetailsView;
