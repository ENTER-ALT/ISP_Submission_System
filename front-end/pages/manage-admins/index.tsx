import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import AdminForm from "@/components/users/admins/AdminForm";
import UserEditableItem from "@/components/users/UserEditableItem";
import AdministrativeService from "@/services/AdministrativeService";
import { Administrative, Privilege, PrivilegeType } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultAdmin } from "@/utils/defaultTypes";
import { useCrudAdmin } from "@/utils/hooks/useCrudAdmin";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeGetter } from "@/utils/hooks/usePrivilegeGetter";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage Admins";
const MAIN_SECTION_TITLE = "Manage admins";

export default function ManageAdmins() {
  const [updatingAdmin, setUpdatingAdmin] = useState<boolean>(false);
  const [formData, setFormData] = useState<Administrative | null>(null);
  const [formRrrors, setFormErrors] = useState<ErrorState>({});
  const { errors, setErrors, handleError } = useErrorHandler();
  const { admins, updateAdmin, createAdmin, deleteAdmin } =
    useCrudAdmin(handleError);
  const { privileges } = usePrivilegeGetter(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleUpdate = async (id: number) => {
    const admin: Administrative | undefined =
      await AdministrativeService.getAdministrativeById(id, handleError);
    if (admin) {
      setUpdatingAdmin(true);
      setFormData({...admin, password: ""});
      setFormErrors({});
    }
  };

  const handleCreate = () => {
    const admin: Administrative = getDefaultAdmin();
    setFormData({...admin, password: ""});
    setFormErrors({});
    setUpdatingAdmin(false);
  };

  const handleSubmit = async (admin: Administrative) => {
    updatingAdmin ? await update(admin) : await create(admin);
  };

  const update = async (admin: Administrative) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await updateAdmin(admin);
    setFormData(null);
  };

  const create = async (admin: Administrative) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await createAdmin(admin);
    setFormData(null);
  };

  const handleCancel = () => {
    setFormData(null);
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_ADMINISTRATIVE);
    if (!verified) {
      return;
    }
    await deleteAdmin(id);
    setFormData(null);
  };

  const getPossiblePrivileges = (admin: Administrative): Privilege[] => {
    const privilegesIds = new Set(
      admin.privileges.map((privilege) => privilege.id)
    );

    return privileges.filter((privilege) => !privilegesIds.has(privilege.id));
  };

  const manageTabIsActive =
    formData === null && Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={admins}
        isActive={manageTabIsActive}
        flex="row"
        headingTitle={MAIN_SECTION_TITLE}
        children={(admin: Administrative) => (
          <UserEditableItem
            student={admin}
            redactorStudent={handleUpdate}
            isActive={manageTabIsActive}
          />
        )}
      />
      {formData && (
        <AdminForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formRrrors}
          setFormErrors={setFormErrors}
          formName={updatingAdmin ? "Update admin" : "Create admin"}
          getPossiblePrivileges={getPossiblePrivileges}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
      <FixedCreateButton onClick={handleCreate} isActive={manageTabIsActive} />
      {errors && Object.keys(errors).length > 0 && (
        <ErrorDialog errors={errors} setErrors={setErrors} />
      )}
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};
