import { UserType } from "./auth";

export type Course = {
  id: number;
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: EntityItem[];
};

export type CourseShort = {
  id: number;
  name: string;
  phase: number;
  credits: number;
};

export type CourseUpdateView = {
  name: string;
  description: string;
  phase: number;
  credits: number;
  lecturers: string[];
  isElective: boolean;
  requiredPassedCourses: number[];
};

export type Student = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  studyYear: number;
  nationality?: string;
  passedCourses: CourseShort[];
};

export type UserShort = {
  id: number;
  name: string;
};

export type StudentUpdateView = {
  name: string;
  email: string;
  password: string;
  nationality?: string;
  passedCourses: number[];
};

export enum ISPStatus {
  SUBMITTED = "SUBMITTED",
  NOTSUBMITTED = "NOTSUBMITTED",
}

export const ISPStatusToString = (status: ISPStatus) => {
  switch (status) {
    case ISPStatus.SUBMITTED:
      return "Submitted";
    case ISPStatus.NOTSUBMITTED:
      return "Not submitted";
  }
}

export type ISP = {
  id: number;
  status: ISPStatus;
  totalCredits: number;
  startYear: number;
  courses: CourseShort[];
  student: { id: number; name: string };
};

export type ISPShort = {
  id: number;
  status: ISPStatus;
  totalCredits: number;
  startYear: number;
  student: { id: number; name: string };
};

export type CreateISPView = {
  totalCredits: number;
  startYear: number;
  studentId: number;
  status: ISPStatus;
  courses: number[];
};

export type UpdateISPView = {
  totalCredits: number;
  startYear: number;
  studentId: number;
  status: ISPStatus;
  courses: number[];
};

export type EntityItem = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

export type Administrative = {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  privileges: Privilege[];
}

export type Privilege = {
  id: number;
  name: number
  description: string;
}

export const enum PrivilegeType {
  CREATE_ISP = 1,
  UPDATE_ISP = 2,
  DELETE_ISP = 3,
  CREATE_STUDENT = 4,
  UPDATE_STUDENT = 5,
  DELETE_STUDENT = 6,
  CREATE_COURSE = 7,
  UPDATE_COURSE = 8,
  DELETE_COURSE = 9,
  CREATE_ADMINISTRATIVE = 10,
  UPDATE_ADMINISTRATIVE = 11,
  DELETE_ADMINISTRATIVE = 12,
}
