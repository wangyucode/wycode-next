import React, { useEffect, useState } from "react";

import Layout from "../components/layout";
import PageProgress from "../components/page-progress";

export default function Lab() {
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(1);
  const [progressCallback, setProgressCallback] = useState(1);

  useEffect(() => {
    fetch("https://wycode.cn/api/v1/analysis/dashboard")
      .then((res) => res.json())
      .then((res) => {
        console.log("dashboard->", res);
        if (res.success) {
          setProgress(60);
          setUrl(res.payload);
        }
      });
  }, []);

  const onLoad = () => {
    setProgress(90);
  };

  return (
    <Layout>
      <PageProgress initialProgress={progress} onProgress={setProgressCallback} />
      {url && (
        <iframe
          className={`h-content w-full ${progressCallback < 100 ? "hidden" : ""}`}
          src={url}
          onLoad={onLoad}
        />
      )}
    </Layout>
  );
}
