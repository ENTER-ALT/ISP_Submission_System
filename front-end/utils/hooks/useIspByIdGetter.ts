import IspService from "@/services/IspService";
import { ISP } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useIspByIdGetter = (
  ispId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [isp, setIsp] = useState<ISP | null>();

  const getIspById = async (id: number) => {
    const isp = await IspService.getISPById(id, errorCallback);
    setIsp(isp);
  };

  useEffect(() => {
    getIspById(ispId);
  }, [ispId]);

  return { isp, setIsp, getIspById};
};
