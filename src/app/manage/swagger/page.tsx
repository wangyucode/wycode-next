import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export default function SwaggerPage() {
    return (
        <div className="flex-1 card container shadow mx-auto md:my-4 bg-base-100">
            <SwaggerUI url="https://wycode.cn/api/v1/openapi.yml" />
        </div>
    );
}