import ErrorDialog from "@/components/ErrorDialog";
import Loading from "@/components/Loading";
import ISPLinkItem from "@/components/isps/ISPLinkItem";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useISPShortByStudentGetter } from "@/utils/hooks/useISPShortByStudentGetter";
import { EDIT_URL, MY_ISP_URL, VIEW_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next"; // Import useTranslation hook
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Import serverSideTranslations function

export default function StudentISP() {
  const { t } = useTranslation(); // Initialize translation
  const router = useRouter();
  const { studentId } = router.query;
  const id = parseInt(studentId as string);

  const { errors, setErrors } = useErrorHandler();
  const { isps } = useISPShortByStudentGetter(id);

  const isActive = Object.keys(errors).length === 0;

  if (isps === null) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>{t('studentISP.title')}</title>
      </Head>
      <ObjectsWithHeadingLayout
        objects={isps}
        isActive={isActive}
        headingTitle={t('studentISP.mainSectionTitle')} 
        flex="col"
        children={(isp) => (
          <ISPLinkItem
            isp={isp}
            editHref={MY_ISP_URL + EDIT_URL}
            viewHref={MY_ISP_URL + VIEW_URL}
            isActive={isActive}
          />
        )}
      />
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
