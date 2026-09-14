import { buildLlmsTxt } from "@/utils/llms";

export const dynamic = "force-static";

export async function GET() {
  const content = await buildLlmsTxt();
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
