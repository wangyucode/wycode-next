import React, { useContext, useEffect, useState } from "react";

import Layout from "../../components/layout";
import PageProgress from "../../components/page-progress";
import { AppStateContext } from "../../components/app-context";
import { Theme } from "../../components/types";

export default function Dashboard() {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(1);
  const [progressCallback, setProgressCallback] = useState(1);

  const appState = useContext(AppStateContext);

  useEffect(() => {
    fetch("https://wycode.cn/api/v1/analysis/dashboard")
      .then((res) => res.json())
      .then((res) => {
        console.log("dashboard->", res);
        if (res.success) {
          setProgress(60);
          const url = setThemeForUrl(res.payload);
          setUrl(url);
        }
      });
  }, [appState]);

  const setThemeForUrl = (urlString: string) => {
    const url = new URL(urlString);
    const destination = new URL(url.searchParams.get("Destination"));
    if (appState.theme === Theme.light) {
      destination.searchParams.delete("theme");
      destination.searchParams.delete("sls_iframe");
    } else {
      destination.searchParams.set("theme", "dark");
      destination.searchParams.set("sls_iframe", "true");
    }
    url.searchParams.set("Destination", destination.toString());
    return url.toString();
  };

  const onLoad = () => {
    setProgress(90);
  };

  return (
    <Layout>
      <PageProgress
        initialProgress={progress}
        onProgress={setProgressCallback}
      />
      {url && (
        <iframe
          className={`h-content w-full ${
            progressCallback < 100 ? "hidden" : ""
          }`}
          src={url}
          onLoad={onLoad}
        />
      )}
    </Layout>
  );
}
