import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity webhook -> instant cache invalidation, so publishing an article
// shows up on the site immediately instead of waiting for the next deploy.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    revalidateTag("article", "max");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new NextResponse(err instanceof Error ? err.message : "Unknown error", { status: 500 });
  }
}
