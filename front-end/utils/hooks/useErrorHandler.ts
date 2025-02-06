import { ErrorState } from "@/types/errorState";
import { useState } from "react";

export const useErrorHandler = () => {
const [errors, setErrors] = useState<ErrorState>({});

  const handleError = (error: {}) => {
    const newErrors: ErrorState = {};
    if (error) {
      Object.entries(error).forEach(([key, value]) => {
        newErrors[key] = value as string;
      });
    }
    setErrors(newErrors);
  };

  return { errors, setErrors, handleError };
};
