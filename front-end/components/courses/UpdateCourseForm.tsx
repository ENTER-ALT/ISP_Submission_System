import { Course } from "@/types";
import React, { useEffect, useState } from "react";

type Props = {
  course: Course | null;
  onClose: () => void;
  onUpdate: (updatedCourse: Course) => void;
  onDelete: (id: number) => void;
};

const UpdateCourseForm: React.FC<Props> = ({
  course,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [formData, setFormData] = useState(course);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(course);
  }, [course]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData) {
      return false;
    }
    if (!formData.name) newErrors.name = "Course name is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (formData.phase <= 0)
      newErrors.phase = "Phase must be a positive number.";
    if (formData.credits <= 0)
      newErrors.credits = "Credits must be a positive number.";
    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleClosing = () => {
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (!formData) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !validate()) {
      return;
    }
    onUpdate(formData);
  };

  return (
    formData && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-primary p-6 rounded-lg w-11/12 max-w-lg shadow-regular relative">
          <h2 className="text-2xl mb-4 text-center">Update Course</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm mb-1">
                Course Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm mb-1">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <label htmlFor="phase" className="text-sm mb-1">
                Phase
              </label>
              <input
                type="number"
                name="phase"
                id="phase"
                value={formData.phase}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.phase && (
                <p className="text-red-500 text-xs mt-1">{errors.phase}</p>
              )}
            </div>
            <div className="flex-1 flex flex-col">
              <label htmlFor="credits" className="text-sm mb-1">
                Credits
              </label>
              <input
                type="number"
                name="credits"
                id="credits"
                value={formData.credits}
                onChange={handleChange}
                className="p-2 rounded bg-gray-700"
              />
              {errors.credits && (
                <p className="text-red-500 text-xs mt-1">{errors.credits}</p>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <button
                type="submit"
                className="flex-1 bg-safe hover:shadow-success font-semibold py-2 rounded shadow-regular"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleClosing}
                className="flex-1 bg-alter hover:shadow-success font-semibold py-2 rounded shadow-regular"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onDelete(formData.id)}
                className="flex-1 bg-danger hover:shadow-success font-semibold py-2 rounded shadow-regular"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
export default UpdateCourseForm;
