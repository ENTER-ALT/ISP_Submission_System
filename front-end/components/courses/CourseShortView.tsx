import { CourseShort } from "@/types";
import React from "react";

interface CourseShortViewProps {
  course: CourseShort;
}

const CourseShortView = React.memo(({ course }: CourseShortViewProps) => {
  const year = Math.ceil(course.phase / 2);
  const semester = course.phase % 2 === 0 ? 2 : 1;

  return (
    <article className="flex flex-row gap-4">
      <p>{course.name}</p>
      <div className="hidden lg:flex flex-row gap-4">
        <p>{year} Year</p>
        <p>{semester} Semester</p>
        <div className="hidden xl:flex">
          <p>{course.credits} Credits</p>
        </div>
      </div>
    </article>
  );
});

export default CourseShortView;
