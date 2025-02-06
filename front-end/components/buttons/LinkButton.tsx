import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  text: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="hover:shadow-success rounded shadow-regular bg-indigo-950 p-2 text-center"
    >
      {text}
    </Link>
  );
};

export default LinkButton;
