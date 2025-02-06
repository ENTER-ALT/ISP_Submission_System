import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminForm from "../components/users/admins/AdminForm";
import { Administrative, Privilege, PrivilegeType } from "../types";
import { ErrorState } from "../types/errorState";
import { UserType } from "../types/auth";

describe("AdminForm", () => {
  const mockSetFormData = jest.fn();
  const mockSetFormErrors = jest.fn();
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnDelete = jest.fn();
  const mockGetPossiblePrivileges = jest.fn();

  const mockFormData: Administrative = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "",
    userType: UserType.ADMINISTRATIVE,
    privileges: [{ id: 1, name: PrivilegeType.CREATE_ADMINISTRATIVE, description: "Create administrative" }],
  };

  const mockFormErrors: ErrorState = {
    name: "",
    email: "",
    privileges: "",
  };

  const mockAvailablePrivileges: Privilege[] = [
    { id: 2, name: PrivilegeType.CREATE_ADMINISTRATIVE, description: "Create administrative" },
    { id: 3, name: PrivilegeType.CREATE_STUDENT, description: "Create student" },
  ];

  beforeEach(() => {
    mockSetFormData.mockClear();
    mockSetFormErrors.mockClear();
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
    mockOnDelete.mockClear();
    mockGetPossiblePrivileges.mockReturnValue(mockAvailablePrivileges);
  });

  it("renders the form inputs with initial data", () => {
    render(
      <AdminForm
        formData={mockFormData}
        setFormData={mockSetFormData}
        formErrors={mockFormErrors}
        setFormErrors={mockSetFormErrors}
        formName="Test Form"
        getPossiblePrivileges={mockGetPossiblePrivileges}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const input = screen.getByLabelText("Name") as HTMLInputElement;
    expect(input.value).toBe('John Doe');
    const privilegesText = screen.queryByText("Privileges");
    expect(privilegesText).not.toBeNull();
  });

  it("calls setFormData when inputs change", () => {
    render(
      <AdminForm
        formData={mockFormData}
        setFormData={mockSetFormData}
        formErrors={mockFormErrors}
        setFormErrors={mockSetFormErrors}
        formName="Test Form"
        getPossiblePrivileges={mockGetPossiblePrivileges}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });

    expect(mockSetFormData).toHaveBeenCalledWith({
      ...mockFormData,
      name: "Jane Doe",
    });
  });

  it("handles privilege addition and removal", () => {
    render(
      <AdminForm
        formData={mockFormData}
        setFormData={mockSetFormData}
        formErrors={mockFormErrors}
        setFormErrors={mockSetFormErrors}
        formName="Test Form"
        getPossiblePrivileges={mockGetPossiblePrivileges}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText("+")); // Assuming there's a button labeled "Add" for privileges
    expect(mockSetFormData).toHaveBeenCalled();

    fireEvent.click(screen.getByText("X")); // Assuming there's a button labeled "Remove" for privileges
    expect(mockSetFormData).toHaveBeenCalled();
  });

  it("calls onCancel when the cancel button is clicked", () => {
    render(
      <AdminForm
        formData={mockFormData}
        setFormData={mockSetFormData}
        formErrors={mockFormErrors}
        setFormErrors={mockSetFormErrors}
        formName="Test Form"
        getPossiblePrivileges={mockGetPossiblePrivileges}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("calls onDelete when the delete button is clicked", async () => {
    render(
      <AdminForm
        formData={mockFormData}
        setFormData={mockSetFormData}
        formErrors={mockFormErrors}
        setFormErrors={mockSetFormErrors}
        formName="Test Form"
        getPossiblePrivileges={mockGetPossiblePrivileges}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByText("Delete")); // Assuming there's a button labeled "Delete"
    expect(mockOnDelete).toHaveBeenCalledWith(mockFormData.id);
  });
});
