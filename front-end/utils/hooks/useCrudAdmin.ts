
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";
import AdministrativeService from "@/services/AdministrativeService";
import { Administrative, UserShort } from "@/types";

export const useCrudAdmin = (errorCallback?: (error: ErrorState) => void) => {
  const [admins, setAdmins] = useState<UserShort[]>([]);

  const getAdmins = async () => {
    const admins: UserShort[] = await AdministrativeService.getAllShortAdministratives(
      errorCallback
    );
    setAdmins(admins);
  };

  const updateAdmin = async (admin: Administrative) => {
    await AdministrativeService.updateAdministrative(
      admin.id,
      admin,
      errorCallback
    );
    await getAdmins();
  };

  const createAdmin = async (admin: Administrative) => {
    await AdministrativeService.createAdministrative(admin, errorCallback);
    await getAdmins();
  };

  const deleteAdmin = async (id: number) => {
    await AdministrativeService.deleteAdministrative(id, errorCallback);
    await getAdmins();
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return {
    admins,
    setAdmins: setAdmins,
    getAdmins,
    updateAdmin,
    createAdmin,
    deleteAdmin,
  };
};
