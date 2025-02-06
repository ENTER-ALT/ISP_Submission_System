import React from "react";

interface FormLayoutProps {
  formName: string;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  children: React.ReactNode;
}

const FormLayout = React.memo(
  ({ formName, onSubmit, children }: FormLayoutProps) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 mt-20">
        <div className="bg-primary pl-4 rounded-lg min-w-160 w-2/5 h-fit shadow-regular mb-10 relative">
          <form
            role="form"
            onSubmit={onSubmit}
            className="space-y-4 overflow-y-auto max-h-85%h h-auto pr-4 pb-6"
          >
            <h2 className="text-2xl mb-4 text-center mt-4">{formName}</h2>
            {children}
          </form>
        </div>
      </div>
    );
  }
);

export default FormLayout;
