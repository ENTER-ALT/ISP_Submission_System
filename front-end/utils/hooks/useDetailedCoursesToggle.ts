import CourseService from "@/services/CourseService";
import { Course } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useState } from "react";

export const useDetailedCoursesToggle = (
  errorCallback?: (error: ErrorState) => void
) => {
  const [detailedCourses, setDetailedCourses] = useState<{
    [key: number]: Course;
  }>({});

  const toggleCourseDetails = async (courseId: number) => {
    if (detailedCourses[courseId]) {
      const newCourses = { ...detailedCourses };
      delete newCourses[courseId];
      setDetailedCourses(newCourses);
    } else {
      const course: Course = await CourseService.getCourseById(
        courseId,
        errorCallback
      );
      setDetailedCourses({ ...detailedCourses, [courseId]: course });
    }
  };

  return { detailedCourses, setDetailedCourses, toggleCourseDetails };
};
