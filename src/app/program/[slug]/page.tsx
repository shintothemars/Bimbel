import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProgramIcon } from "@/components/program-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProgramBySlug, programs } from "@/lib/programs";

type ProgramDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return { title: "Program tidak ditemukan | Modern Brilliant" };
  }

  return {
    title: `${program.name} | Modern Brilliant`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <div className="program-page">
      <SiteHeader activePage="program" />
      <main>
        <section className="program-detail-hero">
          <div className="section-wrap">
            <nav aria-label="Breadcrumb" className="program-breadcrumb">
              <Link href="/">Beranda</Link>
              <span aria-hidden="true">/</span>
              <Link href="/program">Program Bimbel</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{program.name}</span>
            </nav>
            <Link className="program-back-link" href="/program">
              <ArrowLeft size={16} aria-hidden="true" />
              Kembali ke semua program
            </Link>
            <div className="program-detail-hero__content">
              <span className="program-detail-hero__icon">
                <ProgramIcon name={program.icon} />
              </span>
              <p className="eyebrow">{program.category} · Program belajar</p>
              <h1>{program.name}</h1>
              <p className="program-detail-hero__description">
                {program.description}
              </p>
              <div className="program-detail-hero__actions">
                <Button href="/kontak" icon>
                  Tanyakan Program Ini
                </Button>
                <Link className="program-detail-contact-link" href="/kontak">
                  <MessageCircle size={17} aria-hidden="true" />
                  Hubungi kami
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="program-detail-content">
          <div className="section-wrap program-detail-content__layout">
            <div className="program-detail-main">
              <p className="catalog-demo-note">
                <strong>Informasi demonstrasi:</strong> deskripsi dan cakupan di
                halaman ini merupakan contoh. Konfirmasikan detail program
                langsung kepada tim Modern Brilliant.
              </p>
              <section aria-labelledby="program-overview-title">
                <p className="eyebrow">Tentang program</p>
                <h2 id="program-overview-title">Ringkasan program</h2>
                <p>{program.description}</p>
              </section>
              <section aria-labelledby="program-objectives-title">
                <p className="eyebrow">Arah pembelajaran</p>
                <h2 id="program-objectives-title">Tujuan belajar</h2>
                <ul className="program-objectives">
                  {program.learningObjectives.map((objective) => (
                    <li key={objective}>
                      <span>
                        <Check size={15} aria-hidden="true" />
                      </span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="program-subjects-title">
                <p className="eyebrow">Fokus belajar</p>
                <h2 id="program-subjects-title">Materi yang dapat dibahas</h2>
                <ul className="program-subject-list">
                  {program.subjects.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside aria-label="Ringkasan program" className="program-detail-aside">
              <h2>Informasi program</h2>
              <dl>
                <div>
                  <dt>Jenjang pendidikan</dt>
                  <dd>{program.educationLevelLabel}</dd>
                </div>
                <div>
                  <dt>Format belajar</dt>
                  <dd>{program.learningFormat}</dd>
                </div>
                <div>
                  <dt>Cocok untuk</dt>
                  <dd>{program.audience}</dd>
                </div>
                <div>
                  <dt>Fokus belajar</dt>
                  <dd>{program.subjects.join(", ")}</dd>
                </div>
                <div>
                  <dt>Informasi biaya</dt>
                  <dd>{program.priceLabel}</dd>
                </div>
                <div>
                  <dt>
                    <CalendarDays size={15} aria-hidden="true" />
                    Jadwal belajar
                  </dt>
                  <dd>Diskusikan jadwal dan ketersediaan bersama tim kami.</dd>
                </div>
              </dl>
              <Button className="program-detail-aside__button" href="/kontak">
                Hubungi untuk mendaftar
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <p>Informasi program merupakan contoh dan perlu dikonfirmasi.</p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
