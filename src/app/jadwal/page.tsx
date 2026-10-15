import type { Metadata } from "next";
import { ScheduleExplorer } from "@/components/schedule-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { schedules } from "@/lib/schedules";

export const metadata: Metadata = {
  title: "Jadwal Bimbingan Belajar | Modern Brilliant",
  description:
    "Cari dan bandingkan contoh jadwal bimbingan belajar Modern Brilliant berdasarkan jenjang, hari, mata pelajaran, dan format.",
};

const subjectNames = [...new Set(schedules.map((schedule) => schedule.subject))].sort(
  (a, b) => a.localeCompare(b, "id"),
);
const availableScheduleCount = schedules.filter(
  (schedule) => schedule.status === "available",
).length;
const programCount = new Set(schedules.map((schedule) => schedule.programId)).size;
const formatCount = new Set(schedules.map((schedule) => schedule.learningFormat)).size;

export default function SchedulePage() {
  return (
    <div className="schedule-page">
      <SiteHeader activePage="schedule" />
      <main>
        <section aria-labelledby="schedule-page-title" className="schedule-page__main">
          <div className="section-wrap">
            <div className="schedule-page__heading">
              <p className="eyebrow">Modern Brilliant · Jadwal belajar</p>
              <h1 id="schedule-page-title">Jadwal Bimbingan Belajar</h1>
              <p>
                Temukan jadwal belajar yang sesuai dengan program dan waktu
                luangmu.
              </p>
            </div>
            <p className="schedule-demo-note">
              Jadwal dan tutor berikut adalah data demonstrasi, bukan
              ketersediaan kelas atau tutor aktual. Konfirmasikan pilihanmu
              kepada tim Modern Brilliant.
            </p>
            <ScheduleExplorer
              availableScheduleCount={availableScheduleCount}
              formatCount={formatCount}
              programCount={programCount}
              schedules={schedules}
              subjectNames={subjectNames}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
