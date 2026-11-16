import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

const TEAL = '#1ea2b1';

/* TikTok Icon (lucide-react does not include TikTok) */
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M21 8.5c-1.9 0-3.7-.6-5.1-1.8v8.3c0 4.2-3.4 7.5-7.6 7.5S.8 19.2.8 15s3.4-7.5 7.6-7.5c.4 0 .9 0 1.3.1v3.9c-.4-.1-.8-.2-1.3-.2-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V.5h4c.3 1.9 2.2 4 5.1 4v4z" />
  </svg>
);

const Footer = () => {
  const location = useLocation();

  /* ------------------------------------------------------------
     Blur + immediate scroll reset on any navigation click
     ------------------------------------------------------------ */
  const handleNavClick = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).blur();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/uthuthorsa/',
      Icon: Facebook,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/uthuthorsa/',
      Icon: Instagram,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/uthutho/',
      Icon: Linkedin,
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Uthutho',
      Icon: Youtube,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@uthuthorsa',
      Icon: TikTokIcon,
    },
  ];

  return (
    <footer id="contact" className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link
              to="/"
              onClick={(e) => {
                (e.currentTarget as HTMLElement).blur();
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                }
              }}
              className="inline-block mb-6"
            >
              {/* Updated Brand Text with Teal Dot and League Spartan Font */}
              <span className="text-2xl font-extrabold tracking-tight text-white font-league-spartan flex items-center">
                Uthutho<span style={{ color: TEAL }}>.</span>
              </span>
            </Link>
            <p className="text-gray-400">
              Community-powered transport intelligence for commuters, parents,
              and partners across South Africa.
            </p>
          </div>

          {/* Feedback */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Feedback</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/feedback"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Give us feedback
                </Link>
              </li>
              <li>
                <Link
                  to="/ratings"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Rate our app
                </Link>
              </li>
              <li>
                <Link
                  to="/suggest-a-stop"
                  onClick={handleNavClick}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Suggest a stop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Cape Town, South Africa</li>
              <li>
                <a
                  href="mailto:info@uthutho.co.za"
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  info@uthutho.co.za
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="text-gray-400 hover:text-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>

            <div className="space-y-2">
              <Link
                to="/privacy-policy"
                onClick={handleNavClick}
                className="text-gray-400 hover:text-secondary transition-colors block"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                onClick={handleNavClick}
                className="text-gray-400 hover:text-secondary transition-colors block"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/10">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Uthutho. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;