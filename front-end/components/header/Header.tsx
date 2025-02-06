import { MY_PROFILE_URL } from "../../utils/urls";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AuthContextType, useAuth } from "../AuthProvider";
import { ButtonStatus, ButtonType, HeaderButton } from "./HeaderButton";
import HeaderProfileButton from "./HeaderProfileButton";
import Language from "../language/Language";

const IMAGE_WIDTH = 103;
const IMAGE_HEIGHT = 32.25;

interface HeaderProps {
  translations: any;
}

const Header = React.memo(({ translations }: HeaderProps) => {
  const { pathname } = useRouter();
  const auth: AuthContextType = useAuth();
  const userData = auth.data;

  const homeButtonStatus =
    pathname === "/" ? ButtonStatus.CurrentPage : ButtonStatus.Active;
  const loginButtonStatus =
    pathname === "/login" ? ButtonStatus.CurrentPage : ButtonStatus.Active;

  return (
    <header className="h-fit flex flex-col gap-4 items-center md:flex-row justify-between p-4 px-4 bg-primary shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center">
        <Image
          priority
          className="mr-1 w-auto h-auto"
          src="/images/Brand.svg"
          alt="ucll"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
        <h1>{translations("header.title")}</h1>
      </div>
      <nav className="flex items-center">
        <Language translations={translations} />
        <HeaderButton
          buttonType={ButtonType.Home}
          buttonStatus={homeButtonStatus}
          translations={translations}
        />
        {(userData.email && (
          <HeaderProfileButton
            email={userData.email}
            userType={userData.userType}
            href={MY_PROFILE_URL}
          />
        )) || (
          <HeaderButton
            buttonType={ButtonType.Login}
            buttonStatus={loginButtonStatus}
            translations={translations}
          />
        )}
      </nav>
    </header>
  );
});

export default Header;
