import CourseService from "@/services/CourseService";
import { CourseShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useCoursesForStudentIspGetter = (
  studentId: number,
  ispId: number,
  errorCallback?: (error: ErrorState) => void
) => {

  const [courses, setCourses] = useState<CourseShort[]>([]);

  const getCourses = async () => {
    if (studentId === -1 || ispId === -1) {
      return;
    }
    const availableForStudentCourses: CourseShort[] = await CourseService.getCoursesForStudent(
      studentId,
      errorCallback
    );

    const chosenCourses: CourseShort[] = await CourseService.getCoursesByISPId(
      ispId,
      errorCallback
    );
    const combinedCourses = [
      ...availableForStudentCourses,
      ...chosenCourses.filter(
      (chosenCourse) =>
        !availableForStudentCourses.some(
        (availableCourse) => availableCourse.id === chosenCourse.id
        )
      ),
    ];
    setCourses(combinedCourses);
  };

  useEffect(() => {
    getCourses();
  }, [studentId, ispId]);

  return { courses, setCourses, getCourses };
};
