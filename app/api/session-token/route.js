import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import { auth } from "@/lib/auth";

const API = process.env.API_URL || "http://localhost:5000";

const cookieSettings = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

export async function POST() {
  const session = await auth.api.getSession({ headers: headers() });
  if (!session) return NextResponse.json({ message: "Not signed in" }, { status: 401 });

  // keep the old token if it is still good for this user
  const old = cookies().get("token")?.value;
  if (old) {
    try {
      const payload = JSON.parse(Buffer.from(old.split(".")[1], "base64url").toString());
      if (payload.email === session.user.email && payload.exp * 1000 > Date.now() + 60 * 60 * 1000) {
        return NextResponse.json({ success: true });
      }
    } catch (err) {}
  }

  const r = await fetch(`${API}/api/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-internal-secret": process.env.INTERNAL_SECRET || "" },
    body: JSON.stringify({ email: session.user.email }),
  });
  if (!r.ok) return NextResponse.json({ message: "Could not reach the API" }, { status: 502 });

  const { token } = await r.json();
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, { ...cookieSettings(), maxAge: 7 * 24 * 60 * 60 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", "", { ...cookieSettings(), maxAge: 0 });
  return res;
}
