import { Course, CourseShort } from "@/types";
import React from "react";
import CourseDetailsView from "./CourseDetailsView";

interface CourseEditableItemProps {
  course: CourseShort;
  details?: Course;
  toggleCourseDetails: (courseId: number) => Promise<void>;
  isActive: boolean;
  children: React.ReactNode;
}

const CourseItemLayout = React.memo(
  ({
    course,
    details,
    toggleCourseDetails,
    isActive,
    children,
  }: CourseEditableItemProps) => {
    const handleToggleCourseDetails = async () => {
      await toggleCourseDetails(course.id);
    };

    return (
      <section className="bg-primary shadow-regular w-full rounded">
        <section className="flex flex-col sm:flex-row justify-between p-4 gap-4">
          <article className="flex flex-row gap-4">{children}</article>
          <button
            className={`p-1 w-8 h-8 ${
              details ? "arrow-up" : "arrow-down"
            } border-gray-300 self-center`}
            onClick={handleToggleCourseDetails}
            disabled={!isActive}
          ></button>
        </section>
        {details && <CourseDetailsView details={details} />}
      </section>
    );
  }
);

export default CourseItemLayout;
