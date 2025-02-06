import Link from "next/link";
import React from "react";
import { HOME_URL, LOGIN_URL } from "../../utils/urls";

enum ButtonType {
  Home = "home",
  Login = "login",
}

enum ButtonStatus {
  Active = "active",
  Inactive = "inactive",
  CurrentPage = "currentPage",
}
interface HeaderButtonProps {
  buttonType: ButtonType;
  buttonStatus: ButtonStatus;
  translations: any;
}

const HeaderButton = ({
  buttonType,
  buttonStatus,
  translations,
}: HeaderButtonProps) => {
  const sharedClassOptions = "p-2 rounded";

  const typeOptions = {
    home: {
      text: translations("header.homeButton"),
      class: "mr-3",
      href: HOME_URL,
    },
    login: {
      text: translations("header.loginButton"),
      class: "",
      href: LOGIN_URL,
    },
  };

  const statusOptions = {
    active: {
      class: "shadow-regular bg-danger hover:shadow-success",
      attributes: {},
    },
    inactive: {
      class: "shadow-activated bg-secondary pointer-events-none",
      attributes: {
        disabled: true,
        tabIndex: -1,
        "aria-disabled": true,
      },
    },
    currentPage: {
      class: "shadow-activated bg-success pointer-events-none",
      attributes: {
        disabled: true,
        tabIndex: -1,
        "aria-disabled": true,
      },
    },
  };
  const buttonClass = `${sharedClassOptions} ${statusOptions[buttonStatus].class} ${typeOptions[buttonType].class}`;
  const buttonAttributes = statusOptions[buttonStatus].attributes;
  const buttonHref = typeOptions[buttonType].href;

  return (
    <Link href={buttonHref} className={buttonClass} {...buttonAttributes}>
      {typeOptions[buttonType].text}
    </Link>
  );
};

export { HeaderButton, ButtonType, ButtonStatus };
