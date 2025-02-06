import { LoginData, SessionData } from "@/types/auth";
import { ErrorState } from "@/types/errorState";
import { getHeaders } from "@/utils/getHeaders";
import { BACKEND_APP_URL } from "@/utils/urls";

const URL = BACKEND_APP_URL + "/users";

const handleResponse = async (
  response: Response,
  errorCallback?: (error: ErrorState) => void
) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const loginUser = async (
  user: LoginData,
  errorCallback?: (error: ErrorState) => void
): Promise<{ data: SessionData; token: string }> => {
  let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(user),
  });
  return handleResponse(res, errorCallback);
};

const getUserByEmail = async (
  email: string,
  errorCallback?: (error: ErrorState) => void
) => {
  const response = await fetch(`${URL}/${email}`, {
    method: "GET",
    headers: getHeaders(),
  });
  return handleResponse(response, errorCallback);
};

const UserService = {
  getUserByEmail,
  loginUser,
};

export default UserService;
