import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProgramCatalog } from "@/components/program-catalog";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { programs } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Program Bimbel | Modern Brilliant",
  description:
    "Temukan program bimbingan belajar Modern Brilliant untuk SD, SMP, SMA, UTBK/SNBT, dan privat.",
};

const learningSteps = [
  {
    icon: BookOpenCheck,
    title: "Pilih program",
    description: "Temukan fokus belajar dan jenjang yang sesuai kebutuhanmu.",
  },
  {
    icon: ClipboardList,
    title: "Konsultasikan kebutuhan",
    description: "Ceritakan tujuan belajar kepada tim Modern Brilliant.",
  },
  {
    icon: CalendarDays,
    title: "Tentukan jadwal",
    description: "Diskusikan waktu belajar dan ketersediaan bersama tim.",
  },
  {
    icon: Sparkles,
    title: "Mulai belajar",
    description: "Kenali rencana belajar dan mulai melangkah bersama tutor.",
  },
];

const faqs = [
  {
    question: "Bagaimana cara memilih program yang tepat?",
    answer:
      "Pilih jenjang dan fokus yang paling mendekati kebutuhan siswa. Jika masih ragu, hubungi tim kami untuk mendiskusikan pilihan yang sesuai.",
  },
  {
    question: "Apakah tersedia kelas online?",
    answer:
      "Format yang tercantum pada setiap kartu adalah contoh program. Hubungi tim kami untuk memastikan format dan ketersediaan program saat ini.",
  },
  {
    question: "Apakah jadwal dapat disesuaikan?",
    answer:
      "Jadwal dan ketersediaan perlu dikonfirmasi langsung bersama tim Modern Brilliant. Silakan hubungi kami sebelum memilih waktu belajar.",
  },
  {
    question: "Bagaimana proses pendaftarannya?",
    answer:
      "Pilih program yang ingin ditanyakan, lalu hubungi tim melalui informasi kontak di bagian bawah halaman. Tim akan membantu menjelaskan langkah berikutnya.",
  },
  {
    question: "Bagaimana cara mengetahui biaya program?",
    answer:
      "Informasi biaya belum dicantumkan di katalog ini. Hubungi tim kami untuk menanyakan biaya dan ketersediaan program yang diminati.",
  },
];

export default function ProgramPage() {
  return (
    <div className="program-page">
      <SiteHeader activePage="program" />
      <main>
        <section aria-labelledby="program-hero-title" className="program-hero">
          <div className="section-wrap">
            <nav aria-label="Breadcrumb" className="program-breadcrumb">
              <Link href="/">Beranda</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Program Bimbel</span>
            </nav>
            <div className="program-hero__layout">
              <div className="program-hero__copy">
                <p className="eyebrow">
                  <span className="eyebrow__line" />
                  Program Modern Brilliant
                </p>
                <h1 id="program-hero-title">
                  Temukan Program Belajar yang
                  <span> Tepat untukmu</span>
                </h1>
                <p className="program-hero__description">
                  Belajar lebih terarah dengan program bimbingan yang dirancang
                  sesuai jenjang pendidikan, kebutuhan, dan target belajarmu.
                </p>
                <div className="program-hero__actions">
                  <Button href="#katalog" icon>
                    Lihat Semua Program
                  </Button>
                  <Button href="/kontak" variant="secondary">
                    Konsultasi Program
                    <ArrowRight size={17} aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div aria-hidden="true" className="program-hero__visual">
                <span className="program-hero__visual-orbit" />
                <span className="program-hero__visual-spark program-hero__visual-spark--one">
                  <Sparkles size={22} />
                </span>
                <span className="program-hero__visual-spark program-hero__visual-spark--two">
                  <Sparkles size={15} />
                </span>
                <div className="program-hero__visual-card">
                  <span className="program-hero__visual-icon">
                    <BookOpenCheck size={29} />
                  </span>
                  <span className="program-hero__visual-lines">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="program-hero__visual-check">✓</span>
                </div>
                <span className="program-hero__visual-label">
                  Temukan ritme belajarmu
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="catalog-title"
          className="program-catalog-section"
          id="katalog"
        >
          <div className="section-wrap">
            <div className="program-section-heading">
              <p className="eyebrow">Pilih sesuai kebutuhan</p>
              <h2 id="catalog-title">
                Satu tujuan belajar,
                <span> banyak cara untuk mencapainya.</span>
              </h2>
              <p>
                Jelajahi contoh pilihan belajar, lalu saring berdasarkan jenjang,
                format, atau mata pelajaran.
              </p>
            </div>
            <p className="catalog-demo-note">
              <strong>Contoh katalog:</strong> daftar program, format, dan
              cakupan materi di bawah merupakan konten demonstrasi. Konfirmasikan
              ketersediaan kepada tim kami.
            </p>
            <ProgramCatalog programs={programs} />
          </div>
        </section>

        <section
          aria-labelledby="program-steps-title"
          className="program-steps-section"
        >
          <div className="section-wrap">
            <div className="program-section-heading program-section-heading--center">
              <p className="eyebrow">Langkah belajar</p>
              <h2 id="program-steps-title">
                Dari memilih hingga
                <span> mulai belajar.</span>
              </h2>
              <p>
                Kenali kebutuhanmu, diskusikan langkahnya, lalu persiapkan
                perjalanan belajarmu.
              </p>
            </div>
            <ol className="program-steps">
              {learningSteps.map(({ icon: Icon, title, description }, index) => (
                <li className="program-step" key={title}>
                  <div className="program-step__marker">
                    <span className="program-step__icon">
                      <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="program-step__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="program-faq-title" className="program-faq">
          <div className="section-wrap program-faq__layout">
            <div className="program-section-heading">
              <p className="eyebrow">Pertanyaan umum</p>
              <h2 id="program-faq-title">
                Sebelum memilih,
                <span> ini yang perlu diketahui.</span>
              </h2>
              <p>
                Informasi program dapat berubah. Hubungi tim untuk memastikan
                ketersediaan dan detail terkini.
              </p>
              <Link className="program-text-link" href="/kontak">
                Tanyakan kepada tim kami
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="program-faq__list">
              {faqs.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>
                    <span>{question}</span>
                    <span className="faq-item__toggle" aria-hidden="true">
                      <span />
                      <span />
                    </span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="program-cta-title" className="program-final-cta">
          <div className="section-wrap program-final-cta__inner">
            <div className="program-final-cta__copy">
              <p className="eyebrow">Satu langkah untuk mulai</p>
              <h2 id="program-cta-title">Siap Memulai Perjalanan Belajarmu?</h2>
              <p>
                Pilih program yang sesuai dengan kebutuhanmu dan mulai belajar
                dengan lebih terarah.
              </p>
              <div className="program-final-cta__actions">
                <Button href="#katalog" variant="light">
                  Lihat Program
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
                <Link className="program-final-cta__contact" href="/kontak">
                  Hubungi Kami
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
