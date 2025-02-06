import React from "react";
import CenteredFitContentLayout from "./layouts/CenteredFitContentLayout";

const Loading = React.memo(() => {
  return (
    <>
      <CenteredFitContentLayout>
        <div>Loading...</div>
      </CenteredFitContentLayout>
    </>
  );
});

export default Loading;
