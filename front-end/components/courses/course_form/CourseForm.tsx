import FormButtons from "@/components/forms/FormButtons";
import FormLayout from "@/components/forms/FormLayout";
import { Course, EntityItem } from "@/types";
import { ErrorState } from "@/types/errorState";
import { validateCourse } from "@/utils/validators";
import React from "react";
import EntityItemsInput from "../../forms/EntityItemsInput";
import FormInput from "../../forms/FormInput";
import CourseLecturersInput from "./CourseLecturersInput";

interface CourseFormProps {
  formData: Course;
  setFormData: (course: Course) => void;
  formErrors: ErrorState;
  setFormErrors: (errors: ErrorState) => void;
  formName: string;
  getPossibleRequiredCourses: (course: Course) => EntityItem[];
  onSubmit: (course: Course) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const CourseForm = React.memo(
  ({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formName,
    getPossibleRequiredCourses,
    onSubmit,
    onCancel,
    onDelete,
  }: CourseFormProps) => {

    const handleDelete = async () => {
      if (formData && onDelete) {
        await onDelete(formData.id);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      let { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handlePhaseChange = (value: number) => {
      let newFormData = { ...formData, phase: value };
      if (value < formData.phase) {
        newFormData.requiredPassedCourses = [];
      }
      setFormData(newFormData);
    };

    const handleCreditsChange = (value: number) => {
      setFormData({ ...formData, credits: value });
    }

    const toggleElective = () => {
      setFormData({ ...formData, isElective: !formData.isElective });
    };

    const handleLecturerChange = (index: number, value: string) => {
      const newLecturers = [...formData.lecturers];
      newLecturers[index] = value;
      setFormData({ ...formData, lecturers: newLecturers });
    };

    const addEmptyLecturer = () => {
      setFormData({ ...formData, lecturers: [...formData.lecturers, ""] });
    };

    const removeLecturer = (index: number) => {
      const newLecturers = formData.lecturers.filter((_, i) => i !== index);
      setFormData({ ...formData, lecturers: newLecturers });
    };

    const handleRequiredPassedCourseChange = (
      index: number,
      value: { id: number; name: string }
    ) => {
      const newRequiredPassedCourses = [...formData.requiredPassedCourses];
      newRequiredPassedCourses[index] = value;
      setFormData({
        ...formData,
        requiredPassedCourses: newRequiredPassedCourses,
      });
    };

    const addEmptyRequiredPassedCourse = () => {
      setFormData({
        ...formData,
        requiredPassedCourses: [
          ...formData.requiredPassedCourses,
          { id: -1, name: "" },
        ],
      });
    };

    const removeRequiredPassedCourse = (index: number) => {
      const newRequiredPassedCourses = formData.requiredPassedCourses.filter(
        (_, i) => i !== index
      );
      setFormData({
        ...formData,
        requiredPassedCourses: newRequiredPassedCourses,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateCourse(formData, setFormErrors)) {
        return;
      }
      await onSubmit(formData);
    };

    return (
      formData && (
        <FormLayout formName={formName} onSubmit={handleSubmit}>
          <FormInput
            name="name"
            labelText="Course Name"
            inputType="text"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />
          <FormInput
            name="description"
            labelText="Description"
            inputType="textarea"
            value={formData.description}
            onChange={handleChange}
            error={formErrors.description}
          />
          <FormInput
            name="phase"
            labelText="Phase"
            inputType="number"
            value={formData.phase}
            onChange={(e) => handlePhaseChange(parseInt(e.target.value))}
            error={formErrors.phase}
          />
          <FormInput
            name="credits"
            labelText="Credits"
            inputType="number"
            value={formData.credits}
            onChange={(e) => handleCreditsChange(parseInt(e.target.value))}
            error={formErrors.credits}
          />
          <CourseLecturersInput
            lecturers={formData.lecturers}
            onAdd={addEmptyLecturer}
            onRemove={removeLecturer}
            onChange={handleLecturerChange}
            error={formErrors.lecturers}
          />
          <FormInput
            name="isElective"
            labelText="Elective"
            inputType="checkbox"
            checked={formData.isElective}
            onChange={toggleElective}
          />
          <EntityItemsInput
            entityItems={formData.requiredPassedCourses}
            name="requiredPassedCourses"
            labelText="Required Courses to Pass"
            onAdd={addEmptyRequiredPassedCourse}
            onRemove={removeRequiredPassedCourse}
            onChange={handleRequiredPassedCourseChange}
            getAvailableEntities={() => getPossibleRequiredCourses(formData)}
            error={formErrors.requiredPassedCourses}
          />
          <FormButtons onCancel={onCancel} onDelete={handleDelete} />
        </FormLayout>
      )
    );
  }
);

export default CourseForm;
