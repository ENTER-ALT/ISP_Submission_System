import UserService from "@/services/UserService";
import { Administrative, Student } from "@/types";
import { UserType } from "@/types/auth";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useUserByEmailGetter = (
  email: string,
  errorCallback?: (error: ErrorState) => void
) => {
  const [user, setUser] = useState<Administrative | Student | undefined>(undefined);

  const getUser = async () => {
    const newUser = await UserService.getUserByEmail(email, errorCallback);
    if (newUser.userType === UserType.ADMINISTRATIVE) {
      setUser(newUser as Administrative);
    }
    else if (newUser.userType === UserType.STUDENT) {
      setUser(newUser as Student);
    }
  };

  useEffect(() => {
    getUser();
  }, [email]);

  return { user, setUser, getUser };
};
