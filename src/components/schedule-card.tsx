import {
  CalendarDays,
  Clock3,
  MonitorSmartphone,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import {
  formatDuration,
  getDurationMinutes,
  type Schedule,
} from "@/lib/schedules";

type ScheduleCardProps = {
  schedule: Schedule;
  onSelect: (schedule: Schedule) => void;
};

export function ScheduleCard({ schedule, onSelect }: ScheduleCardProps) {
  const isFull = schedule.status === "full";

  return (
    <article className="schedule-card">
      <div className="schedule-card__time">
        <span className="schedule-card__day">
          <CalendarDays size={15} aria-hidden="true" />
          {schedule.dayOfWeek}
        </span>
        <strong>{schedule.startTime}</strong>
        <span className="schedule-card__end-time">sampai {schedule.endTime}</span>
      </div>
      <div className="schedule-card__main">
        <div className="schedule-card__title-row">
          <div>
            <h3>{schedule.programName}</h3>
            <p className="schedule-card__subject">{schedule.subject}</p>
          </div>
          <span className={`schedule-status${isFull ? " schedule-status--full" : ""}`}>
            {isFull ? "Penuh (contoh)" : "Tersedia (contoh)"}
          </span>
        </div>
        <div className="schedule-card__meta">
          <span>{schedule.educationLevel}</span>
          <span>
            <UserRound size={14} aria-hidden="true" />
            {schedule.tutorName}
          </span>
          <span>
            <MonitorSmartphone size={14} aria-hidden="true" />
            {schedule.learningFormat}
          </span>
          <span>
            <Clock3 size={14} aria-hidden="true" />
            {formatDuration(getDurationMinutes(schedule))}
          </span>
        </div>
      </div>
      <div className="schedule-card__actions">
        <Link className="schedule-card__program-link" href={`/program/${schedule.programSlug}`}>
          Lihat Program
        </Link>
        <button
          aria-label={
            isFull
              ? `Lihat detail kelas penuh ${schedule.programName}`
              : `Pilih jadwal ${schedule.programName}`
          }
          className={isFull ? "schedule-card__select schedule-card__select--full" : "schedule-card__select"}
          onClick={() => onSelect(schedule)}
          type="button"
        >
          {isFull ? "Lihat Detail" : "Pilih Jadwal"}
        </button>
      </div>
    </article>
  );
}
