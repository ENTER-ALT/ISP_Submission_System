import { Administrative, Course, ISP, Student } from "@/types";
import { LoginData } from "@/types/auth";
import { ErrorState } from "@/types/errorState";

const validateISP = (
  data: ISP,
  errorCallback?: (errors: ErrorState) => void
) => {
  const newErrors: ErrorState = {};
  if (!(data.totalCredits >= 0))
    newErrors.totalCredits = "Total credits must be a positive number.";
  if (!(data.startYear >= 0))
    newErrors.startYear = "Start year must be a positive number.";
  if (!data.student || data.student.id === -1)
    newErrors.student = "Student must be chosen.";
  if (data.courses) {
    if (data.courses.some((c) => c === null || c.id === -1)) {
      newErrors.courses = "Courses must be chosen and valid.";
    } else {
      const totalCourseCredits = data.courses.reduce(
        (sum, course) => sum + course.credits,
        0
      );
      if (totalCourseCredits > data.totalCredits) {
        newErrors.courses =
          "Total credits from courses exceed ISP total credits.";
      }
    }
  }

  if (errorCallback) {
    errorCallback(newErrors);
  }

  return Object.keys(newErrors).length === 0;
};

const validateStudent = (
  data: Student,
  errorCallback?: (errors: ErrorState) => void
) => {
  const newErrors: ErrorState = {};
  if (!data.name) newErrors.name = "Student name is required.";
  if (!data.email) newErrors.email = "Email is required.";
  if (data.passedCourses && data.passedCourses.some((c) => c.id === -1)) {
    newErrors.passedCourses = "Passed courses must be chosen.";
  }

  if (errorCallback) {
    errorCallback(newErrors);
  }

  return Object.keys(newErrors).length === 0;
};

const validateAdmin = (
  data: Administrative,
  errorCallback?: (errors: ErrorState) => void
) => {
  const newErrors: ErrorState = {};
  if (!data.name) newErrors.name = "Student name is required.";
  if (!data.email) newErrors.email = "Email is required.";
  if (data.privileges && data.privileges.some((c) => c.id === -1)) {
    newErrors.passedCourses = "Privileges must be chosen.";
  }

  if (errorCallback) {
    errorCallback(newErrors);
  }

  return Object.keys(newErrors).length === 0;
};

const validateCourse = (
  data: Course,
  errorCallback?: (errors: ErrorState) => void
) => {
  const newErrors: ErrorState = {};
  if (!data.name) newErrors.name = "Course name is required.";
  if (!data.description) newErrors.description = "Description is required.";
  if (data.phase <= 0) newErrors.phase = "Phase must be a positive number.";
  if (data.credits <= 0)
    newErrors.credits = "Credits must be a positive number.";
  if (data.lecturers && data.lecturers.some((l) => l === ""))
    newErrors.lecturers = "Lecturers must be filled.";
  if (
    data.requiredPassedCourses &&
    data.requiredPassedCourses.some((c) => c.id === -1)
  ) {
    newErrors.requiredPassedCourses = "Required courses must be chosen.";
  }

  if (errorCallback) {
    errorCallback(newErrors);
  }

  return Object.keys(newErrors).length === 0;
};

const validateLoginData = (
  data: LoginData,
  errorCallback?: (errors: ErrorState) => void
) => {
  const newErrors: ErrorState = {};
  if (!data.username) {
    newErrors.username = "Email is required.";
  } else if (!data.username.includes("@")) {
    newErrors.username = "Email must contain '@'.";
  }
  if (!data.password) newErrors.password = "Password is required.";

  if (errorCallback) {
    errorCallback(newErrors);
  }
  return Object.keys(newErrors).length === 0;
};

export {
    validateAdmin,
    validateCourse,
    validateISP, validateLoginData, validateStudent
};

