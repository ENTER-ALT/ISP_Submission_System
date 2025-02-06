import { Course, CourseShort, EntityItem } from "@/types";
import React from "react";

interface CourseDetailsViewProps {
  details: Course;
}

const CourseDetailsView = React.memo(({ details }: CourseDetailsViewProps) => {

  const year = Math.ceil(details.phase / 2);
  const semester = details.phase % 2 === 0 ? 2 : 1;

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="flex flex-col lg:hidden gap-4">
        <p>{year} Year</p>
        <p>{semester} Semester</p>
        <div className="flex xl:hidden">
          <p>{details.credits} Credits</p>
        </div>
      </div>
      <p>{details.description}</p>
      <p>
        Taught by:{" "}
        {!details.lecturers || details.lecturers.length > 0
          ? details.lecturers.join(", ")
          : "No lecturers"}
      </p>
      {!details.requiredPassedCourses ||
        (details.requiredPassedCourses.length > 0 && (
          <p>
            Required Courses:{" "}
            {details.requiredPassedCourses
              .map((details) => details.name)
              .join(", ")}
          </p>
        ))}
      {details.isElective && <p>Elective</p>}
    </section>
  );
});

export default CourseDetailsView;
