import { CourseShort, EntityItem } from "@/types";
import React from "react";
import EditButton from "../buttons/EditButton";
import CourseItemLayout from "./CourseItemLayout";
import CourseShortView from "./CourseShortView";

interface CourseEditableItemProps {
  course: CourseShort;
  details?: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
  redactorCourse: (courseId: number) => Promise<void>;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
}

const CourseEditableItem = React.memo(
  ({
    course,
    details,
    redactorCourse,
    toggleCourseDetails,
    isActive,
  }: CourseEditableItemProps) => {
    const handleRedactorCourse = async () => {
      await redactorCourse(course.id);
    };

    return (
      <CourseItemLayout
        course={course}
        details={details}
        toggleCourseDetails={toggleCourseDetails}
        isActive={isActive}
      >
        <EditButton handleEdit={handleRedactorCourse} isActive={isActive} />
        <CourseShortView course={course} />
      </CourseItemLayout>
    );
  }
);

export default CourseEditableItem;
