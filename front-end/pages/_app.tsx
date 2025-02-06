import AuthProvider from "@/components/AuthProvider";
import RouteProtectionLayout from "@/components/layouts/RouteProtectionLayout";
import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import "../styles/globals.css";
import { appWithTranslation } from 'next-i18next';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function App({ Component, pageProps }: AppProps) {

  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Layout translations={t}>
        <RouteProtectionLayout>
          <Component {...pageProps} />
        </RouteProtectionLayout>
      </Layout>
    </AuthProvider>
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

export default appWithTranslation(App);
