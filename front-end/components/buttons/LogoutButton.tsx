import React from "react";

interface LogoutButtonProps {
  onClick: () => Promise<void>;
  isActive: boolean;
  text: string;
}

const LogoutButton = React.memo(
  ({ onClick, isActive, text }: LogoutButtonProps) => {
    return (
      <article>
        <button
          className={`p-2 shadow-regular bg-danger rounded ${
            isActive ? "hover:shadow-success" : ""
          }`}
          onClick={async () => isActive && (await onClick())}
          disabled={!isActive}
        >
          {text}
        </button>
      </article>
    );
  }
);

export default LogoutButton;
