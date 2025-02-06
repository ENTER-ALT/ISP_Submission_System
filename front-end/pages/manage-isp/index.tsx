import FixedCreateButton from "@/components/buttons/FixedCreateButton";
import ErrorDialog from "@/components/ErrorDialog";
import ISPForm from "@/components/isps/isp_form/ISPForm";
import ISPEditableItem from "@/components/isps/ISPEditableItem";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import ISPService from "@/services/IspService";
import { CourseShort, ISP, PrivilegeType } from "@/types";
import { ErrorState } from "@/types/errorState";
import { getDefaultISP } from "@/utils/defaultTypes";
import { useCoursesShortGetter } from "@/utils/hooks/useCoursesShortGetter";
import { useCrudISP } from "@/utils/hooks/useCrudISP";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { usePrivilegeVerifier } from "@/utils/hooks/usePrivilegeVerifier";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";

const TITLE = "Manage ISP";
const MAIN_SECTION_TITLE = "Manage ISP";

export default function ManageISP() {
  const [updatingISP, setUpdatingISP] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISP | null>(null);
  const [formErrors, setFormErrors] = useState<ErrorState>({});
  const { errors, setErrors, handleError } = useErrorHandler();
  const { isps, createISP, updateISP, deleteISP } = useCrudISP(handleError);
  const { courses } = useCoursesShortGetter(handleError);
  const { verifyPrivilege } = usePrivilegeVerifier(handleError);

  const handleUpdate = async (id: number) => {
    const updatingIsp: ISP | null = await ISPService.getISPById(
      id,
      handleError
    );
    setFormData(updatingIsp);
    setUpdatingISP(true);
    setFormErrors({});
  };

  const handleCreate = () => {
    const isp: ISP = getDefaultISP();
    setFormData(isp);
    setUpdatingISP(false);
    setFormErrors({});
  };

  const handleSubmit = async (isp: ISP) => {
    updatingISP ? await update(isp) : await create(isp);
  };

  const update = async (isp: ISP) => {
    const verified = await verifyPrivilege(PrivilegeType.UPDATE_ISP);
    if (!verified) {
      return;
    }
    await updateISP(isp);
    setFormData(null);
  };

  const create = async (isp: ISP) => {
    const verified = await verifyPrivilege(PrivilegeType.CREATE_ISP);
    if (!verified) {
      return;
    }
    await createISP(isp);
    setFormData(null);
  };

  const handleCancel = () => {
    setFormData(null);
  };

  const handleDelete = async (id: number) => {
    const verified = await verifyPrivilege(PrivilegeType.DELETE_ISP);
    if (!verified) {
      return;
    }
    await deleteISP(id);
    setFormData(null);
  };

  const getPossibleCourses = (isp: ISP): CourseShort[] => {
    if (!isp || !courses) {
      return [];
    }
    if (!isp.courses) {
      return courses;
    }
    return courses.filter(
      (course) => !isp.courses.find((c) => c.id === course.id)
    );
  };

  const manageTabisActive =
    formData === null || Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={isps}
        headingTitle={MAIN_SECTION_TITLE}
        flex="col"
        isActive={manageTabisActive}
        children={(isp) => (
          <ISPEditableItem
            isp={isp}
            redactorISP={handleUpdate}
            isActive={manageTabisActive}
          />
        )}
      />
      <FixedCreateButton onClick={handleCreate} isActive={manageTabisActive} />
      {formData && (
        <ISPForm
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          formName={updatingISP ? "Update ISP" : "Create ISP"}
          getPossibleCourses={getPossibleCourses}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          onDelete={updatingISP ? handleDelete : undefined}
        />
      )}
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
