import {
  MANAGE_ADMINS_URL,
  MANAGE_COURSES_URL,
  MANAGE_ISP_URL,
  MANAGE_STUDENTS_URL,
  MY_ISP_URL,
} from "@/utils/urls";

export type Tab = {
  name: string;
  href: string;
};

export const tabsEn: Tab[] = [
  { name: "My ISP", href: MY_ISP_URL },
  { name: "Manage ISP", href: MANAGE_ISP_URL },
  { name: "Manage Students", href: MANAGE_STUDENTS_URL },
  { name: "Manage Admins", href: MANAGE_ADMINS_URL },
  { name: "Manage Courses", href: MANAGE_COURSES_URL },
];

export const tabsNl: Tab[] = [
  { name: "Mijn ISP", href: MY_ISP_URL },
  { name: "Beheer ISP", href: MANAGE_ISP_URL },
  { name: "Beheer Studenten", href: MANAGE_STUDENTS_URL },
  { name: "Beheer Admins", href: MANAGE_ADMINS_URL },
  { name: "Beheer Cursussen", href: MANAGE_COURSES_URL },
];
