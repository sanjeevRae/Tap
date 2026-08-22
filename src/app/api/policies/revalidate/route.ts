import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

const VALID = new Set(["privacy-policy", "terms-and-conditions", "refund-policy"]);

// Called by the admin editor right after publish/unpublish so the exact
// public page shows fresh content immediately (per-slug, not all pages).
export async function POST(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || "";
  if (!VALID.has(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  revalidatePath(`/${slug}`);
  return NextResponse.json({ revalidated: true, slug });
}
