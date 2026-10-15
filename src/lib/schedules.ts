import type { EducationLevel, LearningFormat } from "@/lib/programs";
import { programs } from "@/lib/programs";

export const daysOfWeek = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
] as const;

export type DayOfWeek = (typeof daysOfWeek)[number];
export type ScheduleStatus = "available" | "full";

export type Schedule = {
  id: string;
  programId: string;
  programSlug: string;
  programName: string;
  subject: string;
  educationLevel: EducationLevel;
  tutorName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  learningFormat: LearningFormat;
  status: ScheduleStatus;
};

const programById = new Map(programs.map((program) => [program.id, program]));

type ScheduleEntry = Omit<Schedule, "programSlug" | "programName"> & {
  programId: string;
};

const scheduleEntries: ScheduleEntry[] = [
  {
    id: "senin-sd-1500",
    programId: "bimbel-sd-fundamental",
    subject: "Matematika",
    educationLevel: "SD",
    tutorName: "Tutor contoh A",
    dayOfWeek: "Senin",
    startTime: "15:00",
    endTime: "16:00",
    learningFormat: "Online",
    status: "available",
  },
  {
    id: "senin-smp-1630",
    programId: "bimbel-smp-penguatan-materi",
    subject: "IPA",
    educationLevel: "SMP",
    tutorName: "Tutor contoh B",
    dayOfWeek: "Senin",
    startTime: "16:30",
    endTime: "18:00",
    learningFormat: "Hybrid",
    status: "full",
  },
  {
    id: "selasa-inggris-1500",
    programId: "bahasa-inggris",
    subject: "Bahasa Inggris",
    educationLevel: "SMA",
    tutorName: "Tutor contoh C",
    dayOfWeek: "Selasa",
    startTime: "15:00",
    endTime: "16:30",
    learningFormat: "Online",
    status: "available",
  },
  {
    id: "selasa-matematika-1700",
    programId: "matematika-intensif",
    subject: "Matematika",
    educationLevel: "SMP",
    tutorName: "Tutor contoh A",
    dayOfWeek: "Selasa",
    startTime: "17:00",
    endTime: "18:30",
    learningFormat: "Offline",
    status: "available",
  },
  {
    id: "rabu-utbk-1600",
    programId: "persiapan-utbk-snbt",
    subject: "Penalaran",
    educationLevel: "UTBK/SNBT",
    tutorName: "Tutor contoh B",
    dayOfWeek: "Rabu",
    startTime: "16:00",
    endTime: "18:00",
    learningFormat: "Hybrid",
    status: "available",
  },
  {
    id: "kamis-sma-1700",
    programId: "bimbel-sma-persiapan-ujian",
    subject: "Kimia",
    educationLevel: "SMA",
    tutorName: "Tutor contoh C",
    dayOfWeek: "Kamis",
    startTime: "17:00",
    endTime: "18:30",
    learningFormat: "Offline",
    status: "available",
  },
  {
    id: "jumat-privat-1530",
    programId: "bimbel-privat-personal",
    subject: "Matematika",
    educationLevel: "SMP",
    tutorName: "Tutor contoh A",
    dayOfWeek: "Jumat",
    startTime: "15:30",
    endTime: "16:30",
    learningFormat: "Hybrid",
    status: "available",
  },
  {
    id: "sabtu-sd-0900",
    programId: "bimbel-sd-fundamental",
    subject: "Bahasa Indonesia",
    educationLevel: "SD",
    tutorName: "Tutor contoh C",
    dayOfWeek: "Sabtu",
    startTime: "09:00",
    endTime: "10:00",
    learningFormat: "Offline",
    status: "available",
  },
  {
    id: "sabtu-kelompok-1030",
    programId: "kelas-belajar-kelompok",
    subject: "IPA",
    educationLevel: "SMP",
    tutorName: "Tutor contoh B",
    dayOfWeek: "Sabtu",
    startTime: "10:30",
    endTime: "12:00",
    learningFormat: "Online",
    status: "full",
  },
  {
    id: "sabtu-sma-1300",
    programId: "bimbel-sma-persiapan-ujian",
    subject: "Fisika",
    educationLevel: "SMA",
    tutorName: "Tutor contoh A",
    dayOfWeek: "Sabtu",
    startTime: "13:00",
    endTime: "14:30",
    learningFormat: "Hybrid",
    status: "available",
  },
];

export const schedules: Schedule[] = scheduleEntries.map((schedule) => {
  const program = programById.get(schedule.programId);

  if (!program) {
    throw new Error(`Program not found for schedule "${schedule.id}".`);
  }

  return {
    ...schedule,
    programSlug: program.slug,
    programName: program.name,
  };
});

export function getDurationMinutes(schedule: Pick<Schedule, "startTime" | "endTime">) {
  const [startHours, startMinutes] = schedule.startTime.split(":").map(Number);
  const [endHours, endMinutes] = schedule.endTime.split(":").map(Number);

  return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
}

export function formatDuration(durationMinutes: number) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} jam`);
  }

  if (minutes > 0) {
    parts.push(`${minutes} menit`);
  }

  return parts.join(" ");
}
