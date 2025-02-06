import ErrorDialog from "@/components/ErrorDialog";
import LowOpacityLayout from "@/components/layouts/LowOpacityLayout";
import MapObjectsLayout from "@/components/layouts/MapObjectsLayout";
import StudentLinkItem from "@/components/users/students/StudentLinkItem";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useStudentsShortGetter } from "@/utils/hooks/useStudentsShortGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import { useTranslation } from "next-i18next"; // Import useTranslation hook
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Import serverSideTranslations function

export default function MyISP() {
  const { t } = useTranslation(); // Initialize translation
  const { errors, setErrors, handleError } = useErrorHandler();
  const { students } = useStudentsShortGetter(handleError);

  const isActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{t('myISP.title')}</title> {/* Use translation */}
      </Head>
      <LowOpacityLayout isActive={!isActive}>
        <h1 className="text-center mt-5">{t('myISP.mainSectionTitle')}</h1> {/* Use translation */}
        <MapObjectsLayout
          objects={students}
          flex="row"
          children={(student) => (
            <StudentLinkItem
              student={student}
              href={`${MY_ISP_URL}/${student.id}`}
              isActive={isActive}
            />
          )}
        />
      </LowOpacityLayout>
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
