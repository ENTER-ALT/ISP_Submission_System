import CourseService from "@/services/CourseService";
import { Course, CourseShort } from "@/types";
import { ErrorState } from "@/types/errorState";
import { useEffect, useState } from "react";
import { mapCourseToUpdateView } from "../mappers";

export const useCrudCourse = (errorCallback?: (error: ErrorState) => void) => {
  const [courses, setCourses] = useState<CourseShort[]>([]);

  const getCourses = async () => {
    const courses: CourseShort[] = await CourseService.getAllShortCourses(
      errorCallback
    );
    setCourses(courses);
  };

  const updateCourse = async (course: Course) => {
    const updateCourseView = mapCourseToUpdateView(course);
    await CourseService.updateCourse(
      course.id,
      updateCourseView,
      errorCallback
    );
    await getCourses();
  };

  const createCourse = async (course: Course) => {
    const updateCourseView = mapCourseToUpdateView(course);
    await CourseService.createCourse(updateCourseView, errorCallback);
    await getCourses();
  };

  const deleteCourse = async (id: number) => {
    await CourseService.deleteCourses([id], errorCallback);
    await getCourses();
  };

  useEffect(() => {
    getCourses();
  }, []);

  return {
    courses,
    setCourses,
    getCourses,
    updateCourse,
    createCourse,
    deleteCourse,
  };
};
