import FixedBackButton from "@/components/buttons/FixedBackButton";
import SaveUndoButtons from "@/components/buttons/SaveUndoButtons";
import CourseSelectableItem from "@/components/courses/CourseSelectableItem";
import ErrorDialog from "@/components/ErrorDialog";
import ISPSubmitNotification from "@/components/isps/ISPSubmitNotification";
import ObjectsWithHeadingLayout from "@/components/layouts/ObjectsWithHeadingLayout";
import Loading from "@/components/Loading";
import IspService from "@/services/IspService";
import { CourseShort, ISPStatus } from "@/types";
import { useCoursesForStudentIspGetter } from "@/utils/hooks/useCoursesForStudentIspGetter";
import { useDetailedCoursesToggle } from "@/utils/hooks/useDetailedCoursesToggle";
import { useErrorHandler } from "@/utils/hooks/useErrorHandler";
import { useIspByIdGetter } from "@/utils/hooks/useIspByIdGetter";
import { MY_ISP_URL } from "@/utils/urls";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next"; // Import useTranslation hook
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; // Import serverSideTranslations function

export default function ComposeISP() {
  const { t } = useTranslation(); // Initialize translation
  const router = useRouter();
  const { ispId } = router.query;
  const id = parseInt(ispId as string);

  const { errors, setErrors, handleError } = useErrorHandler();
  const { detailedCourses, toggleCourseDetails } =
    useDetailedCoursesToggle(handleError);
  const { isp, setIsp } = useIspByIdGetter(id);
  const { courses } = useCoursesForStudentIspGetter(
    isp ? isp.student.id : -1,
    isp ? isp.id : -1
  );
  const [changes, setChanges] = useState<
    { course: CourseShort; selected: boolean }[]
  >([]);

  const selectedCourses = useMemo(() => {
    if (!isp || !isp.courses) {
      return {};
    }
    return (
      isp?.courses.reduce((acc, c) => {
        acc[c.id] = true;
        return acc;
      }, {} as { [key: number]: boolean }) || {}
    );
  }, [isp?.courses]);

  const totalCourseCredits = useMemo(() => {
    if (!isp?.courses) {
      return 0;
    }
    return isp?.courses.reduce((acc, c) => acc + c.credits, 0) || 0;
  }, [isp?.courses]);

  const isSelected = (courseId: number) => {
    return !!selectedCourses[courseId];
  };

  const calculateLowestCreditsUnselected = () => {
    if (!courses) {
      return 0;
    }
    const res = courses.reduce((acc, c) => {
      if (!isSelected(c.id)) {
        return Math.min(acc, c.credits);
      }
      return acc;
    }, Infinity);
    return res === Infinity ? 0 : res;
  };

  const lowestCreditsUnselected = useMemo(calculateLowestCreditsUnselected, [
    courses,
    selectedCourses,
  ]);

  const submittable = useMemo(() => {
    if (!isp) {
      return false;
    }
    return (
      (lowestCreditsUnselected === 0 ||
        totalCourseCredits + lowestCreditsUnselected > isp.totalCredits) &&
      totalCourseCredits <= isp.totalCredits
    );
  }, [totalCourseCredits, isp?.totalCredits, lowestCreditsUnselected]);

  if (!isp) {
    return <Loading />;
  }
  if (isp.status === ISPStatus.SUBMITTED) {
    return <ISPSubmitNotification id={isp.id} />;
  }

  // Use translation for dynamic main section title
  const mainSectionTitle = t('composeISP.mainSectionTitle', {
    startYear: isp.startYear,
    endYear: isp.startYear + 1,
  });

  const isActive = Object.keys(errors).length === 0;

  const updateISPByStudent = async (
    id: number,
    ispData: { status: ISPStatus; courses: number[] }
  ) => {
    const isp = await IspService.updateISPByStudent(
      id,
      ispData,
      handleError
    );
    return isp;
  };

  const toggleSelectCourse = async (course: CourseShort) => {
    let newCourses = [...isp.courses];
    const selected = isSelected(course.id);
    if (selected) {
      newCourses = newCourses.filter((c) => c.id !== course.id);
    } else {
      newCourses.push(course);
    }
    isp.courses = newCourses;
    setIsp(isp);
    registerChangeCourses(course, !selected);
  };

  const registerChangeCourses = async (
    course: CourseShort,
    selected: boolean
  ) => {
    setChanges([...changes, { course, selected }]);
  };

  const undoLastChange = async () => {
    const lastChange = changes.pop();
    if (lastChange) {
      toggleSelectCourse(lastChange.course);
    }
    setChanges([...changes]);
  };

  const handleSave = async () => {
    await updateISPByStudent(id, {
      status: isp.status,
      courses: isp.courses.map((c) => c.id),
    });
    setChanges([]);
  };

  const handleSubmit = async () => {
    if (!submittable || isp.status === ISPStatus.SUBMITTED) {
      return;
    }
    isp.status = ISPStatus.SUBMITTED;
    setIsp(isp);
    await handleSave();
  };

  return (
    <>
      <Head>
        <title>{t('composeISP.title')}</title> {/* Use translation */}
      </Head>
      <ObjectsWithHeadingLayout
        objects={courses}
        isActive={isActive}
        headingTitle={mainSectionTitle}
        flex="col"
        children={(course) => (
          <CourseSelectableItem
            course={course}
            details={detailedCourses[course.id]}
            selected={isSelected(course.id)}
            toggleSelectCourse={() => toggleSelectCourse(course)}
            toggleCourseDetails={toggleCourseDetails}
            isActive={isActive}
          />
        )}
      />
      <section className="fixed bottom-6 right-8 flex flex-row gap-2">
        {changes.length > 0 && (
          <SaveUndoButtons onSave={handleSave} onUndo={undoLastChange} />
        )}
        <section className="flex flex-col items-center gap-2">
          <article className={`${submittable ? "" : "text-red-800"}`}>
            <p>{t('composeISP.totalCredits', { 
              totalCourseCredits: totalCourseCredits, 
              totalCredits: isp.totalCredits 
            })}</p> {/* Use translation */}
          </article>
          <button
            className={`p-3 rounded shadow-regular ${
              submittable ? "bg-success hover:shadow-safe" : "bg-gray-500"
            }`}
            onClick={handleSubmit}
            disabled={!submittable}
          >
            {t('composeISP.submitButton')} {/* Use translation */}
          </button>
        </section>
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
