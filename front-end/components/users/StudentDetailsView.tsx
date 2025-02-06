import { Student } from "@/types";
import React from "react";
import CourseShortView from "../courses/CourseShortView";
import MapObjectsLayout from "../layouts/MapObjectsLayout";
import SmallTextLayout from "../layouts/SmallTextLayout";

interface StudentDetailsViewProps {
  user: Student;
}

const StudentDetailsView = React.memo(({ user }: StudentDetailsViewProps) => {
  return (
    <article className="flex flex-col gap-2">
      <p>{`Nationality: ${user.nationality}`}</p>
      <p>{`Study year: ${user.studyYear}`}</p>
      {user.passedCourses.length > 0 && (
        <>
          <p className="flex self-center">{`Passed courses:`}</p>
          <MapObjectsLayout
            children={(course, index) => (
              <SmallTextLayout>
                <CourseShortView course={course} />
              </SmallTextLayout>
            )}
            objects={user.passedCourses}
            flex="row"
            gap={2}
          />
        </>
      )}
    </article>
  );
});

export default StudentDetailsView;
