import { SessionData, UserType } from "@/types/auth";
import {
  HOME_URL,
  LOGIN_REQUIRED_URL,
  LOGIN_URL,
  MY_ISP_URL,
  MY_PROFILE_URL,
  NO_ACCESS_URL,
} from "@/utils/urls";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

type UrlPattern = {
  regex: RegExp;
  redirectUrl: string;
};

const modifyUrlBasedOnAccess = (url: string, urlPatterns: UrlPattern[]) => {
  // Check against specific patterns first
  for (const { regex, redirectUrl } of urlPatterns) {
    if (regex.test(url)) {
      return redirectUrl; // If the URL matches, return the corresponding modified URL
    }
  }

  // Default route: if no specific match, redirect to home page
  return url;
};

// Function to get URL patterns for student users
const getStudentUrlPatterns = (userData: SessionData | null): UrlPattern[] => {
  if (!userData) {
    return [];
  }

  // Regex to match /my-isp and /my-isp/[studentId] but not /my-isp/edit/* or /my-isp/view/*
  const myIspRegex = new RegExp(`^${MY_ISP_URL}(?!/(edit|view)($|/)).*$`);
  // Regex to match /my-profile and any subpath
  const myProfileRegex = new RegExp(`^${MY_PROFILE_URL}.*$`);

  return [
    // Redirect /my-isp* to /my-isp/[userId]
    { regex: myIspRegex, redirectUrl: `${MY_ISP_URL}/${userData?.userId}` },
    // Redirect /my-profile* to /my-profile/[email]
    {
      regex: myProfileRegex,
      redirectUrl: `${MY_PROFILE_URL}/${userData?.email}`,
    },
    // Redirect /manage-* to home
    { regex: /^\/manage-.*/, redirectUrl: NO_ACCESS_URL },
    // Redirect /login* to home
    {
      regex: /^\/login.*$/,
      redirectUrl: `${MY_PROFILE_URL}/${userData?.email}`,
    },
  ];
};

// Function to get URL patterns for admin users
const getAdminUrlPatterns = (userData: SessionData | null): UrlPattern[] => {
  if (!userData) {
    return [];
  }

  // Regex to match /my-profile and any subpath
  const myProfileRegex = new RegExp(`^${MY_PROFILE_URL}.*$`);

  return [
    // Redirect /my-profile* to /my-profile/[email]
    {
      regex: myProfileRegex,
      redirectUrl: `${MY_PROFILE_URL}/${userData?.email}`,
    },
    // Redirect /login* to home
    { regex: /^\/login.*$/, redirectUrl: HOME_URL },
  ];
};

// Function to get URL patterns for guest users
const getGuestUrlPatterns = (): UrlPattern[] => {
  return [
    // Redirect /login to login page
    { regex: /^\/login$/, redirectUrl: LOGIN_URL },
    // Redirect any other path to login required page
    { regex: /^\/.*$/, redirectUrl: LOGIN_REQUIRED_URL },
  ];
};

const modifyUrl = (url: string, userData: SessionData | null) => {
  if (!userData || userData.userId === -1 || userData.email === "") {
    const guestRoutes = getGuestUrlPatterns();
    url = modifyUrlBasedOnAccess(url, guestRoutes);
    return url;
  }
  if (userData?.userType === UserType.ADMINISTRATIVE) {
    const adminRoutes = getAdminUrlPatterns(userData);
    url = modifyUrlBasedOnAccess(url, adminRoutes);
    return url;
  }
  if (userData?.userType === UserType.STUDENT) {
    const studentRoutes = getStudentUrlPatterns(userData);
    url = modifyUrlBasedOnAccess(url, studentRoutes);
    return url;
  }
};

const useRouteModifyer = () => {
  const router = useRouter();
  const { data } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(true);

  useEffect(() => {
    const url = router.asPath;
    if (!url) return;

    const userData = data;
    const newUrl = modifyUrl(url, userData);
    setIsRedirecting(false);
    if (newUrl && newUrl !== url) {
      setIsRedirecting(true);
      router.replace(newUrl).then(() => setIsRedirecting(false));
      return;
    }
  }, [data, router]);

  return isRedirecting;
};

export default useRouteModifyer;
