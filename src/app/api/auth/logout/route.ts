import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Berhasil keluar dari akun." },
    { status: 200 }
  );

  response.cookies.delete("bimbel_session");

  return response;
}
