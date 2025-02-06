import { BACKEND_APP_URL } from "@/utils/urls";
import { CourseUpdateView } from "../types/index";
import { ErrorState } from "@/types/errorState";
import { getHeaders } from "@/utils/getHeaders";

const URL = BACKEND_APP_URL + "/courses";

const handleJsonResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const handleTextResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.text();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback({ message: data });
    }
  }
  return data;
}

const getAllCourses = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleJsonResponse(response, errorCallback);
};

const getAllShortCourses = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/short`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleJsonResponse(response, errorCallback);
};

const getCourseById = async (id: number, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleJsonResponse(response, errorCallback);
};

const getCoursesByISPId = async (ispId: number, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/by-isp/${ispId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleJsonResponse(response, errorCallback);
}

const getCoursesForStudent = async (studentId: number, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/for-student/${studentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleJsonResponse(response, errorCallback);
}

const createCourse = async (course: CourseUpdateView, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(course),
  });
  return handleJsonResponse(response, errorCallback);
};

const updateCourse = async (id: number, course: CourseUpdateView, errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(course),
  });
  return handleJsonResponse(response, errorCallback);
};

const deleteCourses = async (courseIds: number[], errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(`${URL}/delete`, {
    method: "DELETE",
    headers: getHeaders(),
    body: JSON.stringify(courseIds),
  });
  return handleJsonResponse(response, errorCallback);
};

const CourseService = {
  getAllCourses,
  getAllShortCourses,
  getCourseById,
  getCoursesByISPId,
  getCoursesForStudent,
  createCourse,
  updateCourse,
  deleteCourses,
};

export default CourseService;
