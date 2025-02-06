import Head from "next/head";
import React from "react";

const DefaultHead = React.memo(() => {
  return (
    <>
      <Head>
        <meta name="description" content="ISP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
});

export default DefaultHead;
