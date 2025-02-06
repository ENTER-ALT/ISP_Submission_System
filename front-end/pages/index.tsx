import { useTranslation } from "next-i18next";
import Head from "next/head";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TabsOverviewSection from "@/components/home/TabsOverviewSection";
import { tabsEn, tabsNl } from "@/types/tab";

export default function Home() {
  const { t } = useTranslation();

  const TITLE = t("home.title");

  const getTabs = () => {
    switch (t("language")) {
      case "en":
        return tabsEn;
      case "nl":
        return tabsNl;
      default:
        return tabsEn;
    }
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <TabsOverviewSection tabs={getTabs()} />
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