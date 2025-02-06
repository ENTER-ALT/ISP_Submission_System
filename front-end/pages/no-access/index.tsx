import LinkButton from "@/components/buttons/LinkButton";
import CenteredFitContentLayout from "@/components/layouts/CenteredFitContentLayout";
import { HOME_URL } from "@/utils/urls";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NoAccess() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("noAccess.title")}</title>
      </Head>
      <CenteredFitContentLayout>
        <section className="flex flex-col gap-4 items-center">
          <h2>{t("noAccess.mainSectionTitle")}</h2>
          <p>{t("noAccess.message")}</p>
          <div className="w-fit">
            <LinkButton text={t("noAccess.buttonText")} href={HOME_URL} />
          </div>
        </section>
      </CenteredFitContentLayout>
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
}
