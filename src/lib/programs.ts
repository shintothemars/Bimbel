export const programCategories = [
  "SD",
  "SMP",
  "SMA",
  "UTBK/SNBT",
  "Privat",
] as const;

export type ProgramCategory = (typeof programCategories)[number];
export type EducationLevel = "SD" | "SMP" | "SMA" | "UTBK/SNBT";
export type LearningFormat = "Online" | "Offline" | "Hybrid";
export type ProgramIconName =
  | "book"
  | "atom"
  | "graduation"
  | "target"
  | "calculator"
  | "languages"
  | "user"
  | "users";

export type Program = {
  id: string;
  slug: string;
  name: string;
  category: ProgramCategory;
  educationLevels: EducationLevel[];
  educationLevelLabel: string;
  description: string;
  subjects: string[];
  learningFormat: LearningFormat;
  audience: string;
  priceLabel: string;
  learningObjectives: string[];
  icon: ProgramIconName;
};

export const programs: Program[] = [
  {
    id: "bimbel-sd-fundamental",
    slug: "bimbel-sd-fundamental",
    name: "Bimbel SD — Fundamental Belajar",
    category: "SD",
    educationLevels: ["SD"],
    educationLevelLabel: "Sekolah Dasar",
    description:
      "Pendampingan untuk memahami konsep dasar dan membangun kebiasaan belajar yang menyenangkan.",
    subjects: ["Matematika", "Bahasa Indonesia", "IPA"],
    learningFormat: "Online",
    audience: "Siswa kelas 1–6 SD yang ingin memperkuat fondasi pelajaran.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Memahami konsep dasar pelajaran sekolah.",
      "Melatih rasa ingin tahu dan kebiasaan belajar mandiri.",
      "Berlatih mengerjakan soal sesuai tingkat kelas.",
    ],
    icon: "book",
  },
  {
    id: "bimbel-smp-penguatan-materi",
    slug: "bimbel-smp-penguatan-materi",
    name: "Bimbel SMP — Penguatan Materi",
    category: "SMP",
    educationLevels: ["SMP"],
    educationLevelLabel: "Sekolah Menengah Pertama",
    description:
      "Belajar terarah untuk memperjelas konsep penting dan berlatih menghadapi tugas sekolah.",
    subjects: ["Matematika", "IPA", "Bahasa Inggris"],
    learningFormat: "Hybrid",
    audience: "Siswa kelas 7–9 SMP yang ingin lebih mantap memahami materi.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Menghubungkan konsep pelajaran dengan contoh sehari-hari.",
      "Mengenali bagian materi yang perlu dilatih lebih lanjut.",
      "Membangun kepercayaan diri saat belajar dan bertanya.",
    ],
    icon: "atom",
  },
  {
    id: "bimbel-sma-persiapan-ujian",
    slug: "bimbel-sma-persiapan-ujian",
    name: "Bimbel SMA — Persiapan Ujian",
    category: "SMA",
    educationLevels: ["SMA"],
    educationLevelLabel: "Sekolah Menengah Atas",
    description:
      "Pendalaman materi dan latihan terstruktur untuk menemani perjalanan belajar di SMA.",
    subjects: ["Matematika", "Fisika", "Kimia", "Bahasa Inggris"],
    learningFormat: "Online",
    audience: "Siswa kelas 10–12 SMA yang membutuhkan pendampingan belajar.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Memperkuat pemahaman konsep sesuai materi sekolah.",
      "Menyusun strategi latihan sesuai kebutuhan belajar.",
      "Melatih evaluasi jawaban dan pengelolaan waktu belajar.",
    ],
    icon: "graduation",
  },
  {
    id: "persiapan-utbk-snbt",
    slug: "persiapan-utbk-snbt",
    name: "Persiapan UTBK/SNBT",
    category: "UTBK/SNBT",
    educationLevels: ["UTBK/SNBT"],
    educationLevelLabel: "Persiapan masuk perguruan tinggi",
    description:
      "Sesi belajar untuk berlatih penalaran dan memahami bentuk soal seleksi masuk perguruan tinggi.",
    subjects: ["Penalaran", "Literasi", "Pemecahan masalah"],
    learningFormat: "Hybrid",
    audience: "Siswa SMA dan lulusan yang sedang mempersiapkan seleksi.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Mengenali ragam materi dan tipe soal latihan.",
      "Mengembangkan strategi penalaran dan pemecahan masalah.",
      "Menyusun rutinitas latihan yang terarah.",
    ],
    icon: "target",
  },
  {
    id: "matematika-intensif",
    slug: "matematika-intensif",
    name: "Kelas Matematika Intensif",
    category: "SMP",
    educationLevels: ["SMP", "SMA"],
    educationLevelLabel: "SMP dan SMA",
    description:
      "Fokus pada pemahaman langkah demi langkah, latihan soal, dan pembahasan konsep Matematika.",
    subjects: ["Aljabar", "Geometri", "Pemecahan masalah"],
    learningFormat: "Offline",
    audience: "Siswa SMP atau SMA yang ingin berlatih Matematika lebih terarah.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Memahami cara memilih strategi penyelesaian soal.",
      "Menguatkan konsep aljabar dan geometri.",
      "Membangun ketelitian melalui latihan bertahap.",
    ],
    icon: "calculator",
  },
  {
    id: "bahasa-inggris",
    slug: "bahasa-inggris",
    name: "Kelas Bahasa Inggris",
    category: "SMA",
    educationLevels: ["SD", "SMP", "SMA"],
    educationLevelLabel: "SD, SMP, dan SMA",
    description:
      "Latihan bahasa Inggris dengan materi yang menyesuaikan jenjang dan kebutuhan belajar.",
    subjects: ["Kosakata", "Membaca", "Tata bahasa"],
    learningFormat: "Online",
    audience: "Siswa yang ingin mengembangkan kemampuan bahasa Inggris.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Memperluas kosakata dan pemahaman bacaan.",
      "Mengenali penggunaan tata bahasa dalam konteks.",
      "Berlatih dengan materi sesuai tingkat belajar.",
    ],
    icon: "languages",
  },
  {
    id: "bimbel-privat-personal",
    slug: "bimbel-privat-personal",
    name: "Bimbel Privat Personal",
    category: "Privat",
    educationLevels: ["SD", "SMP", "SMA"],
    educationLevelLabel: "Sesuai jenjang siswa",
    description:
      "Pendampingan individual dengan fokus materi yang dibicarakan sesuai kebutuhan siswa.",
    subjects: ["Mata pelajaran pilihan", "Materi sesuai kebutuhan"],
    learningFormat: "Offline",
    audience: "Siswa yang menginginkan sesi belajar personal.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Menyepakati fokus belajar bersama siswa dan keluarga.",
      "Mendapatkan waktu untuk bertanya dan berdiskusi.",
      "Meninjau kembali materi sesuai kebutuhan.",
    ],
    icon: "user",
  },
  {
    id: "kelas-belajar-kelompok",
    slug: "kelas-belajar-kelompok",
    name: "Kelas Belajar Kelompok",
    category: "SMP",
    educationLevels: ["SMP", "SMA"],
    educationLevelLabel: "Sesuai kelompok jenjang",
    description:
      "Sesi belajar bersama untuk bertukar ide, berdiskusi, dan berlatih dalam kelompok.",
    subjects: ["Materi pilihan", "Diskusi", "Latihan soal"],
    learningFormat: "Hybrid",
    audience: "Siswa yang senang belajar dan berdiskusi bersama teman.",
    priceLabel: "Hubungi kami untuk informasi biaya",
    learningObjectives: [
      "Membiasakan siswa menjelaskan ide dan langkah penyelesaian.",
      "Belajar berdiskusi dan bertukar sudut pandang.",
      "Berlatih bersama dalam kelompok belajar.",
    ],
    icon: "users",
  },
];

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
