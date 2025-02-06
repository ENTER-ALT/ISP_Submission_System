import LinkButton from "@/components/buttons/LinkButton";
import CenteredFitContentLayout from "@/components/layouts/CenteredFitContentLayout";
import { LOGIN_URL } from "@/utils/urls";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function LoginRequired() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("login_required.title")}</title>
      </Head>
      <CenteredFitContentLayout>
        <section className="flex flex-col gap-4 items-center">
          <h2>{t("login_required.main_section_title")}</h2>
          <p>{t("login_required.login_message")}</p>
          <div className="w-fit">
            <LinkButton text={t("login_required.login_button")} href={LOGIN_URL} />
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
};
