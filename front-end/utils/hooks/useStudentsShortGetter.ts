import StudentService from "@/services/StudentService";
import { UserShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useStudentsShortGetter = (
  errorCallback?: (error: ErrorState) => void
) => {

  const [students, setStudents] = useState<UserShort[]>([]);

  const getStudents = async () => {
    const courses: UserShort[] = await StudentService.getAllShortStudents(
      errorCallback
    );
    setStudents(courses);
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, setStudents, getStudents };
};
