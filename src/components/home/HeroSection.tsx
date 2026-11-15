import { useState, useEffect } from 'react';

const TEAL = '#1ea2b1';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center pt-20"
    >
      {/* Real commute photo, visible behind a scrim */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/lovable-uploads/uthutho-commute.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-black/80 to-background/95" />
      </div>

      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 py-8 md:py-16">
        <div className="text-center md:text-left md:w-1/2 mb-12 md:mb-0">
          <p
            className={`text-sm font-bold tracking-[2px] text-white/70 transition-all duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            COMMUNITY-POWERED COMMUTING
          </p>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-quiapo mb-6 text-white transform transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span
              className="inline-block rounded-2xl px-3 py-0.5 text-white"
              style={{ backgroundColor: TEAL }}
            >
              Uthutho
            </span>{' '}
            is South Africa&apos;s community-powered transport platform.
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl font-inter transform transition-all duration-700 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Live taxi and route updates, school transport visibility for
            parents, and commuter insights — powered by the people who travel
            every day.
          </p>

          <div
            className={`transform transition-all duration-700 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {/* Two primary actions only */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-6">
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.03]"
                style={{ backgroundColor: TEAL }}
              >
                Download App
              </a>
              <a
                href="#business-solutions"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40"
              >
                Partner With Us
              </a>
            </div>

            {/* Store badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.softglitch.uthutho&hl=en_ZA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQobhWPz0ruWVxG5fiJVRf3ctDkP-Yym8XSCY4VNXTXW1sOz0Z6"
                  alt="Get it on Google Play"
                  className="h-11"
                />
              </a>
              <a
                href="https://appgallery.huawei.com/app/C116453879"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://firstimpact.co.za/wp-content/uploads/2024/02/huawei-Badge-Black-huawei-app-gallery-1-1024x307.png"
                  alt="Available on Huawei AppGallery"
                  className="h-11"
                />
              </a>
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://appassets.mvtdev.com/index/public-transit-resources/img/store-buttons/web_app-badge_en.webp"
                  alt="Web App"
                  className="h-11"
                />
              </a>
            </div>

            {/* One slim trust line */}
            <p className="text-xs text-white/60 max-w-xl">
              Built for South African commuters · Community-powered journey
              intelligence · Recognised local transport innovation
            </p>
          </div>
        </div>

        {/* Phone preview */}
        <div
          className={`w-full md:w-1/2 mt-12 md:mt-0 flex justify-center transition-all duration-700 delay-400 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] mx-auto pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-orange to-brand-red opacity-20 blur-2xl rounded-full" />
            <div className="relative z-10 bg-black/60 rounded-[40px] p-3 shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[32px] h-[530px] sm:h-[610px]">
                <iframe
                  className="w-full h-full absolute top-0 left-0 scale-[1.02]"
                  src="https://www.youtube.com/embed/AFaaiVxz0LU?autoplay=1&mute=1&loop=1&playlist=AFaaiVxz0LU&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1"
                  title="Uthutho App Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;