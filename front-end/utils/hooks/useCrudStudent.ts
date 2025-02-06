import StudentService from "@/services/StudentService";
import { Student, UserShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";
import { mapStudentToUpdateView } from "../mappers";

export const useCrudStudent = (
  errorCallback?: (error: ErrorState) => void
) => {
  const [students, setStudents] = useState<UserShort[]>([]);

  const getStudents = async () => {
    const courses: UserShort[] = await StudentService.getAllShortStudents(
      errorCallback
    );
    setStudents(courses);
  };

  const updateStudent = async (student: Student) => {
    const updateStudentView = mapStudentToUpdateView(student);
    await StudentService.updateStudent(student.id, updateStudentView, errorCallback);
    await getStudents();
  };

  const createStudent = async (student: Student) => {
    const updateStudentView = mapStudentToUpdateView(student);
    await StudentService.createStudent(updateStudentView, errorCallback);
    await getStudents();
  };

  const deleteStudent = async (id: number) => {
    await StudentService.deleteStudent(id, errorCallback);
    await getStudents();
  };

  useEffect(() => {
    getStudents();
  }, []);

  return { students, setStudents, getStudents, updateStudent, createStudent, deleteStudent };
};
