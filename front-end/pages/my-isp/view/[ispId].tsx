import FixedBackButton from "@/components/buttons/FixedBackButton";
import CourseItemLayout from "@/components/courses/CourseItemLayout";
import CourseShortView from "@/components/courses/CourseShortView";
import ErrorDialog from "@/components/ErrorDialog";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import Loading from "@/components/Loading";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useIspByIdGetter } from "@/utils/hooks/useIspByIdGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next"; // Import the useTranslation hook
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Import the serverSideTranslations function

export default function ReviewISP() {
  const { t } = useTranslation(); // Initialize translation
  const router = useRouter();
  const { ispId } = router.query;
  const id = parseInt(ispId as string);

  const { errors, setErrors, handleError } = useErrorHandler();
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { isp } = useIspByIdGetter(id);

  if (!isp) {
    return <Loading />;
  }

  // Use translation for dynamic main section title
  const mainSectionTitle = t('reviewISP.mainSectionTitle', {
    startYear: isp.startYear,
    endYear: isp.startYear + 1,
  });

  const totalCourseCredits =
    isp.courses.reduce((acc, c) => acc + c.credits, 0) || 0;

  const isActive = Object.keys(errors).length === 0;

  return (
    <>
      <Head>
        <title>{t('reviewISP.title')}</title> {/* Use translation */}
      </Head>
      <ObjectsWithHeadingLayout
        objects={isp.courses}
        isActive={isActive}
        headingTitle={mainSectionTitle}
        flex="col"
        children={(course) => (
          <CourseItemLayout
            course={course}
            details={detailedCourses[course.id]}
            toggleCourseDetails={toggleCourseDetails}
            isActive={isActive}
          >
            <CourseShortView course={course} />
          </CourseItemLayout>
        )}
      />
      <section className="fixed bottom-8 right-8">
        <article>
          <p>{t('reviewISP.totalCredits', { 
            totalCourseCredits: totalCourseCredits, 
            totalCredits: isp.totalCredits 
          })}</p> {/* Use translation */}
        </article>
      </section>

      <FixedBackButton url={MY_ISP_URL} />

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
