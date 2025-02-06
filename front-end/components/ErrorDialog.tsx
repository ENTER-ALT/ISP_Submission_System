import { ErrorState } from "@/types/errorState";
import React from "react";
// You should ensure that errors are not null and more than 0 before rendering the ErrorDialog component.
type ErrorDialogProps = {
  errors: ErrorState;
  setErrors: (errors: ErrorState) => void;
};

const ErrorDialog = React.memo(({ errors, setErrors }: ErrorDialogProps) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-gray-800 bg-opacity-90 p-4 rounded-lg min-w-96">
          <h2 className="text-2xl mb-4 text-center">Error</h2>
          {Object.entries(errors).map(([key, value]) => (
            <p key={key}>{value}</p>
          ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setErrors({})}
              className="bg-primary px-4 py-2 rounded shadow-regular hover:shadow-success"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

export default ErrorDialog;
