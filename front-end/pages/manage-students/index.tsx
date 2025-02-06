import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import StudentForm from "@/components/users/students/student_form/StudentForm";
import UserEditableItem from "@/components/users/UserEditableItem";
import StudentService from "@/services/StudentService";
import { CourseShort, PrivilegeType, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultStudent } from "@/utils/defaultTypes";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useCrudStudent } from "@/utils/hooks/useCrudStudent";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Students";
const MAIN_SECTION_TITLE = "Manage students";

export default function ManageStudents() {
  const [updatingStudent, setUpdatingStudent] = useState<boolean>(false);
  const [formData, setFormData] = useState<Student | null>(null);
  const [formRrrors, setFormErrors] = useState<ErrorState>({});
  const { errors, setErrors, handleError } = useErrorHandler();
  const { students, updateStudent, createStudent, deleteStudent } =
    useCrudStudent(handleError);
  const { courses } = useCoursesShortGetter(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleCreate = () => {
    const student: Student = getDefaultStudent();
    setFormData({...student, password: ""});
    setFormErrors({});
    setUpdatingStudent(false);
  };

  const handleUpdate = async (id: number) => {
    const student: Student | undefined = await StudentService.getStudentById(
      id,
      handleError
    );
    if (student) {
      setFormData({...student, password: ""});
      setFormErrors({});
      setUpdatingStudent(true);
    }
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_STUDENT);
    if (!verified) {
      return;
    }
    await deleteStudent(id);
    setFormData(null);
  };

  const handleSubmit = async (student: Student) => {
    updatingStudent ? await update(student) : await create(student);
  };

  const update = async (student: Student) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_STUDENT);
    if (!verified) {
      return;
    }
    await updateStudent(student);
    setFormData(null);
  };

  const create = async (student: Student) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_STUDENT);
    if (!verified) {
      return;
    }
    await createStudent(student);
    setFormData(null);
  };

  const handleCancel = () => {
    setFormData(null);
  };

  const getPossiblePassedCourses = (student: Student): CourseShort[] => {
    const passedCourseIds = new Set(
      student.passedCourses.map((course) => course.id)
    );

    return courses.filter((course) => !passedCourseIds.has(course.id));
  };

  const manageTabisActive =
    formData === null || Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={students}
        isActive={manageTabisActive}
        flex="row"
        headingTitle={MAIN_SECTION_TITLE}
        children={(student) => (
          <UserEditableItem
            student={student}
            redactorStudent={handleUpdate}
            isActive={manageTabisActive}
          />
        )}
      />
      <FixedCreateButton onClick={handleCreate} isActive={manageTabisActive} />
      {formData && (
        <StudentForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formRrrors}
          setFormErrors={setFormErrors}
          formName={updatingStudent ? "Update Student" : "Create Student"}
          getPossiblePassedCourses={getPossiblePassedCourses}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={updatingStudent ? handleDelete : undefined}
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
