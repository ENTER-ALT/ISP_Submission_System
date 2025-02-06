import { MY_ISP_URL, VIEW_URL } from "@/utils/urls";
import Link from "next/link";
import React from "react";
interface ISPSubmitNotificationProps {
  id: number;
}

const ISPSubmitNotification = React.memo(
  ({ id }: ISPSubmitNotificationProps) => {
    return (
      <section className="m-auto w-fit h-fit bg-primary shadow-regular rounded mt-40 p-8 items-center flex flex-col space-y-4">
        <h2>
          You have successfully submitted your ISP!
        </h2>
        <p>You can now review it.</p>
        <Link
          className="p-1 rounded shadow-regular bg-indigo-950 hover:shadow-success w-1/2 text-center"
          href={`${MY_ISP_URL}${VIEW_URL}/${id}`}
        >
          Review
        </Link>
      </section>
    );
  }
);

export default ISPSubmitNotification;
