import {
  Atom,
  BookOpen,
  Calculator,
  GraduationCap,
  Languages,
  Target,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import type { Program, ProgramIconName } from "@/lib/programs";

const programIcons: Record<ProgramIconName, LucideIcon> = {
  book: BookOpen,
  atom: Atom,
  graduation: GraduationCap,
  target: Target,
  calculator: Calculator,
  languages: Languages,
  user: UserRound,
  users: UsersRound,
};

type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <article className="catalog-card">
      <div className="catalog-card__top">
        <span className="catalog-card__icon">
          <ProgramIcon name={program.icon} />
        </span>
        <span className="catalog-card__category">{program.category}</span>
      </div>
      <p className="catalog-card__level">{program.educationLevelLabel}</p>
      <h3>{program.name}</h3>
      <p className="catalog-card__description">{program.description}</p>
      <div className="catalog-card__focus">
        <span>Fokus belajar</span>
        <p>{program.subjects.join(" · ")}</p>
      </div>
      <dl className="catalog-card__details">
        <div>
          <dt>Format belajar</dt>
          <dd>{program.learningFormat}</dd>
        </div>
        <div>
          <dt>Cocok untuk</dt>
          <dd>{program.audience}</dd>
        </div>
        <div>
          <dt>Biaya</dt>
          <dd>{program.priceLabel}</dd>
        </div>
      </dl>
      <div className="catalog-card__actions">
        <Link className="catalog-card__detail-link" href={`/program/${program.slug}`}>
          Lihat Detail
        </Link>
        <Link className="catalog-card__register-link" href="/#kontak">
          Daftar Program
        </Link>
      </div>
    </article>
  );
}

export function ProgramIcon({ name }: { name: ProgramIconName }) {
  const Icon = programIcons[name];

  return <Icon size={25} strokeWidth={1.8} aria-hidden="true" />;
}
