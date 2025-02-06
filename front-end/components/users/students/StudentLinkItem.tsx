import React from "react";
import { UserShort } from "@/types";
import Link from "next/link";
import UserShortView from "../UserShortView";

interface StudentLinkItemProps {
  student: UserShort;
  href: string;
  isActive: boolean;
}
const StudentLinkItem = ({ student, href, isActive }: StudentLinkItemProps) => {
  return (
    <Link
      href={href}
      className={`p-1 rounded shadow-regular bg-primary ${
        isActive ? "hover:shadow-success" : "hover:cursor-none"
      } align-top text-left w-64 h-64`}
      onClick={(e) => !isActive && e.preventDefault()}
    >
      <UserShortView user={student} />
    </Link>
  );
};

export default StudentLinkItem;
