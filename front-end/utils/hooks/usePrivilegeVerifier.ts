import { useAuth } from "@/components/AuthProvider";
import { PrivilegeType } from "@/types";
import { ErrorState } from "@/types/errorState";

export const usePrivilegeVerifier = (
  errorCallback?: (error: ErrorState) => void
) => {
  const { data } = useAuth();
  const verifyPrivilege = async (privilege: PrivilegeType) => {
    if (data && data.privileges && data.privileges.includes(privilege)) {
      return true;
    }
    errorCallback && errorCallback({ message: "Unauthorized for this action" });
    return false;
  };

  return { verifyPrivilege };
};
