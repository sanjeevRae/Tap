import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";

type CloudinarySignatureParams = {
  folder?: string;
  public_id?: string;
  tags?: string;
  context?: string;
};

export async function POST(req: NextRequest) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary media environment variables are not configured." },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const timestamp = Math.round(Date.now() / 1000);
  const params: CloudinarySignatureParams & { timestamp: number } = {
    timestamp,
  };

  if (typeof body.folder === "string") params.folder = body.folder;
  if (typeof body.public_id === "string") params.public_id = body.public_id;
  if (typeof body.tags === "string") params.tags = body.tags;
  if (typeof body.context === "string") params.context = body.context;

  const payload = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(`${payload}${apiSecret}`)
    .digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    params,
  });
}
