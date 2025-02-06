import { BACKEND_APP_URL } from "@/utils/urls";
import { ErrorState } from "@/types/errorState";
import { getHeaders } from "@/utils/getHeaders";

const URL = BACKEND_APP_URL + "/privileges";

const handleResponse = async (response: Response, errorCallback?: (error: ErrorState) => void) => {
  const data = await response.json();
  if (!response.ok) {
    if (errorCallback) {
      errorCallback(data);
    }
  }
  return data;
};

const getAllPrivileges = async (errorCallback?: (error: ErrorState) => void) => {
  const response = await fetch(URL, 
    {
      method: "GET",
      headers: getHeaders(),
    }
  );
  return handleResponse(response, errorCallback);
}

const PrivilegeService = {
  getAllPrivileges,
};

export default PrivilegeService;
