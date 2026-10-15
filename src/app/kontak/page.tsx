import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  contactInfo,
  getEmailUrl,
  getMapUrl,
  getWhatsAppUrl,
} from "@/lib/contact-info";

export const metadata: Metadata = {
  title: "Kontak | Modern Brilliant",
  description:
    "Hubungi Modern Brilliant untuk bertanya tentang program, jadwal, biaya, dan proses pendaftaran.",
};

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: contactInfo.whatsappPhone,
    missing: "Nomor WhatsApp belum dikonfigurasi.",
    href: getWhatsAppUrl(contactInfo.whatsappPhone),
  },
  {
    icon: Mail,
    title: "Email",
    value: contactInfo.email,
    missing: "Alamat email belum dikonfigurasi.",
    href: getEmailUrl(contactInfo.email),
  },
  {
    icon: MapPin,
    title: "Alamat lokasi",
    value: contactInfo.address,
    missing: "Informasi alamat belum dikonfigurasi.",
    href: getMapUrl(contactInfo.mapUrl),
  },
  {
    icon: Clock3,
    title: "Jam operasional",
    value: contactInfo.operatingHours,
    missing: "Jam operasional belum dikonfigurasi.",
    href: null,
  },
];

const faqs = [
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Pilih program yang ingin ditanyakan, lalu kirim pertanyaan melalui formulir ini. Saat layanan penerimaan pesan tersedia, tim dapat membantu menjelaskan langkah pendaftaran.",
  },
  {
    question: "Bagaimana memilih program bimbel?",
    answer:
      "Kamu dapat melihat pilihan program berdasarkan jenjang dan fokus belajar di halaman Program Bimbel. Katalog saat ini berisi contoh dan ketersediaan perlu dikonfirmasi.",
  },
  {
    question: "Bagaimana mengetahui jadwal kelas?",
    answer:
      "Halaman Jadwal menampilkan data demonstrasi. Untuk mengetahui jadwal aktual, tanyakan kepada tim Modern Brilliant melalui kanal kontak yang telah dikonfigurasi.",
  },
  {
    question: "Bagaimana mendapatkan informasi biaya?",
    answer:
      "Biaya belum dicantumkan dalam katalog. Pilih topik “Biaya Bimbel” pada formulir untuk menanyakannya setelah layanan penerimaan pesan diaktifkan.",
  },
  {
    question: "Apakah tersedia kelas online?",
    answer:
      "Format belajar pada katalog saat ini merupakan contoh. Hubungi tim untuk memastikan format kelas yang tersedia.",
  },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SiteHeader activePage="contact" />
      <main>
        <section aria-labelledby="contact-title" className="contact-main">
          <div className="section-wrap">
            <nav aria-label="Breadcrumb" className="contact-breadcrumb">
              <Link href="/">Beranda</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Kontak</span>
            </nav>
            <div className="contact-heading">
              <p className="eyebrow">Kami siap mendengarkan</p>
              <h1 id="contact-title">Hubungi Kami</h1>
              <p>
                Punya pertanyaan tentang program, jadwal, atau pendaftaran?
                Kirim pesan kepada tim Modern Brilliant.
              </p>
            </div>

            <div className="contact-layout">
              <section
                aria-labelledby="contact-form-title"
                className="contact-form-panel"
              >
                <div className="contact-panel-heading">
                  <div>
                    <p className="eyebrow">Formulir pertanyaan</p>
                    <h2 id="contact-form-title">Kirim Pesan kepada Kami</h2>
                  </div>
                  <span className="contact-panel-heading__icon">
                    <MessageCircle size={21} aria-hidden="true" />
                  </span>
                </div>
                <p className="contact-form-panel__intro">
                  Isi detail pertanyaanmu. Formulir akan memeriksa data, tetapi
                  pesan belum dapat dikirim sampai kanal penerimaan dikonfigurasi.
                </p>
                <ContactForm />
              </section>

              <aside aria-labelledby="contact-info-title" className="contact-info">
                <div className="contact-info__heading">
                  <p className="eyebrow">Informasi kontak</p>
                  <h2 id="contact-info-title">Kanal untuk terhubung</h2>
                  <p>
                    Detail berikut hanya dapat digunakan setelah informasi resmi
                    ditambahkan oleh pengelola.
                  </p>
                </div>
                <div className="contact-info__cards">
                  {contactMethods.map(
                    ({ icon: Icon, title, value, missing, href }) => (
                      <article className="contact-info-card" key={title}>
                        <span className="contact-info-card__icon">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <div>
                          <h3>{title}</h3>
                          {value && href ? (
                            <a
                              href={href}
                              rel={href.startsWith("https:") ? "noreferrer" : undefined}
                              target={href.startsWith("https:") ? "_blank" : undefined}
                            >
                              {value}
                              {title === "Alamat lokasi" && (
                                <Navigation size={13} aria-hidden="true" />
                              )}
                            </a>
                          ) : (
                            <p>{missing}</p>
                          )}
                        </div>
                      </article>
                    ),
                  )}
                </div>

                <div className="contact-info__note">
                  <strong>Kontak langsung belum tersedia.</strong>
                  <p>
                    Nomor WhatsApp, email, alamat, dan jam operasional belum
                    diberikan. Tidak ada tautan kontak contoh yang akan membuka
                    kanal palsu.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="contact-faq-title"
          className="contact-faq section-pad"
        >
          <div className="section-wrap contact-faq__layout">
            <div className="contact-section-heading">
              <p className="eyebrow">Sebelum mengirim pesan</p>
              <h2 id="contact-faq-title">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p>
                Informasi program dan jadwal demonstrasi perlu dikonfirmasi
                sebelum digunakan.
              </p>
            </div>
            <div className="contact-faq__list">
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

        <nav aria-label="Halaman terkait" className="contact-related">
          <div className="section-wrap contact-related__inner">
            <p>Jelajahi pilihan belajar lainnya</p>
            <div>
              <Link href="/program">
                Lihat Program Bimbel
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/jadwal">
                Lihat Jadwal
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
