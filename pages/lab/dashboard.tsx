import React, { useContext, useEffect, useState } from "react";

import Layout from "../../components/layout";
import PageProgress from "../../components/page-progress";
import { AppStateContext } from "../../components/app-context";
import { Theme } from "../../components/types";

export default function Dashboard() {
  const [progress, setProgress] = useState(1);
  const [progressCallback, setProgressCallback] = useState(1);

  const appState = useContext(AppStateContext);

  const url = `https://sls.console.aliyun.com/lognext/share/project/wycode/dashboard/dashboard-1727265711687-159284?hideTopbar=true&theme=${appState.theme === Theme.light ? 'light' : 'dark'}&sls_ticket=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbkV4cCI6LTEsInR5cGUiOiJzaGFyZS1kYXNoYm9hcmQiLCJleHAiOjQxMDI0MTU5OTksIm5vbmNlIjoxNzI3MjgzNTA5NDM5LCJpYXQiOjE3MjcyODM1MDksInRpY2tldElkIjoiNmM4NTRhOTQtZWY2OS00NjcxLTkwZGYtNjgxNTZlMjM0N2NkIn0.sNcmhAafy53NpnhHQaSupdouj1zMtys4Y2l0X_ZTVqc`

  const onLoad = () => {
    setProgress(90);
  };

  return (
    <Layout>
      <PageProgress
        initialProgress={progress}
        onProgress={setProgressCallback}
      />
      <iframe
        className={`h-content w-full ${progressCallback < 100 ? "hidden" : ""
          }`}
        src={url}
        onLoad={onLoad}
      />
    </Layout>
  );
}
