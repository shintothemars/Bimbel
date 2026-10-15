import {
  ArrowDownRight,
  ArrowRight,
  Atom,
  BookOpen,
  BookOpenCheck,
  CalendarDays,
  Check,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  NotebookPen,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const benefits = [
  {
    icon: BookOpenCheck,
    title: "Materi yang terasa dekat",
    description:
      "Konsep rumit diurai jadi langkah kecil dengan contoh yang akrab di kehidupan sehari-hari.",
    tone: "mint",
  },
  {
    icon: HeartHandshake,
    title: "Tutor yang mendampingi",
    description:
      "Belajar bukan soal cepat-cepat selesai. Ada tutor yang siap mendengar, menjelaskan, dan menyemangati.",
    tone: "peach",
  },
  {
    icon: CalendarDays,
    title: "Jadwal lebih fleksibel",
    description:
      "Pilih waktu belajar yang cocok dengan rutinitas sekolah dan kegiatanmu yang lain.",
    tone: "lavender",
  },
  {
    icon: Lightbulb,
    title: "Progres yang terasa",
    description:
      "Latihan terarah membantu siswa melihat perkembangan dan tahu apa yang perlu dipelajari berikutnya.",
    tone: "yellow",
  },
];

const programs = [
  {
    icon: BookOpen,
    subject: "Fondasi belajar",
    title: "Bimbel SD",
    description:
      "Bangun rasa ingin tahu dan kuasai dasar Matematika, Bahasa Indonesia, serta IPA.",
    levels: "Kelas 1–6 SD",
    color: "program-card--mint",
    tag: "Belajar dengan percaya diri",
  },
  {
    icon: Atom,
    subject: "Persiapan masa depan",
    title: "Bimbel SMP",
    description:
      "Pahami konsep inti dan berlatih terarah untuk pelajaran sekolah sehari-hari.",
    levels: "Kelas 7–9 SMP",
    color: "program-card--blue",
    tag: "Pahami konsep, bukan hafalan",
  },
  {
    icon: GraduationCap,
    subject: "Melangkah lebih jauh",
    title: "Bimbel SMA",
    description:
      "Perdalam materi dan susun strategi belajar sesuai target akademikmu.",
    levels: "Kelas 10–12 SMA",
    color: "program-card--peach",
    tag: "Siap menghadapi tantangan",
  },
];

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Pilih program",
    description: "Temukan jenjang dan fokus belajar yang paling sesuai.",
  },
  {
    number: "02",
    icon: NotebookPen,
    title: "Daftar dengan mudah",
    description: "Ceritakan kebutuhan belajar siswa kepada tim kami.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Atur jadwal",
    description: "Pilih waktu belajar yang nyaman untuk keluarga.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Mulai bertumbuh",
    description: "Belajar bersama tutor dan rayakan setiap kemajuan.",
  },
];

const tutors = [
  {
    name: "Kak Alya",
    subject: "Matematika · SD & SMP",
    initials: "AL",
    color: "avatar--mint",
    note: "Suka menjelaskan lewat permainan logika",
  },
  {
    name: "Kak Bima",
    subject: "IPA · SMP & SMA",
    initials: "BM",
    color: "avatar--peach",
    note: "Menghubungkan sains dengan keseharian",
  },
  {
    name: "Kak Naya",
    subject: "Bahasa Indonesia · SD & SMP",
    initials: "NY",
    color: "avatar--lavender",
    note: "Mengajak siswa belajar lewat cerita",
  },
];

const testimonials = [
  {
    quote:
      "Awalnya aku suka bingung mulai belajar dari mana. Sekarang pelajarannya dibagi jadi bagian kecil, jadi lebih berani mencoba.",
    name: "Dina",
    detail: "Siswa SMP · cerita contoh",
    initials: "D",
    color: "avatar--mint",
  },
  {
    quote:
      "Yang saya harapkan adalah anak merasa nyaman bertanya. Pendekatan belajar yang sabar seperti ini terasa cocok untuk keluarga kami.",
    name: "Bu Rani",
    detail: "Orang tua · cerita contoh",
    initials: "R",
    color: "avatar--peach",
  },
];

const faqs = [
  {
    question: "Program Modern Brilliant cocok untuk siapa?",
    answer:
      "Program kami dirancang untuk siswa SD, SMP, dan SMA yang ingin memperkuat pemahaman pelajaran sekolah dengan pendampingan yang lebih personal.",
  },
  {
    question: "Apakah jadwal belajarnya bisa disesuaikan?",
    answer:
      "Bisa. Sampaikan waktu yang paling nyaman saat menghubungi tim kami. Jadwal akan dibicarakan bersama agar sesuai dengan rutinitas siswa dan ketersediaan tutor.",
  },
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Pilih program yang diminati, lalu gunakan tombol daftar untuk menghubungi tim Modern Brilliant. Tim akan membantu menjelaskan langkah berikutnya.",
  },
  {
    question: "Apakah tersedia kelas online atau tatap muka?",
    answer:
      "Pilihan metode belajar dapat dikonfirmasi saat pendaftaran. Hubungi tim kami untuk informasi ketersediaan kelas di wilayah dan jadwalmu.",
  },
];

function HeroIllustration() {
  return (
    <div className="hero-art" aria-label="Ilustrasi suasana belajar yang ceria">
      <div className="hero-art__orbit hero-art__orbit--one" />
      <div className="hero-art__orbit hero-art__orbit--two" />
      <div className="hero-art__spark hero-art__spark--one">
        <Sparkles size={20} aria-hidden="true" />
      </div>
      <div className="hero-art__spark hero-art__spark--two">
        <Sparkles size={15} aria-hidden="true" />
      </div>
      <div className="hero-art__note hero-art__note--left">
        <span className="hero-art__note-icon">
          <BookOpenCheck size={19} aria-hidden="true" />
        </span>
        <span>
          <strong>Belajar paham</strong>
          <small>Selangkah demi selangkah</small>
        </span>
      </div>
      <div className="hero-art__note hero-art__note--right">
        <span className="hero-art__check">
          <Check size={17} strokeWidth={3} aria-hidden="true" />
        </span>
        <span>
          <strong>Progres hari ini</strong>
          <small>Satu langkah lebih maju</small>
        </span>
      </div>
      <svg
        className="hero-art__illustration"
        viewBox="0 0 520 490"
        role="img"
        aria-labelledby="hero-illustration-title"
      >
        <title id="hero-illustration-title">
          Buku terbuka, pensil, dan tanaman di meja belajar
        </title>
        <ellipse cx="261" cy="417" rx="190" ry="24" fill="#d9e9db" />
        <path
          d="M105 365c-18-57-11-112 13-161 15 46 26 92 22 139m-22-72c-27-28-41-59-40-91 29 22 48 52 57 88m-31 21c-22-17-36-38-42-65 26 11 46 29 59 54"
          fill="none"
          stroke="#4c9a6b"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
        />
        <path d="M78 367h88l-9 43H88z" fill="#e9a77e" />
        <path d="M85 367h74l-5 14H89z" fill="#f4c39f" />
        <path
          d="M184 360c27-17 54-18 78-6 25-12 52-11 79 6v-165c-27-14-53-15-79-4-25-11-51-10-78 4z"
          fill="#fffefa"
          stroke="#203d47"
          strokeLinejoin="round"
          strokeWidth="5"
        />
        <path
          d="M262 190v170m-54-132c15-6 29-6 43-1m-43 24c15-6 29-6 43-1m-43 24c15-6 29-6 43-1m33-46c14-5 28-5 43 1m-43 23c14-5 28-5 43 1m-43 23c14-5 28-5 43 1"
          fill="none"
          stroke="#93bca1"
          strokeLinecap="round"
          strokeWidth="5"
        />
        <path d="M184 360c27-17 54-18 78-6v17c-25-11-51-10-78 4zm78-6c25-12 52-11 79 6v15c-27-17-54-18-79-5z" fill="#c8e4ce" />
        <path
          d="m353 341 30-154c2-10 17-8 15 2l-27 155z"
          fill="#efb45e"
          stroke="#203d47"
          strokeLinejoin="round"
          strokeWidth="4"
        />
        <path d="m383 187 8-21 7 24z" fill="#e79b82" stroke="#203d47" strokeLinejoin="round" strokeWidth="4" />
        <path d="M156 375h211" stroke="#203d47" strokeLinecap="round" strokeWidth="7" />
        <path d="m402 250 7-13 7 13 14 7-14 7-7 14-7-14-14-7z" fill="#f2c565" />
        <circle cx="139" cy="184" r="10" fill="#f2c565" />
        <circle cx="394" cy="333" r="7" fill="#88b798" />
      </svg>
      <div className="hero-art__caption">
        <span className="hero-art__caption-dot" />
        <span>Ruang untuk tumbuh, satu pelajaran setiap hari</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero section-wrap" id="beranda" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__line" />
              Temani perjalanan belajarmu
            </p>
            <h1 id="hero-title">
              Belajar Lebih Cerdas,
              <span> Raih Masa Depan Gemilang.</span>
            </h1>
            <p className="hero__description">
              Ruang belajar yang hangat untuk memahami pelajaran, menemukan
              percaya diri, dan tumbuh dengan cara yang paling cocok untukmu.
            </p>
            <div className="hero__actions">
              <Button href="#program" icon>
                Lihat Program Bimbel
              </Button>
              <Button href="#daftar" variant="secondary">
                Daftar Sekarang
                <ArrowDownRight size={17} aria-hidden="true" />
              </Button>
            </div>
            <div className="hero__reassurance">
              <span className="hero__reassurance-icon">
                <Check size={15} strokeWidth={3} aria-hidden="true" />
              </span>
              <span>Belajar sesuai ritmemu, didampingi dengan sepenuh hati</span>
            </div>
          </div>
          <HeroIllustration />
          <a className="hero__scroll" href="#manfaat">
            Kenali cara belajar yang berbeda
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </section>

        <section className="benefits section-pad" id="manfaat">
          <div className="section-wrap">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Belajar dengan lebih berarti</p>
              <h2>
                Bukan cuma belajar.
                <span> Bertumbuh bersama.</span>
              </h2>
              <p>
                Setiap anak punya cara belajar yang berbeda. Kami hadir untuk
                membantu menemukan cara yang terasa pas.
              </p>
            </div>
            <div className="benefit-grid">
              {benefits.map(({ icon: Icon, title, description, tone }) => (
                <article className="benefit-card" key={title}>
                  <div className={`icon-tile icon-tile--${tone}`}>
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="programs section-pad" id="program">
          <div className="section-wrap">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">Program bimbingan belajar</p>
                <h2>
                  Langkah yang tepat
                  <span> untuk setiap jenjang.</span>
                </h2>
              </div>
              <p>
                Temukan pendampingan yang sesuai dengan kebutuhan belajar dan
                tahap perjalanan sekolahmu.
              </p>
            </div>
            <div className="program-grid">
              {programs.map(
                ({ icon: Icon, subject, title, description, levels, color, tag }) => (
                  <article className={`program-card ${color}`} key={title}>
                    <div className="program-card__top">
                      <span className="program-card__icon">
                        <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span className="program-card__level">{levels}</span>
                    </div>
                    <p className="program-card__subject">{subject}</p>
                    <h3>{title}</h3>
                    <p className="program-card__description">{description}</p>
                    <p className="program-card__tag">
                      <Check size={15} aria-hidden="true" />
                      {tag}
                    </p>
                    <a className="program-card__link" href="#daftar">
                      Kenali program
                      <ArrowRight size={17} aria-hidden="true" />
                    </a>
                  </article>
                ),
              )}
            </div>
            <p className="programs__note">
              Belum yakin program mana yang cocok?{" "}
              <a href="#kontak">Kami siap membantu memilih.</a>
            </p>
          </div>
        </section>

        <section className="how-it-works section-pad" id="cara-kerja">
          <div className="section-wrap">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Mulai dengan mudah</p>
              <h2>
                Empat langkah kecil,
                <span> semangat baru yang besar.</span>
              </h2>
              <p>
                Dari memilih kelas sampai memulai pelajaran, tim kami akan
                menemani setiap langkahnya.
              </p>
            </div>
            <ol className="steps-grid">
              {steps.map(({ number, icon: Icon, title, description }) => (
                <li className="step-card" key={number}>
                  <div className="step-card__top">
                    <span className="step-card__icon">
                      <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="step-card__number">{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="tutors section-pad" id="tutor">
          <div className="section-wrap">
            <div className="tutor-intro">
              <div className="section-heading">
                <p className="eyebrow">Teman belajar pilihan</p>
                <h2>
                  Tutor yang hadir,
                  <span> bukan sekadar mengajar.</span>
                </h2>
                <p>
                  Kenali contoh profil tutor yang menggambarkan semangat
                  pendampingan Modern Brilliant.
                </p>
              </div>
              <div className="demo-note">
                <span className="demo-note__icon">
                  <UsersRound size={19} aria-hidden="true" />
                </span>
                <p>
                  <strong>Profil demonstrasi</strong>
                  Nama dan deskripsi berikut adalah contoh, bukan data tutor
                  aktual.
                </p>
              </div>
            </div>
            <div className="tutor-grid">
              {tutors.map(({ name, subject, initials, color, note }) => (
                <article className="tutor-card" key={name}>
                  <div className={`tutor-card__avatar ${color}`} aria-hidden="true">
                    {initials}
                  </div>
                  <div className="tutor-card__body">
                    <p className="tutor-card__label">Contoh profil tutor</p>
                    <h3>{name}</h3>
                    <p className="tutor-card__subject">{subject}</p>
                    <p className="tutor-card__note">{note}</p>
                  </div>
                  <span className="tutor-card__sparkle" aria-hidden="true">
                    <Sparkles size={18} />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials section-pad" id="cerita">
          <div className="section-wrap">
            <div className="section-heading section-heading--center">
              <p className="eyebrow">Cerita tentang belajar</p>
              <h2>
                Ruang untuk mencoba,
                <span> berani, dan berkembang.</span>
              </h2>
              <p>
                Contoh cerita berikut menunjukkan pengalaman yang ingin kami
                hadirkan untuk setiap keluarga.
              </p>
            </div>
            <div className="testimonial-grid">
              {testimonials.map(
                ({ quote, name, detail, initials, color }) => (
                  <figure className="testimonial-card" key={name}>
                    <span className="testimonial-card__quote-mark" aria-hidden="true">
                      “
                    </span>
                    <blockquote>{quote}</blockquote>
                    <figcaption>
                      <span className={`testimonial-card__avatar ${color}`}>
                        {initials}
                      </span>
                      <span>
                        <strong>{name}</strong>
                        <small>{detail}</small>
                      </span>
                    </figcaption>
                  </figure>
                ),
              )}
            </div>
            <p className="testimonials__disclaimer">
              Cerita di atas adalah konten ilustratif, bukan ulasan siswa atau
              orang tua yang telah diverifikasi.
            </p>
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="section-wrap faq__layout">
            <div className="section-heading">
              <p className="eyebrow">Ada yang ingin ditanyakan?</p>
              <h2>
                Jawaban untuk
                <span> hal yang sering ditanyakan.</span>
              </h2>
              <p>
                Masih ada yang ingin diketahui? Tim kami dengan senang hati
                membantu.
              </p>
              <a className="text-link" href="#kontak">
                Hubungi tim kami
                <ArrowRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="faq-list">
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

        <section className="final-cta" id="daftar">
          <div className="section-wrap final-cta__inner">
            <span className="final-cta__decoration final-cta__decoration--one">
              <Sparkles size={28} aria-hidden="true" />
            </span>
            <span className="final-cta__decoration final-cta__decoration--two">
              <BookOpen size={31} aria-hidden="true" />
            </span>
            <div className="final-cta__copy">
              <p className="eyebrow eyebrow--light">Masa depan dimulai hari ini</p>
              <h2>
                Siap menemukan
                <span> serunya belajar?</span>
              </h2>
              <p>
                Ceritakan tujuan belajarmu. Mari cari langkah berikutnya
                bersama-sama.
              </p>
              <Button href="#kontak" variant="light">
                Yuk, mulai ngobrol
                <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
