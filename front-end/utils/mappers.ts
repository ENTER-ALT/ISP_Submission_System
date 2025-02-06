import {
  Course,
  CourseShort,
  CourseUpdateView,
  CreateISPView,
  EntityItem,
  ISP,
  Privilege,
  Student,
  StudentUpdateView,
  UpdateISPView,
  User,
} from "@/types";

export function mapCourseToUpdateView(course: Course): CourseUpdateView {
  return {
    name: course.name,
    description: course.description,
    phase: course.phase,
    credits: course.credits,
    lecturers: course.lecturers,
    isElective: course.isElective,
    requiredPassedCourses: course.requiredPassedCourses.map((c) => c.id),
  };
}

export function mapStudentToUpdateView(student: Student): StudentUpdateView {
  return {
    name: student.name,
    email: student.email,
    password: student.password,
    nationality: student.nationality,
    passedCourses: student.passedCourses.map((c) => c.id),
  };
}

export function mapISPToUpdateView(isp: ISP): UpdateISPView {
  return {
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    studentId: isp.student.id,
    status: isp.status,
    courses: isp.courses.map((course) => course.id),
  };
}

export function mapISPToCreateView(isp: ISP): CreateISPView {
  return {
    totalCredits: isp.totalCredits,
    startYear: isp.startYear,
    studentId: isp.student.id,
    status: isp.status,
    courses: isp.courses.map((course) => course.id),
  };
}

export function mapCourseShortToEntityItem(course: CourseShort): EntityItem {
  return {
    id: course.id,
    name: `${course.name} ${course.credits} cr.`,
  };
}

export function mapCourseShortToString(course: CourseShort): string {
  return `${course.name} ${course.credits} cr.`;
}

export function mapPrivilegeToString(privilege: Privilege): string {
  return privilege.description;
}

export function mapUserToString( user: User): string {
  return `${user.name} (${user.userType})`;
}