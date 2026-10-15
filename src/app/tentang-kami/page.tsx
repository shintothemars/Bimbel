import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Compass,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  NotebookPen,
  Sprout,
  Target,
  UsersRound,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Tentang Kami | Modern Brilliant",
  description:
    "Kenali tujuan, nilai, dan pendekatan belajar Modern Brilliant untuk mendampingi perjalanan belajar siswa.",
};

const learningPrinciples = [
  {
    icon: Target,
    title: "Belajar Sesuai Kebutuhan",
    description:
      "Pembelajaran dapat diarahkan sesuai jenjang, materi, dan target belajar siswa.",
  },
  {
    icon: NotebookPen,
    title: "Materi Terstruktur",
    description:
      "Materi disusun bertahap agar siswa dapat membangun pemahaman dari dasar.",
  },
  {
    icon: HeartHandshake,
    title: "Pendampingan Belajar",
    description:
      "Siswa memperoleh arahan dan ruang bertanya sesuai program yang diikuti.",
  },
  {
    icon: Lightbulb,
    title: "Evaluasi Berkala",
    description:
      "Jika tersedia dalam program, evaluasi dapat membantu meninjau pemahaman dan langkah belajar berikutnya.",
  },
];

const values = [
  {
    icon: Compass,
    title: "Integritas",
    description:
      "Menyampaikan informasi belajar dengan jujur dan terbuka kepada siswa serta keluarga.",
  },
  {
    icon: HeartHandshake,
    title: "Kepedulian",
    description:
      "Menghargai kebutuhan, pertanyaan, dan proses belajar setiap siswa.",
  },
  {
    icon: CalendarDays,
    title: "Konsistensi",
    description:
      "Mendorong kebiasaan belajar yang teratur dan berkelanjutan.",
  },
  {
    icon: UsersRound,
    title: "Kolaborasi",
    description:
      "Mengupayakan komunikasi yang baik antara siswa, orang tua, dan pengajar.",
  },
  {
    icon: Sprout,
    title: "Semangat Bertumbuh",
    description:
      "Mengapresiasi rasa ingin tahu dan keberanian untuk terus belajar.",
  },
];

const learningJourney = [
  "Mengenali kebutuhan belajar",
  "Memilih program yang sesuai",
  "Mengikuti pembelajaran",
  "Meninjau perkembangan dan langkah berikutnya",
];

function IntroIllustration() {
  return (
    <div className="about-intro-art">
      <span className="about-intro-art__ring" />
      <span className="about-intro-art__spark about-intro-art__spark--one">
        <Sprout size={20} aria-hidden="true" />
      </span>
      <span className="about-intro-art__spark about-intro-art__spark--two">
        <Lightbulb size={18} aria-hidden="true" />
      </span>
      <div className="about-intro-art__book">
        <BookOpenCheck size={47} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="about-intro-art__caption">
        <span />
        Belajar, memahami, bertumbuh
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="about-section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <SiteHeader activePage="about" />
      <main>
        <section aria-labelledby="about-intro-title" className="about-intro">
          <div className="section-wrap">
            <nav aria-label="Breadcrumb" className="about-breadcrumb">
              <Link href="/">Beranda</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Tentang Kami</span>
            </nav>
            <div className="about-intro__layout">
              <div className="about-intro__copy">
                <p className="eyebrow">Tentang Modern Brilliant</p>
                <h1 id="about-intro-title">Mengenal Modern Brilliant</h1>
                <p>
                  Ruang belajar yang membantu siswa memahami materi,
                  mengembangkan potensi, dan membangun kebiasaan belajar yang
                  lebih terarah.
                </p>
              </div>
              <IntroIllustration />
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-story-title"
          className="about-story section-pad"
        >
          <div className="section-wrap about-story__layout">
            <div className="about-story__aside">
              <span className="about-story__icon">
                <MessageCircleHeart size={23} aria-hidden="true" />
              </span>
              <p className="about-story__aside-label">Belajar dengan tujuan</p>
              <p className="about-story__aside-copy">
                Memahami pelajaran adalah proses yang bisa dijalani setahap demi
                setahap.
              </p>
            </div>
            <div className="about-story__copy">
              <SectionHeading
                eyebrow="Mengapa kami hadir"
                id="about-story-title"
                title="Perjalanan Kami"
              />
              <p>
                Modern Brilliant hadir sebagai platform bimbingan belajar yang
                bertujuan membantu proses belajar terasa lebih terstruktur,
                mudah diikuti, dan menarik bagi siswa.
              </p>
              <p>
                Kami percaya bahwa belajar bukan hanya menyelesaikan materi.
                Dengan tujuan yang jelas, penjelasan yang bertahap, dan
                pendampingan sesuai program, siswa dapat membangun pemahaman dan
                kebiasaan belajar yang lebih baik.
              </p>
              <p className="about-placeholder-note">
                <strong>Catatan untuk pemilik:</strong> tambahkan kisah
                pendirian dan sejarah organisasi setelah informasi resminya
                tersedia. Tidak ada tahun atau riwayat pendirian yang
                dicantumkan di halaman ini.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-vision-title"
          className="about-vision section-pad"
        >
          <div className="section-wrap">
            <SectionHeading
              description="Arah dan komitmen yang ingin dibangun bersama komunitas belajar."
              eyebrow="Tujuan kami"
              id="about-vision-title"
              title="Visi dan Misi Kami"
            />
            <div className="about-vision__grid">
              <article className="about-vision-card about-vision-card--vision">
                <span className="about-card-icon">
                  <Compass size={22} aria-hidden="true" />
                </span>
                <p className="about-card-eyebrow">Visi</p>
                <h3>
                  Menjadi mitra belajar yang membantu setiap siswa
                  mengembangkan potensi akademik dan kepercayaan diri.
                </h3>
              </article>
              <article className="about-vision-card about-vision-card--mission">
                <span className="about-card-icon">
                  <Target size={22} aria-hidden="true" />
                </span>
                <p className="about-card-eyebrow">Misi</p>
                <ul>
                  <li>
                    Menyediakan pengalaman belajar yang terarah sesuai
                    kebutuhan siswa.
                  </li>
                  <li>
                    Membantu siswa memahami konsep, bukan sekadar menghafal.
                  </li>
                  <li>
                    Mendorong kebiasaan belajar yang konsisten dan mandiri.
                  </li>
                  <li>
                    Membangun komunikasi yang baik antara siswa, orang tua,
                    dan pengajar.
                  </li>
                </ul>
              </article>
            </div>
            <p className="about-copy-note">
              Visi dan misi di atas merupakan usulan naskah merek yang dapat
              ditinjau dan disesuaikan oleh pemilik usaha.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="about-approach-title"
          className="about-approach section-pad"
        >
          <div className="section-wrap">
            <SectionHeading
              description="Prinsip yang menjadi panduan dalam menyusun pengalaman belajar."
              eyebrow="Pendekatan belajar"
              id="about-approach-title"
              title="Cara Kami Membantu Siswa Belajar"
            />
            <div className="about-principles">
              {learningPrinciples.map(
                ({ icon: Icon, title, description }, index) => (
                  <article className="about-principle-card" key={title}>
                    <div className="about-principle-card__top">
                      <span className="about-card-icon">
                        <Icon size={21} aria-hidden="true" />
                      </span>
                      <span className="about-card-number">
                        0{index + 1}
                      </span>
                    </div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-values-title"
          className="about-values section-pad"
        >
          <div className="section-wrap">
            <SectionHeading
              description="Cara kami ingin hadir dalam setiap proses belajar."
              eyebrow="Pegangan bersama"
              id="about-values-title"
              title="Nilai yang Kami Pegang"
            />
            <div className="about-values__grid">
              {values.map(({ icon: Icon, title, description }) => (
                <article className="about-value-card" key={title}>
                  <span className="about-value-card__icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="about-experience-title"
          className="about-experience section-pad"
        >
          <div className="section-wrap about-experience__layout">
            <div>
              <SectionHeading
                description="Perjalanan belajar dimulai dengan memahami kebutuhan dan memilih langkah yang sesuai."
                eyebrow="Dari kebutuhan ke langkah berikutnya"
                id="about-experience-title"
                title="Pengalaman Belajar yang Terarah"
              />
              <p className="about-experience__note">
                Pilihan dan pelaksanaan langkah belajar bergantung pada program
                yang tersedia dan perlu dikonfirmasi bersama tim.
              </p>
              <Button href="/program" icon>
                Lihat Program Bimbel
              </Button>
            </div>
            <ol className="about-journey">
              {learningJourney.map((step, index) => (
                <li key={step}>
                  <span className="about-journey__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="about-cta-title" className="about-cta">
          <div className="section-wrap about-cta__inner">
            <span className="about-cta__icon">
              <Sprout size={25} aria-hidden="true" />
            </span>
            <h2 id="about-cta-title">Mari Temukan Cara Belajar yang Tepat</h2>
            <p>
              Kenali program kami dan temukan pilihan belajar yang sesuai
              dengan kebutuhanmu.
            </p>
            <div className="about-cta__actions">
              <Button href="/program" icon>
                Lihat Program Bimbel
              </Button>
              <Button href="/#kontak" variant="secondary">
                Hubungi Kami
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
            <p className="about-cta__contact-note">
              Informasi kontak saat ini tersedia pada halaman Beranda.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
