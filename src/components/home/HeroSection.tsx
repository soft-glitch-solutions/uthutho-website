import { useState, useEffect } from 'react';

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ba5b6f7 (Update new changes)
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const highlights = [
  ];
  const trustSignals = [
<<<<<<< HEAD

  ];
=======
/* ============================================================
   MOTION PRIMITIVES — Google Labs style
   ============================================================ */
>>>>>>> b4726a8 (Some changes i feel like we should go with)
=======
>>>>>>> ba5b6f7 (Update new changes)

  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/uthutho-commute.png')] bg-cover bg-center opacity-5"></div>
      </div>

      <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 py-8 md:py-16">
        <div className="text-center md:text-left md:w-1/2 mb-12 md:mb-0">
          <p className={`text-primary tracking-[2px] text-sm font-bold transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            COMMUNITY-POWERED COMMUTING
          </p>
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-quiapo mb-6 text-white transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            South Africa&apos;s Community-Powered Transport Platform
          </h1>
          <p className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl font-inter transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Get live multi-transport updates, smarter route information, school transport visibility, and commuter insights powered by the people who travel every day.
          </p>
          <div className={`grid gap-3 mb-8 max-w-2xl text-left transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm sm:text-base text-white/90 backdrop-blur-sm">
                {highlight}
              </div>
            ))}
          </div>
          <div className={`transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col items-center md:items-start mb-8 gap-4">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3">
                <a href="https://play.google.com/store/apps/details?id=com.softglitch.uthutho&hl=en_ZA" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                  <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQobhWPz0ruWVxG5fiJVRf3ctDkP-Yym8XSCY4VNXTXW1sOz0Z6" alt="Get it on Google Play" className="h-12"/>
                </a>
                <a href="https://appgallery.huawei.com/app/C116453879" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                  <img src="https://firstimpact.co.za/wp-content/uploads/2024/02/huawei-Badge-Black-huawei-app-gallery-1-1024x307.png" alt="Available on Huawei AppGallery" className="h-12"/>
                </a>
                <a href="https://www.mobile.uthutho.co.za/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                  <img src="https://appassets.mvtdev.com/index/public-transit-resources/img/store-buttons/web_app-badge_en.webp" alt="Web App" className="h-12"/>
                </a>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 w-full max-w-2xl">
                {trustSignals.map((signal) => (
                  <div key={signal} className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-xs sm:text-sm text-white/80">
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={prefersReduced ? undefined : { y: phoneY, scale: phoneScale }}
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ ...SOFT_SPRING, delay: 0.4 }}
          className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center"
        >
          <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] mx-auto pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-orange to-brand-red opacity-20 blur-2xl rounded-full"></div>
            <div className="relative z-10 bg-black/60 rounded-[40px] p-3 shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[32px] h-[530px] sm:h-[610px]">
                <iframe
                  className="w-full h-full absolute top-0 left-0 scale-[1.02]"
                  src="https://www.youtube.com/embed/AFaaiVxz0LU?autoplay=1&mute=1&loop=1&playlist=AFaaiVxz0LU&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1"
                  title="Uthutho App Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;