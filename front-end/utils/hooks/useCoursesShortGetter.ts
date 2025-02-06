import CourseService from "@/services/CourseService";
import { CourseShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";

export const useCoursesShortGetter = (
  errorCallback?: (error: ErrorState) => void
) => {

  const [courses, setCourses] = useState<CourseShort[]>([]);

  const getCourses = async () => {
    const courses: CourseShort[] = await CourseService.getAllShortCourses(
      errorCallback
    );
    setCourses(courses);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return { courses, setCourses, getCourses };
};
