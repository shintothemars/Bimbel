"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { ProgramCard } from "@/components/program-card";
import {
  programCategories,
  type EducationLevel,
  type LearningFormat,
  type Program,
  type ProgramCategory,
} from "@/lib/programs";

type ProgramCatalogProps = {
  programs: Program[];
};

type SortOrder = "recommended" | "name-ascending" | "name-descending";

const categoryDescriptions: Record<ProgramCategory, string> = {
  SD: "Sekolah Dasar",
  SMP: "Sekolah Menengah Pertama",
  SMA: "Sekolah Menengah Atas",
  "UTBK/SNBT": "Persiapan seleksi perguruan tinggi",
  Privat: "Bimbingan personal",
};

export function ProgramCatalog({ programs }: ProgramCatalogProps) {
  const [category, setCategory] = useState<ProgramCategory | "all">("all");
  const [level, setLevel] = useState<EducationLevel | "all">("all");
  const [format, setFormat] = useState<LearningFormat | "all">("all");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recommended");

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("id");
    const filtered = programs.filter((program) => {
      const matchesCategory = category === "all" || program.category === category;
      const matchesLevel =
        level === "all" || program.educationLevels.includes(level);
      const matchesFormat = format === "all" || program.learningFormat === format;
      const searchableText = [
        program.name,
        program.description,
        program.category,
        program.educationLevelLabel,
        ...program.subjects,
      ]
        .join(" ")
        .toLocaleLowerCase("id");

      return (
        matchesCategory &&
        matchesLevel &&
        matchesFormat &&
        (!normalizedQuery || searchableText.includes(normalizedQuery))
      );
    });

    if (sortOrder === "name-ascending") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "id"));
    }

    if (sortOrder === "name-descending") {
      return [...filtered].sort((a, b) => b.name.localeCompare(a.name, "id"));
    }

    return filtered;
  }, [category, format, level, programs, query, sortOrder]);

  const hasFilters =
    category !== "all" ||
    level !== "all" ||
    format !== "all" ||
    query !== "" ||
    sortOrder !== "recommended";

  function resetFilters() {
    setCategory("all");
    setLevel("all");
    setFormat("all");
    setQuery("");
    setSortOrder("recommended");
  }

  return (
    <div className="program-catalog">
      <nav aria-label="Kategori program" className="category-tabs">
        <button
          aria-pressed={category === "all"}
          className={category === "all" ? "category-tabs__item category-tabs__item--active" : "category-tabs__item"}
          onClick={() => setCategory("all")}
          type="button"
        >
          Semua Program
        </button>
        {programCategories.map((programCategory) => (
          <button
            aria-pressed={category === programCategory}
            className={
              category === programCategory
                ? "category-tabs__item category-tabs__item--active"
                : "category-tabs__item"
            }
            key={programCategory}
            onClick={() => setCategory(programCategory)}
            type="button"
          >
            <strong>{programCategory}</strong>
            <span>{categoryDescriptions[programCategory]}</span>
          </button>
        ))}
      </nav>

      <section aria-label="Pencarian dan filter program" className="catalog-filters">
        <label className="catalog-search">
          <Search size={18} aria-hidden="true" />
          <span className="visually-hidden">Cari program atau mata pelajaran</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari program atau mata pelajaran"
            type="search"
            value={query}
          />
        </label>
        <label className="catalog-select">
          <span>Jenjang</span>
          <select
            onChange={(event) =>
              setLevel(event.target.value as EducationLevel | "all")
            }
            value={level}
          >
            <option value="all">Semua jenjang</option>
            {(["SD", "SMP", "SMA", "UTBK/SNBT"] as const).map((educationLevel) => (
              <option key={educationLevel} value={educationLevel}>
                {educationLevel}
              </option>
            ))}
          </select>
        </label>
        <label className="catalog-select">
          <span>Format belajar</span>
          <select
            onChange={(event) =>
              setFormat(event.target.value as LearningFormat | "all")
            }
            value={format}
          >
            <option value="all">Semua format</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <label className="catalog-select catalog-select--sort">
          <span>Urutkan</span>
          <select
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            value={sortOrder}
          >
            <option value="recommended">Pilihan program</option>
            <option value="name-ascending">Nama A–Z</option>
            <option value="name-descending">Nama Z–A</option>
          </select>
        </label>
        {hasFilters && (
          <button className="catalog-reset" onClick={resetFilters} type="button">
            <RotateCcw size={15} aria-hidden="true" />
            Atur ulang
          </button>
        )}
      </section>

      <div className="catalog-results">
        <p aria-live="polite" role="status">
          <strong>{filteredPrograms.length}</strong>{" "}
          {filteredPrograms.length === 1 ? "program ditemukan" : "program ditemukan"}
        </p>
        <span>
          <SlidersHorizontal size={15} aria-hidden="true" />
          Sesuaikan filter untuk menemukan pilihanmu
        </span>
      </div>

      {filteredPrograms.length > 0 ? (
        <div className="catalog-grid">
          {filteredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty">
          <span className="catalog-empty__icon">
            <Search size={24} aria-hidden="true" />
          </span>
          <h3>Program belum ditemukan</h3>
          <p>
            Coba kata pencarian atau kombinasi filter yang berbeda untuk melihat
            program lainnya.
          </p>
          <button className="catalog-empty__reset" onClick={resetFilters} type="button">
            <RotateCcw size={16} aria-hidden="true" />
            Atur ulang filter
          </button>
        </div>
      )}
    </div>
  );
}
