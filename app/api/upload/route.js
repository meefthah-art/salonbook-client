import { NextResponse } from "next/server";

export async function POST(req) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) return NextResponse.json({ message: "Image upload is not set up on the server." }, { status: 500 });

  const form = await req.formData();
  const file = form.get("image");
  if (!file || typeof file === "string") return NextResponse.json({ message: "Please choose an image file." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ message: "Only image files are allowed." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ message: "Image must be smaller than 4 MB." }, { status: 400 });

  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.data?.url) return NextResponse.json({ message: "Image upload failed. Please try again." }, { status: 502 });

  return NextResponse.json({ url: data.data.url });
}
