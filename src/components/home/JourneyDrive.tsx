import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from 'framer-motion';
import { User } from 'lucide-react';

// Import images properly
import taxiIcon from '/lovable-uploads/taxi-icon.png';
import stopSignIcon from '/lovable-uploads/Stop-Road-Sign.png';

/* ============================================================
   MOTION PRIMITIVES — Google Labs style (matches Home.tsx)
   ============================================================ */

const TEAL = '#1ea2b1';
const ORANGE = '#f18f01';
const PINK = '#e151af';

const SPRING: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

const SOFT_SPRING: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 22,
  mass: 1,
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SPRING },
  },
};

const riseLg: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SOFT_SPRING },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SPRING },
  },
};

const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

const viewportOnce = { once: true, amount: 0.2 } as const;

/* ============================================================
   MAGNETIC CARD
   ============================================================ */

const MagneticCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className, strength = 8 }) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setPos({
      x: ((e.clientX - cx) / r.width) * strength * 2,
      y: ((e.clientY - cy) / r.height) * strength * 2,
    });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={prefersReduced ? undefined : { x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   SCENE HEADER — per-word reveal + wipe underline
   ============================================================ */

const SceneHeader: React.FC<{
  eyebrow?: string;
  title: string;
  accentWord?: string;
  accentColor?: string;
  description?: React.ReactNode;
}> = ({ eyebrow, title, accentWord, accentColor = TEAL, description }) => {
  const prefersReduced = useReducedMotion();
  const words = title.split(' ');

  return (
    <div className="relative z-10 max-w-4xl text-center mx-auto mb-10 sm:mb-16">
      {eyebrow && (
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...SPRING }}
          className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={prefersReduced ? false : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={viewportOnce}
        variants={stagger(0.045)}
        className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { ...SPRING },
              },
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
        {accentWord && (
          <>
            {' '}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { ...SPRING },
                },
              }}
              className="relative inline-block"
              style={{ color: accentColor }}
            >
              {accentWord}
              <motion.span
                aria-hidden
                initial={prefersReduced ? false : { scaleX: 0 }}
                whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ ...SPRING, delay: 0.35 }}
                className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-black opacity-90 origin-left"
              />
            </motion.span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...SPRING, delay: 0.15 }}
          className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.div>
      )}
    </div>
  );
};

/* ============================================================
   DATA
   ============================================================ */

const stops = [10, 35, 60, 85]; // % positions on the road

interface Passenger {
  id: number;
  waiting: boolean;
  boarded: boolean;
  color: string;
}

interface TaxiData {
  id: number;
  position: number;
  passengerCount: number;
  currentStopIndex: number | null;
  isBoarding: boolean;
  isStopped: boolean;
  speed: number;
  bounceOffset: number;
}

const passengerColors = ['#4ade80', '#facc15', '#fb923c', '#60a5fa'];

/* ============================================================
   JOURNEY DRIVE
   ============================================================ */

const JourneyDrive: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const [taxi, setTaxi] = useState<TaxiData>({
    id: 1,
    position: 0,
    passengerCount: 0,
    currentStopIndex: null,
    isBoarding: false,
    isStopped: false,
    speed: 0.28,
    bounceOffset: 0,
  });

  const [passengers] = useState<Passenger[][]>([
    [
      { id: 1, waiting: true, boarded: false, color: passengerColors[0] },
      { id: 2, waiting: true, boarded: false, color: passengerColors[1] },
      { id: 3, waiting: true, boarded: false, color: passengerColors[2] },
    ],
    [
      { id: 1, waiting: true, boarded: false, color: passengerColors[0] },
      { id: 2, waiting: true, boarded: false, color: passengerColors[3] },
    ],
    [
      { id: 1, waiting: true, boarded: false, color: passengerColors[1] },
      { id: 2, waiting: true, boarded: false, color: passengerColors[2] },
      { id: 3, waiting: true, boarded: false, color: passengerColors[3] },
      { id: 4, waiting: true, boarded: false, color: passengerColors[0] },
    ],
    [
      { id: 1, waiting: true, boarded: false, color: passengerColors[1] },
      { id: 2, waiting: true, boarded: false, color: passengerColors[2] },
    ],
  ]);

  const [bounceTime, setBounceTime] = useState(0);
  const [currentPassengers, setCurrentPassengers] = useState<Passenger[][]>(
    JSON.parse(JSON.stringify(passengers))
  );
  const [resetTrigger, setResetTrigger] = useState(0);
  const [showSpeechBubbles, setShowSpeechBubbles] = useState<boolean[][]>(
    stops.map(() => [])
  );
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);

  const conversationSequence = [
    { speaker: 0, text: 'How far is the transport?' },
    { speaker: 1, text: 'Check Uthutho' },
    { speaker: 0, text: "Ooh it's by Stop 2 going to Stop 3" },
    { speaker: 1, text: 'This is Stop 4, the taxi is coming!' },
  ];

  useEffect(() => {
    const initialBubbles = stops.map((_, stopIndex) => {
      return currentPassengers[stopIndex].map(() => false);
    });
    setShowSpeechBubbles(initialBubbles);
  }, []);

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounceTime((prev) => (prev + 0.15) % (Math.PI * 2));
    }, 30);
    return () => clearInterval(bounceInterval);
  }, []);

  // Conversation at Stop 4
  useEffect(() => {
    const conversationTriggerPosition = 13;

    if (
      taxi.position > conversationTriggerPosition &&
      currentConversationIndex === 0
    ) {
      const startConversation = async () => {
        setCurrentConversationIndex(1);

        const showBubble = (speakerIndex: number, visible: boolean) => {
          setShowSpeechBubbles((prev) => {
            const newBubbles = prev.map((b, stopIdx) => {
              if (stopIdx === 3) {
                const newStopBubbles = [...b];
                newStopBubbles[speakerIndex] = visible;
                return newStopBubbles;
              }
              return [...b];
            });
            return newBubbles;
          });
        };

        const baseDelay = 2500;

        for (let i = 0; i < conversationSequence.length; i++) {
          const msg = conversationSequence[i];
          const conversationSpeedFactor = 0.28 / (taxi.speed || 0.28);
          const dynamicDelay = baseDelay * conversationSpeedFactor;

          showBubble(msg.speaker, true);
          setCurrentConversationIndex(i + 1);

          await new Promise((resolve) => setTimeout(resolve, dynamicDelay));

          showBubble(msg.speaker, false);

          if (i < conversationSequence.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 300));
          }
        }

        setTimeout(() => {
          setCurrentConversationIndex(conversationSequence.length + 1);
        }, 500);
      };

      startConversation();
    }
  }, [taxi.position, taxi.speed, currentConversationIndex, conversationSequence]);

  // Taxi movement + boarding
  useEffect(() => {
    const interval = setInterval(() => {
      setTaxi((prevTaxi) => {
        if (prevTaxi.isStopped || prevTaxi.isBoarding) {
          const bounceOffset = Math.sin(bounceTime * 3) * 1.5 * 0.5;
          return { ...prevTaxi, bounceOffset };
        }

        let newPosition = prevTaxi.position + prevTaxi.speed;
        let newIsStopped = false;
        let newIsBoarding = false;
        let newCurrentStopIndex = prevTaxi.currentStopIndex;

        for (let i = 0; i < stops.length; i++) {
          const distanceToStop = stops[i] - prevTaxi.position;

          if (
            distanceToStop > 0 &&
            distanceToStop < 1.5 &&
            !prevTaxi.currentStopIndex &&
            !prevTaxi.isStopped
          ) {
            const waitingCount = currentPassengers[i].filter(
              (p) => p.waiting && !p.boarded
            ).length;
            if (waitingCount > 0) {
              newPosition = stops[i];
              newIsStopped = true;
              newIsBoarding = true;
              newCurrentStopIndex = i;

              setTimeout(() => {
                setTaxi((currentTaxi) => {
                  if (
                    currentTaxi.currentStopIndex === i &&
                    currentTaxi.isBoarding
                  ) {
                    const waitingPassengers = currentPassengers[i].filter(
                      (p) => p.waiting && !p.boarded
                    );
                    const boardCount = waitingPassengers.length;

                    let boardedSoFar = 0;
                    const boardInterval = setInterval(() => {
                      boardedSoFar++;

                      setCurrentPassengers((prev) => {
                        const newPassengers = [...prev];
                        const stopPassengers = [...newPassengers[i]];
                        const waitingIndex = stopPassengers.findIndex(
                          (p) => p.waiting && !p.boarded
                        );
                        if (waitingIndex !== -1) {
                          stopPassengers[waitingIndex] = {
                            ...stopPassengers[waitingIndex],
                            waiting: false,
                            boarded: true,
                          };
                          newPassengers[i] = stopPassengers;
                        }
                        return newPassengers;
                      });

                      setTaxi((currentTaxi2) => ({
                        ...currentTaxi2,
                        passengerCount: currentTaxi2.passengerCount + 1,
                      }));

                      if (boardedSoFar >= boardCount) {
                        clearInterval(boardInterval);
                        setTimeout(() => {
                          setTaxi((currentTaxi3) => ({
                            ...currentTaxi3,
                            isStopped: false,
                            isBoarding: false,
                            currentStopIndex: null,
                            speed: 0.2 + Math.random() * 0.25,
                          }));
                        }, 500);
                      }
                    }, 450);

                    return {
                      ...currentTaxi,
                      isBoarding: true,
                      isStopped: true,
                    };
                  }
                  return currentTaxi;
                });
              }, 50);

              break;
            }
          }
        }

        if (newPosition >= 100) {
          newPosition = 0;
          setResetTrigger((prev) => prev + 1);
        }

        const bounceOffset =
          Math.sin(bounceTime * 3) * 1.5 * (prevTaxi.speed * 2);

        return {
          ...prevTaxi,
          position: newPosition,
          isStopped: newIsStopped,
          isBoarding: newIsBoarding,
          currentStopIndex: newCurrentStopIndex,
          bounceOffset,
        };
      });
    }, 25);

    return () => clearInterval(interval);
  }, [bounceTime, currentPassengers, conversationSequence]);

  // Reset when route completes
  useEffect(() => {
    if (resetTrigger > 0) {
      setCurrentPassengers(JSON.parse(JSON.stringify(passengers)));
      setTaxi({
        id: 1,
        position: 0,
        passengerCount: 0,
        currentStopIndex: null,
        isBoarding: false,
        isStopped: false,
        speed: 0.28,
        bounceOffset: 0,
      });
      setCurrentConversationIndex(0);
      const initialBubbles = stops.map((_, stopIndex) =>
        passengers[stopIndex] ? passengers[stopIndex].map(() => false) : []
      );
      setShowSpeechBubbles(initialBubbles);
    }
  }, [resetTrigger, passengers]);

  return (
    <section className="relative py-20 sm:py-24 bg-background text-foreground overflow-hidden">
      {/* subtle backdrop grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SceneHeader
          eyebrow="Live Transport in Motion"
          title="Live transport in"
          accentWord="motion"
          accentColor={TEAL}
          description={
            <>
              Uthutho captures real journeys as they happen. As the taxi moves,
              commuters at each stop signal demand, creating a live, shared view
              of the route.{' '}
              <span className="font-semibold" style={{ color: TEAL }}>
                Commuter powered.
              </span>
            </>
          }
        />

        {/* Road scene */}
        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative w-full max-w-5xl mx-auto"
        >
          <div className="relative w-full h-64 rounded-[1.75rem] border border-border/60 bg-card shadow-xl overflow-hidden">
            {/* road dashes */}
            <div
              className="absolute top-1/2 w-full h-px"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #eab308, #eab308 20px, transparent 20px, transparent 40px)',
                opacity: 0.35,
              }}
            />

            {stops.map((stop, index) => {
              const waitingCount = currentPassengers[index]?.filter(
                (p) => p.waiting && !p.boarded
              ).length;
              const allBoarded = currentPassengers[index]?.every(
                (p) => p.boarded
              );
              const isTaxiAtStop =
                taxi.isStopped && taxi.currentStopIndex === index;

              return (
                <div
                  key={index}
                  className="absolute text-center transition-all duration-300"
                  style={{
                    left: `${stop}%`,
                    transform: 'translateX(-50%)',
                    bottom: '30px',
                  }}
                >
                  <div className="relative mb-1">
                    <img
                      src={stopSignIcon}
                      alt={`Stop ${index + 1}`}
                      className="w-10 h-10 object-contain"
                    />
                    {waitingCount > 0 && !allBoarded && (
                      <div
                        className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        style={{ backgroundColor: ORANGE }}
                      >
                        {waitingCount}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center gap-2 mt-2">
                    {currentPassengers[index]?.map((passenger, pIdx) => {
                      if (passenger.waiting && !passenger.boarded) {
                        const delay = pIdx * 0.15;
                        return (
                          <div key={pIdx} className="relative">
                            <div
                              className="animate-bounce"
                              style={{
                                animationDelay: `${delay}s`,
                                animationDuration: '1s',
                              }}
                            >
                              <User
                                className="w-5 h-5"
                                style={{ color: passenger.color }}
                              />
                            </div>
                            {index === 3 &&
                              showSpeechBubbles[3]?.[pIdx] && (
                                <div
                                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mb-2 z-20 animate-fade-in-up"
                                  style={{
                                    width: 'max-content',
                                    maxWidth: '200px',
                                  }}
                                >
                                  <div
                                    className="relative text-white text-xs rounded-lg px-3 py-1.5 shadow-lg border"
                                    style={{
                                      backgroundColor: '#111827',
                                      borderColor: `${TEAL}50`,
                                    }}
                                  >
                                    {
                                      conversationSequence.find(
                                        (msg, seqIdx) =>
                                          seqIdx ===
                                            currentConversationIndex - 1 &&
                                          msg.speaker === pIdx
                                      )?.text
                                    }
                                    <div
                                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 border-r border-b"
                                      style={{
                                        backgroundColor: '#111827',
                                        borderColor: `${TEAL}50`,
                                      }}
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>

                  {isTaxiAtStop && (
                    <div
                      className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] whitespace-nowrap animate-pulse font-medium"
                      style={{ color: TEAL }}
                    >
                      boarding...
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-1">
                    Stop {index + 1}
                  </p>
                </div>
              );
            })}

            {/* Taxi */}
            <div
              className="absolute transition-all duration-50 ease-linear"
              style={{
                left: `${taxi.position}%`,
                transform: `translateX(-50%) translateY(${taxi.bounceOffset}px)`,
                bottom: '30px',
                zIndex: 10,
              }}
            >
              <div className="relative">
                <img
                  src={taxiIcon}
                  alt="Taxi"
                  className="w-16 object-contain drop-shadow-lg"
                />
                {taxi.passengerCount > 0 && (
                  <div
                    className="absolute -top-2 -right-2 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                    style={{ backgroundColor: TEAL }}
                  >
                    {taxi.passengerCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 text-left">
          {[
            {
              title: 'Continuous Journey Tracking',
              body: 'The vehicle moves in real time with variable speeds and road feel. The taxi stops completely at stops and waits until all passengers board.',
              color: TEAL,
            },
            {
              title: 'Demand at Every Stop',
              body: 'Passengers signal demand at each stop with animated waiting indicators, showing real passenger demand along the route.',
              color: ORANGE,
            },
            {
              title: 'Data From Movement',
              body: 'Each passing journey builds a live data layer—turning informal transport into a structured, predictable system.',
              color: PINK,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={scaleIn}
              transition={{ ...SPRING, delay: i * 0.08 }}
            >
              <MagneticCard className="h-full p-6 rounded-[1.75rem] bg-card border border-border/60 shadow-xl">
                <div
                  className="mb-4 h-1 w-10 rounded-full"
                  style={{ backgroundColor: card.color }}
                />
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground font-display">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                  {card.body}
                </p>
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyDrive;