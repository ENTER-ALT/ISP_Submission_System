import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import CourseForm from "@/components/courses/course_form/CourseForm";
import CourseEditableItem from "@/components/courses/CourseEditableItem";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import CourseService from "@/services/CourseService";
import { Course, EntityItem, PrivilegeType } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { useCrudCourse } from "@/utils/hooks/useCrudCourse";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import { mapCourseShortToEntityItem } from "@/utils/mappers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Courses";
const MAIN_SECTION_TITLE = "Manage courses";

export default function ManageCourses() {
  const [updatingCourse, setUpdatingCourse] = useState<boolean>(false);
  const [formData, setFormData] = useState<Course | null>(null);
  const [formErrors, setFormErrors] = useState<ErrorState>({});
  const { errors, setErrors, handleError } = useErrorHandler();
  const { courses, createCourse, updateCourse, deleteCourse } =
    useCrudCourse(handleError);
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleUpdate = async (id: number) => {
    const course: Course = await CourseService.getCourseById(id, handleError);
    setFormData(course);
    setUpdatingCourse(true);
    setFormErrors({});
  };

  const handleCreate = () => {
    const course: Course = getDefaultCourse();
    setFormData(course);
    setUpdatingCourse(false);
    setFormErrors({});
  };

  const handleSubmit = async (isp: Course) => {
    updatingCourse ? await update(isp) : await create(isp);
  };

  const update = async (course: Course) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_COURSE);
    if (!verified) {
      return;
    }
    await updateCourse(course);
    setFormData(null);
  };

  const create = async (course: Course) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_COURSE);
    if (!verified) {
      return;
    }
    await createCourse(course);
    setFormData(null);
  };

  const handleCancel = () => {
    setFormData(null);
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_COURSE);
    if (!verified) {
      return;
    }
    await deleteCourse(id);
    setFormData(null);
  };

  const getPossibleRequiredPassedCourses = (course: Course): EntityItem[] => {
    return courses
      .filter(
        (c) =>
          c.id !== course.id &&
          c.phase < course.phase &&
          course.requiredPassedCourses.findIndex((r) => r.id === c.id) === -1
      )
      .map(mapCourseShortToEntityItem);
  };

  const manageTabIsActive =
    formData === null && 
    Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      {courses && courses.length && (
        <ObjectsWithHeadingLayout
          objects={courses}
          isActive={manageTabIsActive}
          headingTitle={MAIN_SECTION_TITLE}
          flex="col"
          children={(course) => (
            <CourseEditableItem
              course={course}
              details={detailedCourses[course.id]}
              redactorCourse={handleUpdate}
              toggleCourseDetails={toggleCourseDetails}
              isActive={manageTabIsActive}
            />
          )}
        />
      )}

      <FixedCreateButton onClick={handleCreate} isActive={manageTabIsActive} />
      {formData && (
        <CourseForm
          formData={formData}
          setFormData={setFormData}
          formErrors={errors}
          setFormErrors={setErrors}
          formName={updatingCourse ? "Update Course" : "Create Course"}
          getPossibleRequiredCourses={getPossibleRequiredPassedCourses}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={updatingCourse ? handleDelete : undefined}
        />
      )}
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
