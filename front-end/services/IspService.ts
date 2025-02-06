import { ErrorState } from "@/types/errorState";
import { BACKEND_APP_URL } from "@/utils/urls";
import {
  CreateISPView,
  UpdateISPView,
  ISPShort,
  ISPStatus,
} from "../types/index";
import { getHeaders } from "@/utils/getHeaders";

// URL to backend ISP endpoint
const URL = BACKEND_APP_URL + "/isps";

// Fetch all ISPs in short form
const getAllISPShort = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, errorCallback);
};

// Fetch all ISPs by student ID in short form
const getISPShortByStudentId = async (
  studentId: number,
  errorCallback?: (error: ErrorState) => void
): Promise<ISPShort[] | null> => {
  const response = await fetch(`${URL}/for-student/${studentId}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, errorCallback);
};

// Fetch ISP by ID
const getISPById = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, errorCallback);
};

// Create new ISP
const createISP = async (
  ispData: CreateISPView,
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(ispData),
  });
  return handleResponse(response, errorCallback);
};

// Update ISP
const updateISP = async (
  id: number,
  ispData: UpdateISPView,
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(ispData),
  });
  return handleResponse(response, errorCallback);
};

// Update ISP
const updateISPByStudent = async (
  id: number,
  ispData: { status: ISPStatus; courses: number[] },
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(`${URL}/by-student/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(ispData),
  });
  return handleResponse(response, errorCallback);
};

// Delete ISP by ID
const deleteISP = async (
  id: number,
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response, errorCallback);
};

// Helper function to handle responses
const handleResponse = async (
  response: Response,
  errorCallback?: (error: ErrorState) => void
) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
    return null;
  }
  return data;
};

export default {
  getAllISPShort,
  getISPShortByStudentId,
  getISPById,
  createISP,
  updateISP,
  updateISPByStudent,
  deleteISP,
};
