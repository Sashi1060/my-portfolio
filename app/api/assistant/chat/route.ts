import { handleChat } from "../../../../lib/assistant/server.ts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return handleChat(request);
}
