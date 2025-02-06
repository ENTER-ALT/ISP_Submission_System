import { CourseShort, EntityItem } from "@/types";
import React from "react";
import SelectableItem from "../buttons/SelectButton";
import CourseShortView from "./CourseShortView";
import CourseDetailsView from "./CourseDetailsView";
import CourseItemLayout from "./CourseItemLayout";

interface CourseSelectableItemProps {
  course: CourseShort;
  selected: boolean;
  details?: {
    description: string;
    lecturers: string[];
    requiredPassedCourses: EntityItem[];
    isElective: boolean;
  };
  toggleSelectCourse: () => void;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
}

const CourseSelectableItem = React.memo(
  ({
    course,
    selected,
    details,
    toggleSelectCourse,
    toggleCourseDetails,
    isActive,
  }: CourseSelectableItemProps) => {
    return (
      <CourseItemLayout
        course={course}
        details={details}
        toggleCourseDetails={toggleCourseDetails}
        isActive={isActive}
      >
        <SelectableItem
          toggleSelect={toggleSelectCourse}
          isActive={isActive}
          selected={selected}
        />
        <CourseShortView course={course} />
      </CourseItemLayout>
    );
  }
);

export default CourseSelectableItem;
