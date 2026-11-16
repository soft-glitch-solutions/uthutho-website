import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

const TEAL = '#1ea2b1';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isFirstRender = useRef(true);
  const prevPathRef = useRef(location.pathname);

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/features' },
    { label: 'Flow', to: '/flow' },
    { label: 'Partners', to: '/partners' },
    { label: 'Media', to: '/media' },
    { label: 'Contact', to: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = pathname;
      return;
    }
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, left: 0 });
        }
      }, 0);
      return () => window.clearTimeout(t);
    }

    const raf = requestAnimationFrame(() => {
      window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 0);
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isMobile && isOpen) setIsOpen(false);
  }, [isMobile, isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).blur();
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    isScrolled
      ? 'bg-background/80 backdrop-blur-lg border-b border-border/50'
      : 'bg-transparent'
  }`;

  return (
    <header className={navClass}>
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={(e) => {
              (e.currentTarget as HTMLElement).blur();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              } else {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
              }
              setIsOpen(false);
            }}
            className="flex shrink-0 items-center gap-2"
          >
            {/* Original Image Logo Restored */}
            <img
              src="/lovable-uploads/e9056cae-b62d-4515-aae1-ac0e16261d24.png"
              alt="Uthutho Logo Icon"
              className="h-8 w-auto"
            />
            {/* Updated Brand Text with Teal Dot */}
            <span className="text-xl font-extrabold tracking-tight text-foreground font-league-spartan flex items-center">
              Uthutho<span style={{ color: TEAL }}>.</span>
            </span>
          </Link>

          {!isMobile && (
            <nav className="flex items-center space-x-8 text-sm font-medium text-muted-foreground">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={handleNavClick}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center justify-end">
            {isMobile ? (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            ) : (
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:scale-105 shadow-[0_0_15px_rgba(30,162,177,0.3)]"
                style={{ backgroundColor: TEAL }}
              >
                Check My Route
              </a>
            )}
          </div>
        </div>
      </div>

      {isMobile && isOpen && (
        <div className="absolute top-full left-0 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50">
          <nav className="flex flex-col space-y-4 p-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={handleNavClick}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.mobile.uthutho.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-full px-6 py-3 text-center text-lg font-bold text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              Check My Route
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;