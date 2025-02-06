import PrivilegeService from "@/services/PrivilegeService";
import { Privilege } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const usePrivilegeGetter = (
  errorCallback?: (error: ErrorState) => void
) => {
  const [privileges, setPrivileges] = useState<Privilege[]>([]);

  const getPrivileges = async () => {
    const privileges: Privilege[] = await PrivilegeService.getAllPrivileges(
      errorCallback
    );
    setPrivileges(privileges);
  };

  useEffect(() => {
    getPrivileges();
  }, []);

  return { privileges, setPrivileges, getPrivileges };
};
