import ISPService from "@/services/IspService";
import { ISPShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useISPShortByStudentGetter = (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [isps, setISPs] = useState<ISPShort[] | null>([]);

  const getISPs = async () => {
    const newIsp: ISPShort[] | null = await ISPService.getISPShortByStudentId(
      studentId,
      errorCallback
    );
    setISPs(newIsp);
  };

  useEffect(() => {
    getISPs();
  }, [studentId]);

  return { isps, setISPs, getISPs };
};
