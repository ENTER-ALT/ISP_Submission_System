import Link from "next/link";
import React from "react";

interface FixedBackButtonProps {
  url: string;
}

const FixedBackButton: React.FC<FixedBackButtonProps> = ({ url }) => {
  return (
    <section className="fixed bottom-8 left-8">
      <Link
        href={url}
        className="hover:shadow-success rounded shadow-regular bg-indigo-950 p-3"
      >
        Back
      </Link>
    </section>
  );
};

export default FixedBackButton;
