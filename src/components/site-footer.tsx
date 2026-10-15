import { ArrowUpRight, BookOpenCheck, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { contactInfo, getEmailUrl } from "@/lib/contact-info";

const contactEmailUrl = getEmailUrl(contactInfo.email);

const footerLinks = [
  { label: "Program bimbel", href: "/program" },
  { label: "Jadwal belajar", href: "/jadwal" },
  { label: "Tentang kami", href: "/tentang-kami" },
  { label: "Kontak", href: "/kontak" },
  { label: "Cara kerja", href: "/#cara-kerja" },
  { label: "Tutor", href: "/#tutor" },
  { label: "Pertanyaan umum", href: "/#faq" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="kontak">
      <div className="section-wrap">
        <div className="site-footer__main">
          <div className="site-footer__brand-block">
            <Link
              aria-label="Modern Brilliant, kembali ke beranda"
              className="brand brand--footer"
              href="/"
            >
              <span className="brand__mark">
                <BookOpenCheck size={22} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="brand__wordmark">
                <strong>modern</strong>
                <span>brilliant</span>
              </span>
            </Link>
            <p>
              Ruang belajar yang hangat untuk memahami pelajaran dan tumbuh
              dengan percaya diri.
            </p>
          </div>

          <div className="site-footer__links">
            <h2>Jelajahi</h2>
            <nav aria-label="Navigasi footer">
              {footerLinks.map(({ label, href }) => (
                <Link href={href} key={label}>
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="site-footer__contact">
            <h2>Mari terhubung</h2>
            <p>
              Ingin bertanya tentang program? Hubungi kami untuk informasi
              lebih lanjut.
            </p>
            {contactEmailUrl ? (
              <a className="site-footer__contact-link" href={contactEmailUrl}>
                <Mail size={17} aria-hidden="true" />
                {contactInfo.email}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <Link className="site-footer__contact-link" href="/kontak">
                <Mail size={17} aria-hidden="true" />
                Informasi kontak
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            )}
            <p className="site-footer__placeholder">
              <MapPin size={16} aria-hidden="true" />
              {contactInfo.address ?? "Informasi lokasi belum dikonfigurasi"}
            </p>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© Modern Brilliant. Belajar, tumbuh, bersinar.</p>
          <Link href="/#beranda">Kembali ke atas ↑</Link>
        </div>
      </div>
    </footer>
  );
}
