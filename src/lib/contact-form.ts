export const contactTopics = [
  "Informasi Program",
  "Jadwal Belajar",
  "Biaya Bimbel",
  "Pendaftaran",
  "Kerja Sama",
  "Pertanyaan Lainnya",
] as const;

export type ContactTopic = (typeof contactTopics)[number];

export type ContactFormValues = {
  name: string;
  email: string;
  whatsapp: string;
  topic: string;
  program: string;
  message: string;
  consent: boolean;
  website: string;
};

export type ContactFormErrors = Partial<
  Record<"name" | "email" | "whatsapp" | "topic" | "program" | "message" | "consent", string>
>;

export const emptyContactForm: ContactFormValues = {
  name: "",
  email: "",
  whatsapp: "",
  topic: "",
  program: "",
  message: "",
  consent: false,
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const whatsappPattern = /^\+?[\d\s().-]+$/;

export function validateContactForm(
  input: unknown,
): { values: ContactFormValues; errors: ContactFormErrors } {
  const source: Record<string, unknown> = {};

  if (typeof input === "object" && input !== null) {
    for (const [key, value] of Object.entries(input)) {
      source[key] = value;
    }
  }
  const values: ContactFormValues = {
    name: typeof source.name === "string" ? source.name.trim() : "",
    email: typeof source.email === "string" ? source.email.trim() : "",
    whatsapp: typeof source.whatsapp === "string" ? source.whatsapp.trim() : "",
    topic: typeof source.topic === "string" ? source.topic.trim() : "",
    program: typeof source.program === "string" ? source.program.trim() : "",
    message: typeof source.message === "string" ? source.message.trim() : "",
    consent: source.consent === true,
    website: typeof source.website === "string" ? source.website.trim() : "",
  };
  const errors: ContactFormErrors = {};

  if (values.name.length < 2 || values.name.length > 100) {
    errors.name = "Nama harus berisi 2 hingga 100 karakter.";
  }

  if (values.email.length > 254 || !emailPattern.test(values.email)) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (
    values.whatsapp.length > 30 ||
    (values.whatsapp !== "" &&
      (!whatsappPattern.test(values.whatsapp) ||
        values.whatsapp.replace(/\D/g, "").length < 8 ||
        values.whatsapp.replace(/\D/g, "").length > 15))
  ) {
    errors.whatsapp = "Masukkan nomor WhatsApp yang valid atau kosongkan.";
  }

  if (!contactTopics.some((topic) => topic === values.topic)) {
    errors.topic = "Pilih topik pertanyaan.";
  }

  if (values.program.length > 120) {
    errors.program = "Pilihan program tidak valid.";
  }

  if (values.message.length < 10 || values.message.length > 2000) {
    errors.message = "Pesan harus berisi 10 hingga 2.000 karakter.";
  }

  if (!values.consent) {
    errors.consent = "Persetujuan diperlukan agar kami dapat menanggapi pesan.";
  }

  return { values, errors };
}
