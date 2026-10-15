"use client";

import {
  CalendarDays,
  List,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScheduleCard } from "@/components/schedule-card";
import {
  daysOfWeek,
  formatDuration,
  getDurationMinutes,
  type DayOfWeek,
  type Schedule,
  type ScheduleStatus,
} from "@/lib/schedules";
import type { EducationLevel, LearningFormat } from "@/lib/programs";

type ScheduleExplorerProps = {
  schedules: Schedule[];
  availableScheduleCount: number;
  subjectNames: string[];
  programCount: number;
  formatCount: number;
};

type ScheduleView = "list" | "calendar";

const educationLevels: EducationLevel[] = ["SD", "SMP", "SMA", "UTBK/SNBT"];
const learningFormats: LearningFormat[] = ["Online", "Offline", "Hybrid"];
const scheduleStatuses: ScheduleStatus[] = ["available", "full"];

const statusLabels: Record<ScheduleStatus, string> = {
  available: "Tersedia",
  full: "Penuh",
};

const gridStartMinutes = 8 * 60;
const gridEndMinutes = 20 * 60;
const calendarSlotHeight = 32;

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getCalendarPosition(schedule: Schedule) {
  const start = timeToMinutes(schedule.startTime);
  const duration = getDurationMinutes(schedule);
  const top = ((start - gridStartMinutes) / 30) * calendarSlotHeight;
  const height = Math.max((duration / 30) * calendarSlotHeight - 4, 42);

  return { top, height };
}

function ScheduleDetailsDialog({
  schedule,
  onClose,
}: {
  schedule: Schedule;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isFull = schedule.status === "full";
  const duration = formatDuration(getDurationMinutes(schedule));
  const contactHref = `/kontak?jadwal=${encodeURIComponent(schedule.id)}`;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      aria-labelledby="schedule-detail-title"
      className="schedule-dialog"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      ref={dialogRef}
    >
      <div className="schedule-dialog__content">
        <div className="schedule-dialog__heading">
          <span className="schedule-dialog__icon">
            <CalendarDays size={23} aria-hidden="true" />
          </span>
          <button
            aria-label="Tutup detail jadwal"
            className="schedule-dialog__close"
            onClick={onClose}
            type="button"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>
        <p className="schedule-dialog__eyebrow">
          {schedule.dayOfWeek} · {schedule.startTime}–{schedule.endTime}
        </p>
        <h2 id="schedule-detail-title">{schedule.programName}</h2>
        <p className="schedule-dialog__subject">{schedule.subject}</p>
        <span className={`schedule-status${isFull ? " schedule-status--full" : ""}`}>
          {isFull ? "Penuh (contoh)" : "Tersedia (contoh)"}
        </span>
        <dl className="schedule-dialog__details">
          <div>
            <dt>Jenjang</dt>
            <dd>{schedule.educationLevel}</dd>
          </div>
          <div>
            <dt>Tutor demonstrasi</dt>
            <dd>{schedule.tutorName}</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{schedule.learningFormat}</dd>
          </div>
          <div>
            <dt>Durasi</dt>
            <dd>{duration}</dd>
          </div>
          <div>
            <dt>Lokasi / pertemuan</dt>
            <dd>Informasi akan dikonfirmasi oleh tim.</dd>
          </div>
        </dl>
        <p className="schedule-dialog__notice">
          Jadwal, nama tutor, dan status merupakan data demonstrasi. Ketersediaan
          aktual perlu dikonfirmasi. Saat menghubungi tim, sertakan kode jadwal{" "}
          <strong>{schedule.id}</strong>.
        </p>
        <div className="schedule-dialog__actions">
          {isFull ? (
            <button className="schedule-dialog__disabled" disabled type="button">
              Kelas penuh — tidak dapat dipilih
            </button>
          ) : (
            <Link className="schedule-dialog__contact" href={contactHref}>
              Tanyakan jadwal ini
            </Link>
          )}
          <Link
            className="schedule-dialog__program"
            href={`/program/${schedule.programSlug}`}
          >
            Lihat detail program
          </Link>
        </div>
      </div>
    </dialog>
  );
}

function WeeklyCalendar({
  schedules,
  onSelect,
}: {
  schedules: Schedule[];
  onSelect: (schedule: Schedule) => void;
}) {
  const timeSlots = Array.from(
    { length: (gridEndMinutes - gridStartMinutes) / 30 },
    (_, index) => {
      const minutes = gridStartMinutes + index * 30;

      return {
        label:
          minutes % 60 === 0
            ? `${String(Math.floor(minutes / 60)).padStart(2, "0")}:00`
            : null,
      };
    },
  );

  return (
    <div
      aria-label="Jadwal mingguan, gulir mendatar untuk melihat semua hari"
      className="weekly-calendar-scroll"
      role="region"
      tabIndex={0}
    >
      <div className="weekly-calendar">
        <div className="weekly-calendar__corner">Waktu</div>
        {daysOfWeek.map((day) => (
          <h3 className="weekly-calendar__day-heading" key={day}>
            {day}
          </h3>
        ))}
        <div aria-hidden="true" className="weekly-calendar__times">
          {timeSlots.map((slot, index) => (
            <span className="weekly-calendar__time" key={index}>
              {slot.label}
            </span>
          ))}
        </div>
        {daysOfWeek.map((day) => {
          const daySchedules = schedules.filter(
            (schedule) => schedule.dayOfWeek === day,
          );

          return (
            <div
              aria-label={`${day}: ${
                daySchedules.length
                  ? `${daySchedules.length} kelas`
                  : "tidak ada kelas pada jadwal contoh"
              }`}
              className="weekly-calendar__day"
              key={day}
            >
              {daySchedules.length === 0 ? (
                <span className="weekly-calendar__empty">Tidak ada kelas</span>
              ) : (
                daySchedules.map((schedule) => {
                  const { height, top } = getCalendarPosition(schedule);
                  const isFull = schedule.status === "full";

                  return (
                    <button
                      aria-label={`${schedule.programName}, ${schedule.dayOfWeek} ${schedule.startTime} sampai ${schedule.endTime}, ${schedule.tutorName}, ${statusLabels[schedule.status]}`}
                      className={`weekly-calendar__event${isFull ? " weekly-calendar__event--full" : ""}`}
                      key={schedule.id}
                      onClick={() => onSelect(schedule)}
                      style={{ height, top }}
                      type="button"
                    >
                      <strong>{schedule.startTime}</strong>
                      <span>{schedule.programName}</span>
                      <small>{schedule.tutorName}</small>
                    </button>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScheduleExplorer({
  schedules,
  availableScheduleCount,
  subjectNames,
  programCount,
  formatCount,
}: ScheduleExplorerProps) {
  const [query, setQuery] = useState("");
  const [educationLevel, setEducationLevel] = useState<EducationLevel | "all">("all");
  const [day, setDay] = useState<DayOfWeek | "all">("all");
  const [format, setFormat] = useState<LearningFormat | "all">("all");
  const [subject, setSubject] = useState("all");
  const [status, setStatus] = useState<ScheduleStatus | "all">("all");
  const [view, setView] = useState<ScheduleView>("list");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const filteredSchedules = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id");

    return schedules.filter((schedule) => {
      const searchable = [
        schedule.programName,
        schedule.subject,
        schedule.tutorName,
        schedule.educationLevel,
      ]
        .join(" ")
        .toLocaleLowerCase("id");

      return (
        (educationLevel === "all" || schedule.educationLevel === educationLevel) &&
        (day === "all" || schedule.dayOfWeek === day) &&
        (format === "all" || schedule.learningFormat === format) &&
        (subject === "all" || schedule.subject === subject) &&
        (status === "all" || schedule.status === status) &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [day, educationLevel, format, query, schedules, status, subject]);

  const hasFilters =
    query !== "" ||
    educationLevel !== "all" ||
    day !== "all" ||
    format !== "all" ||
    subject !== "all" ||
    status !== "all";

  function resetFilters() {
    setQuery("");
    setEducationLevel("all");
    setDay("all");
    setFormat("all");
    setSubject("all");
    setStatus("all");
  }

  return (
    <>
      <section className="schedule-summary" aria-label="Ringkasan jadwal contoh">
        <div className="schedule-summary__item">
          <span className="schedule-summary__value">
            {availableScheduleCount}
          </span>
          <span>Kelas berstatus tersedia (contoh)</span>
        </div>
        <div className="schedule-summary__item">
          <span className="schedule-summary__value">{programCount}</span>
          <span>Program berbeda</span>
        </div>
        <div className="schedule-summary__item">
          <span className="schedule-summary__value">{formatCount}</span>
          <span>Pilihan format</span>
        </div>
      </section>

      {schedules.length === 0 ? (
        <div className="schedule-empty">
          <CalendarDays size={24} aria-hidden="true" />
          <h2>Jadwal belum tersedia</h2>
          <p>Belum ada jadwal untuk ditampilkan. Silakan hubungi tim kami.</p>
          <Link href="/kontak">Hubungi kami</Link>
        </div>
      ) : (
        <>
          <section aria-label="Cari dan filter jadwal" className="schedule-filters">
            <label className="schedule-search">
              <Search size={17} aria-hidden="true" />
              <span className="visually-hidden">
                Cari program, mata pelajaran, atau tutor
              </span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari program, pelajaran, tutor"
                type="search"
                value={query}
              />
            </label>
            <label className="schedule-filter">
              <span>Jenjang</span>
              <select
                onChange={(event) =>
                  setEducationLevel(event.target.value as EducationLevel | "all")
                }
                value={educationLevel}
              >
                <option value="all">Semua jenjang</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
            <label className="schedule-filter">
              <span>Hari</span>
              <select
                onChange={(event) =>
                  setDay(event.target.value as DayOfWeek | "all")
                }
                value={day}
              >
                <option value="all">Semua hari</option>
                {daysOfWeek.map((weekDay) => (
                  <option key={weekDay} value={weekDay}>
                    {weekDay}
                  </option>
                ))}
              </select>
            </label>
            <label className="schedule-filter">
              <span>Format</span>
              <select
                onChange={(event) =>
                  setFormat(event.target.value as LearningFormat | "all")
                }
                value={format}
              >
                <option value="all">Semua format</option>
                {learningFormats.map((learningFormat) => (
                  <option key={learningFormat} value={learningFormat}>
                    {learningFormat}
                  </option>
                ))}
              </select>
            </label>
            <label className="schedule-filter">
              <span>Mata pelajaran</span>
              <select
                onChange={(event) => setSubject(event.target.value)}
                value={subject}
              >
                <option value="all">Semua pelajaran</option>
                {subjectNames.map((subjectName) => (
                  <option key={subjectName} value={subjectName}>
                    {subjectName}
                  </option>
                ))}
              </select>
            </label>
            <label className="schedule-filter">
              <span>Status kelas</span>
              <select
                onChange={(event) =>
                  setStatus(event.target.value as ScheduleStatus | "all")
                }
                value={status}
              >
                <option value="all">Semua status</option>
                {scheduleStatuses.map((scheduleStatus) => (
                  <option key={scheduleStatus} value={scheduleStatus}>
                    {statusLabels[scheduleStatus]}
                  </option>
                ))}
              </select>
            </label>
            {hasFilters && (
              <button
                className="schedule-reset"
                onClick={resetFilters}
                type="button"
              >
                <RotateCcw size={14} aria-hidden="true" />
                Atur ulang
              </button>
            )}
          </section>

          <div className="schedule-toolbar">
            <p aria-live="polite" role="status">
              <strong>{filteredSchedules.length}</strong> kelas sesuai pilihan
            </p>
            <div aria-label="Tampilan jadwal" className="schedule-view-toggle">
              <button
                aria-pressed={view === "list"}
                className={view === "list" ? "schedule-view-toggle__button is-active" : "schedule-view-toggle__button"}
                onClick={() => setView("list")}
                type="button"
              >
                <List size={15} aria-hidden="true" />
                Tampilan Daftar
              </button>
              <button
                aria-pressed={view === "calendar"}
                className={view === "calendar" ? "schedule-view-toggle__button is-active" : "schedule-view-toggle__button"}
                onClick={() => setView("calendar")}
                type="button"
              >
                <CalendarDays size={15} aria-hidden="true" />
                Tampilan Kalender
              </button>
            </div>
          </div>

          {filteredSchedules.length === 0 ? (
            <div className="schedule-empty">
              <Search size={24} aria-hidden="true" />
              <h2>Tidak ada jadwal yang cocok</h2>
              <p>
                Coba ubah kata pencarian atau filter untuk melihat pilihan
                lainnya.
              </p>
              <button onClick={resetFilters} type="button">
                <RotateCcw size={15} aria-hidden="true" />
                Atur ulang filter
              </button>
            </div>
          ) : view === "list" ? (
            <div className="schedule-list">
              {filteredSchedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  onSelect={setSelectedSchedule}
                  schedule={schedule}
                />
              ))}
            </div>
          ) : (
            <WeeklyCalendar
              onSelect={setSelectedSchedule}
              schedules={filteredSchedules}
            />
          )}
        </>
      )}

      {selectedSchedule && (
        <ScheduleDetailsDialog
          onClose={() => setSelectedSchedule(null)}
          schedule={selectedSchedule}
        />
      )}
    </>
  );
}
