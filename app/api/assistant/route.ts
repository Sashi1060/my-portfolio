import { handleInfo } from "../../../lib/assistant/server.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  return handleInfo(request);
}
