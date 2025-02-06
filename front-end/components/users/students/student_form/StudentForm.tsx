import FormLayout from "@/components/forms/FormLayout";
import FormObjectsInput from "@/components/forms/FormObjectsInput";
import { CourseShort, Student } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultCourse } from "@/utils/defaultTypes";
import { mapCourseShortToString } from "@/utils/mappers";
import { nationalities } from "@/utils/nationalities";
import { validateStudent } from "@/utils/validators";
import React, { useMemo } from "react";
import StudentFormButtons from "../../../forms/FormButtons";
import FormInput from "../../../forms/FormInput";
import SelectListInput from "../../../forms/SelectListInput";

interface StudentFormProps {
  formData: Student;
  setFormData: (student: Student) => void;
  formErrors: ErrorState;
  setFormErrors: (errors: ErrorState) => void;
  formName: string;
  getPossiblePassedCourses: (student: Student) => CourseShort[];
  onSubmit: (student: Student) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const StudentForm = React.memo(
  ({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formName,
    getPossiblePassedCourses,
    onSubmit,
    onCancel,
    onDelete,
  }: StudentFormProps) => {
    const availablePassedCourses = useMemo(
      () => (formData && getPossiblePassedCourses(formData)) || [],
      [formData?.passedCourses]
    );
    const canAddPassedCourse = useMemo(
      () =>
        availablePassedCourses &&
        availablePassedCourses.length > 0 &&
        !availablePassedCourses.some((p) => p.id === -1),
      [availablePassedCourses, formData?.passedCourses]
    );

    if (!formData) {
      return null;
    }

    const handleDelete = async () => {
      if (formData && onDelete) {
        await onDelete(formData.id);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handlePassedCourseChange = (
      index: number,
      availablePassedCourseIndex: number
    ) => {
      const newPassedCourses = [...formData.passedCourses];
      newPassedCourses[index] =
        availablePassedCourses[availablePassedCourseIndex];
      setFormData({
        ...formData,
        passedCourses: newPassedCourses,
      });
    };

    const addEmptyPassedCourse = () => {
      const defaultCourse: CourseShort = getDefaultCourse();
      setFormData({
        ...formData,
        passedCourses: [...formData.passedCourses, defaultCourse],
      });
    };

    const removePassedCourse = (index: number) => {
      const newPassedCourses = formData.passedCourses.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        passedCourses: newPassedCourses,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateStudent(formData, setFormErrors)) {
        return;
      }
      await onSubmit(formData);
    };

    return (
      formData && (
        <FormLayout formName={formName} onSubmit={handleSubmit}>
          <FormInput
            name="name"
            labelText="Student Name"
            inputType="text"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />
          <FormInput
            name="email"
            labelText="Email"
            inputType="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />
          <FormInput
            name="password"
            labelText="Password"
            inputType="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required={false}
          />
          <FormInput
            name="studyYear"
            labelText="Study Year"
            inputType="number"
            value={formData.studyYear}
            onChange={handleChange}
            error={formErrors.year}
          />
          <SelectListInput<string>
            value={formData.nationality}
            labelText="Nationality"
            name="nationality"
            defaultValue="Select nationality"
            values={nationalities}
            onChange={handleChange}
            error={formErrors.nationality}
          />
          <FormObjectsInput
            objects={formData.passedCourses.map(mapCourseShortToString)}
            name="passedCourses"
            labelText="Passed Courses"
            onAdd={addEmptyPassedCourse}
            onRemove={removePassedCourse}
            onChange={handlePassedCourseChange}
            availableObjects={availablePassedCourses.map(
              mapCourseShortToString
            )}
            canAddNewObject={canAddPassedCourse}
            error={formErrors.passedCourses}
          />
          <StudentFormButtons onCancel={onCancel} onDelete={handleDelete} />
        </FormLayout>
      )
    );
  }
);

export default StudentForm;
