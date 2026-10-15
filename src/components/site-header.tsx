import { ArrowUpRight, BookOpenCheck, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  activePage?: "home" | "program" | "schedule" | "about" | "contact";
};

const navItems = [
  { label: "Beranda", href: "/", page: "home" },
  { label: "Program Bimbel", href: "/program", page: "program" },
  { label: "Jadwal", href: "/jadwal", page: "schedule" },
  { label: "Tentang Kami", href: "/tentang-kami", page: "about" },
  { label: "Kontak", href: "/kontak", page: "contact" },
];

function NavigationLinks({ activePage }: SiteHeaderProps) {
  return (
    <>
      {navItems.map(({ label, href, page }) => (
        <Link
          aria-current={page === activePage ? "page" : undefined}
          className={page === activePage ? "site-header__nav-link--active" : undefined}
          href={href}
          key={label}
        >
          {label}
        </Link>
      ))}
    </>
  );
}

export function SiteHeader({ activePage = "home" }: SiteHeaderProps) {
  return (
    <header
      className={`site-header${activePage === "program" ? " site-header--program" : ""}${activePage === "schedule" ? " site-header--schedule" : ""}${activePage === "about" ? " site-header--about" : ""}${activePage === "contact" ? " site-header--contact" : ""}`}
    >
      <div className="section-wrap site-header__inner">
        <Link
          aria-label="Modern Brilliant, kembali ke beranda"
          className="brand"
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

        <nav aria-label="Navigasi utama" className="site-header__nav">
          <NavigationLinks activePage={activePage} />
        </nav>

        <div className="site-header__actions">
          <Link className="site-header__login" href="/login">
            Masuk
          </Link>
          <Button href="/register">
            Daftar
            <ArrowUpRight size={16} aria-hidden="true" />
          </Button>
        </div>

        <details className="mobile-menu">
          <summary aria-label="Buka navigasi">
            <Menu size={23} aria-hidden="true" />
          </summary>
          <nav aria-label="Navigasi seluler" className="mobile-menu__panel">
            <NavigationLinks activePage={activePage} />
            <Link className="mobile-menu__login" href="/login">
              Masuk
            </Link>
            <Link className="mobile-menu__register" href="/register">
              Daftar sekarang
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
