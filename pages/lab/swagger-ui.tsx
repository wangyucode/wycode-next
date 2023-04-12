import React from "react";

import Layout from "../../components/layout";

export default function SwaggerUI() {
  return (
    <Layout>
      <iframe className="h-content w-full" src="https://wycode.cn/swagger-ui"/>
    </Layout>
  );
}
