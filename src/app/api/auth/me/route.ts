import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, findUserById, toSafeUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("bimbel_session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 200 });
  }

  const payload = verifySessionToken(token);
  if (!payload) {
    // Token invalid or expired
    const response = NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
    response.cookies.delete("bimbel_session");
    return response;
  }

  const user = await findUserById(payload.userId);
  if (!user) {
    const response = NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 }
    );
    response.cookies.delete("bimbel_session");
    return response;
  }

  return NextResponse.json({
    authenticated: true,
    user: toSafeUser(user),
  });
}
