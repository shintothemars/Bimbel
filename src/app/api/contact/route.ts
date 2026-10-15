import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/contact-form";
import { programs } from "@/lib/programs";

const maxRequestBytes = 10_000;

async function readBodyWithinLimit(request: Request): Promise<string | null> {
  const reader = request.body?.getReader();

  if (!reader) {
    return "";
  }

  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    byteLength += value.byteLength;

    if (byteLength > maxRequestBytes) {
      await reader.cancel();
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(byteLength);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { code: "invalid_content_type", message: "Format permintaan tidak valid." },
      { status: 415 },
    );
  }

  const contentLength = request.headers.get("content-length");
  const declaredLength = contentLength ? Number(contentLength) : 0;

  if (Number.isFinite(declaredLength) && declaredLength > maxRequestBytes) {
    return NextResponse.json(
      { code: "payload_too_large", message: "Pesan terlalu besar." },
      { status: 413 },
    );
  }

  const body = await readBodyWithinLimit(request);

  if (body === null) {
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

  if (
    values.program !== "" &&
    !programs.some((program) => program.slug === values.program)
  ) {
    return NextResponse.json(
      {
        code: "validation_failed",
        errors: { program: "Pilihan program tidak valid." },
      },
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
