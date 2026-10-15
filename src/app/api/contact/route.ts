import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/contact-form";

const maxRequestBytes = 10_000;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { code: "invalid_content_type", message: "Format permintaan tidak valid." },
      { status: 415 },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);

  if (declaredLength > maxRequestBytes) {
    return NextResponse.json(
      { code: "payload_too_large", message: "Pesan terlalu besar." },
      { status: 413 },
    );
  }

  const body = await request.text();

  if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
    return NextResponse.json(
      { code: "payload_too_large", message: "Pesan terlalu besar." },
      { status: 413 },
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { code: "invalid_json", message: "Format pesan tidak valid." },
      { status: 400 },
    );
  }

  if (
    typeof payload === "object" &&
    payload !== null &&
    "website" in payload &&
    typeof payload.website === "string" &&
    payload.website.trim() !== ""
  ) {
    return NextResponse.json(
      { code: "invalid_submission", message: "Permintaan tidak dapat diproses." },
      { status: 400 },
    );
  }

  const { values, errors } = validateContactForm(payload);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { code: "validation_failed", errors },
      { status: 400 },
    );
  }

  if (values.website !== "") {
    return NextResponse.json(
      { code: "invalid_submission", message: "Permintaan tidak dapat diproses." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      code: "delivery_not_configured",
      message:
        "Pesan belum dikirim. Layanan penerimaan pesan belum dikonfigurasi.",
    },
    { status: 503 },
  );
}
