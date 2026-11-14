import React, { useRef, useEffect } from 'react';

const CarouselRail: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const railRef = useRef<HTMLDivElement>(null);
  const dir = useRef(1);

  const prefersReduced = 
    typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  useEffect(() => {
    if (prefersReduced || !railRef.current) return undefined;

    const rail = railRef.current;
    const scrollInterval = setInterval(() => {
        const { scrollLeft, scrollWidth, clientWidth } = rail;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          dir.current = -1;
        } else if (scrollLeft <= 0) {
          dir.current = 1;
        }
        rail.scrollLeft += 1.2 * dir.current;
    }, 40);

    return () => clearInterval(scrollInterval);
  }, [prefersReduced]);

  return (
    <div
      ref={railRef}
      className="flex w-full space-x-6 overflow-x-auto snap-x snap-mandatory pb-6"
      style={{ scrollbarWidth: 'none', '--ms-overflow-style': 'none' } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default CarouselRail;
