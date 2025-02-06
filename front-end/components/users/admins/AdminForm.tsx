import React, { useMemo } from "react";
import FormButtons from "../../../components/forms/FormButtons";
import FormInput from "../../../components/forms/FormInput";
import FormLayout from "../../../components/forms/FormLayout";
import FormObjectsInput from "../../../components/forms/FormObjectsInput";
import { Administrative, Privilege } from "../../../types";
import { ErrorState } from "../../../types/errorState";
import { getDefaultPrivilege } from "../../../utils/defaultTypes";
import { mapPrivilegeToString } from "../../../utils/mappers";
import { validateAdmin } from "../../../utils/validators";

interface AdminFormProps {
  formData: Administrative;
  setFormData: (admin: Administrative) => void;
  formErrors: ErrorState;
  setFormErrors: (errors: ErrorState) => void;
  formName: string;
  getPossiblePrivileges: (admin: Administrative) => Privilege[];
  onSubmit: (admin: Administrative) => Promise<void>;
  onCancel: () => void;
  onDelete?: (id: number) => Promise<void>;
}

const AdminForm = React.memo(
  ({
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    formName,
    getPossiblePrivileges,
    onSubmit,
    onCancel,
    onDelete,
  }: AdminFormProps) => {
    const availablePrivileges = useMemo(
      () => (formData && getPossiblePrivileges(formData)) || [],
      [formData?.privileges]
    );
    const canAddPrivilege = useMemo(
      () =>
        availablePrivileges &&
        availablePrivileges.length > 0 &&
        !availablePrivileges.some((p) => p.id === -1),
      [availablePrivileges, formData?.privileges]
    );

    if (!formData) {
      return null;
    }

    const handleDelete = async () => {
      if (formData && onDelete) {
        await onDelete(formData.id);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      let { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handlePrivilegeChange = (
      index: number,
      availablePrivilegeIndex: number
    ) => {
      const newPrivileges = [...formData.privileges];
      newPrivileges[index] = availablePrivileges[availablePrivilegeIndex];
      setFormData({
        ...formData,
        privileges: newPrivileges,
      });
    };

    const addEmptyPrivilege = () => {
      const defaultPrivilege = getDefaultPrivilege();
      setFormData({
        ...formData,
        privileges: [...formData.privileges, defaultPrivilege],
      });
    };

    const removePrivilege = (index: number) => {
      const newPrivileges = formData.privileges.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        privileges: newPrivileges,
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateAdmin(formData, setFormErrors)) {
        return;
      }
      await onSubmit(formData);
    };

    return (
      formData && (
        <FormLayout formName={formName} onSubmit={handleSubmit}>
          <FormInput
            name="name"
            labelText="Name"
            inputType="text"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />
          <FormInput
            name="email"
            labelText="Email"
            inputType="email"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />
          <FormInput
            name="password"
            labelText="Password"
            inputType="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            required={false}
          />
          <FormObjectsInput
            objects={formData.privileges.map(mapPrivilegeToString)}
            name="privileges"
            labelText="Privileges"
            onAdd={addEmptyPrivilege}
            onRemove={removePrivilege}
            onChange={handlePrivilegeChange}
            canAddNewObject={canAddPrivilege}
            availableObjects={availablePrivileges.map(mapPrivilegeToString)}
            error={formErrors.privileges}
          />
          <FormButtons onCancel={onCancel} onDelete={handleDelete} />
        </FormLayout>
      )
    );
  }
);

export default AdminForm;
