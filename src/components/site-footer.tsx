import { ArrowUpRight, BookOpenCheck, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "Program bimbel", href: "/program" },
  { label: "Jadwal belajar", href: "/jadwal" },
  { label: "Tentang kami", href: "/tentang-kami" },
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
            <a
              className="site-footer__contact-link"
              href="mailto:halo@modernbrilliant.example"
            >
              <Mail size={17} aria-hidden="true" />
              halo@modernbrilliant.example
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <p className="site-footer__placeholder">
              <MapPin size={16} aria-hidden="true" />
              Informasi lokasi akan segera tersedia
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
