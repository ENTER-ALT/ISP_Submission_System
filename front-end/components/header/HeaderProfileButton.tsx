import { UserType } from "@/types/auth";

const userTypeOptions: { [key in UserType]: { class: string } } = {
  Student: {
    class: "bg-indigo-950 hover:shadow-success",
  },
  Administrative: {
    class: "bg-success hover:shadow-safe",
  },
  None: {
    class: "",
  },
};
import Link from "next/link";
import React from "react";

interface HeaderProfileButtonProps {
  email: string;
  userType: UserType;
  href: string;
}

const sharedClassOptions =
  "p-2 rounded-full w-12 h-12 text-center shadow-regular";

const HeaderProfileButton = ({
  email,
  userType,
  href,
}: HeaderProfileButtonProps) => {
  const buttonClass = `${sharedClassOptions} ${userTypeOptions[userType].class}`;
  const buttonHref = `${href}/${email}`;

  return (
    <Link href={buttonHref} className={buttonClass}>
      {email[0].toUpperCase()}
    </Link>
  );
};

export default React.memo(HeaderProfileButton);
