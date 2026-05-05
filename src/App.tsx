import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, Clock, Calendar, MapPin, ArrowRight, Play, Star, 
  X, Check, Sparkles 
} from 'lucide-react';

// Types
interface Card {
  id: number;
  title: string;
  icon: React.ReactNode;
  message: string;
  color: string;
}

interface FlashWord {
  word: string;
  color: string;
}

interface RSVPForm {
  name: string;
  email: string;
}

const App: React.FC = () => {
  // Progress steps
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ['Entry', 'Memories', 'Stories', 'Echoes', 'Invitation', 'Farewell'];

  // Interactive Cards State
  const [revealedCards, setRevealedCards] = useState<boolean[]>([false, false, false]);

  // Cinematic Flash Words
  const [isPlayingFlash, setIsPlayingFlash] = useState<boolean>(false);
  const [activeFlashIndex, setActiveFlashIndex] = useState<number>(-1);

  // RSVP Modal
  const [showRSVPModal, setShowRSVPModal] = useState<boolean>(false);
  const [rsvpForm, setRsvpForm] = useState<RSVPForm>({ name: '', email: '' });
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Emotional Lines
  const emotionalLines = [
    "From first days to last laughs…",
    "From strangers to stories…",
    "From seniors to memories…"
  ];

  // Interactive Cards Data — Our Story in Three Breaths
  const cards: Card[] = [
    {
      id: 0,
      title: "The First Hello",
      icon: <Users className="w-5 h-5" />,
      message: "That first nervous smile in the orientation hall became the beginning of everything. You guided us into this beautiful story.",
      color: "from-rose-400/20 to-pink-400/20"
    },
    {
      id: 1,
      title: "Event Chaos",
      icon: <Sparkles className="w-5 h-5" />,
      message: "The wild department fests, last-minute scrambles, and endless laughter through the madness. Those moments made us unbreakable.",
      color: "from-purple-400/20 to-indigo-400/20"
    },
    {
      id: 2,
      title: "The Guidance",
      icon: <Heart className="w-5 h-5" />,
      message: "Through every doubt and late-night talk, you guided us with patience and love. Our memories will always carry your light.",
      color: "from-amber-400/20 to-orange-400/20"
    }
  ];

  // Cinematic Flash Words — Emotional & Comedy
  const flashWords: FlashWord[] = [
    { word: "TEARS", color: "#fda4af" },
    { word: "LAUGHS", color: "#c4b5fd" },
    { word: "CHAOS", color: "#a5b4fc" },
    { word: "FOREVER", color: "#fb923c" }
  ];

  // Progress Indicator
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Navigate to step with smooth animation
  const goToStep = (step: number) => {
    setCurrentStep(step);
    // Scroll smoothly to the section
    const section = document.getElementById(`section-${step}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Start the journey from entry
  const startJourney = () => {
    setCurrentStep(1);
    // Scroll to emotional lines
    setTimeout(() => {
      const el = document.getElementById('section-1');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Toggle Card Reveal
  const toggleCard = (index: number) => {
    const newRevealed = [...revealedCards];
    newRevealed[index] = !newRevealed[index];
    setRevealedCards(newRevealed);

    // Auto advance progress if all revealed
    if (newRevealed.every(Boolean) && currentStep < 2) {
      setCurrentStep(2);
    }
  };

  // Play Cinematic Flash Words Sequence
  const playFlashSequence = async () => {
    if (isPlayingFlash) return;
    
    setIsPlayingFlash(true);
    setActiveFlashIndex(-1);

    // Play each word with dramatic timing
    for (let i = 0; i < flashWords.length; i++) {
      setActiveFlashIndex(i);
      // Hold each word for 1.2 seconds
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    // Final hold + reset
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setActiveFlashIndex(-1);
    setIsPlayingFlash(false);
    
    // Advance step
    if (currentStep < 3) {
      setCurrentStep(3);
    }
  };

  // Reset Flash
  const resetFlash = () => {
    setIsPlayingFlash(false);
    setActiveFlashIndex(-1);
  };

  // Handle RSVP Form
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rsvpForm.name.trim() || !rsvpForm.email.trim()) {
      return;
    }

    // Submit animation
    setRsvpSubmitted(true);
    
    // Show beautiful confetti
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
      // Keep success state for a moment
      setTimeout(() => {
        setShowRSVPModal(false);
        setRsvpSubmitted(false);
        setRsvpForm({ name: '', email: '' });
        setCurrentStep(5);
        
        // Scroll to closing
        setTimeout(() => {
          const el = document.getElementById('section-5');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }, 1200);
    }, 2200);
  };

  const updateRSVPForm = (field: keyof RSVPForm, value: string) => {
    setRsvpForm(prev => ({ ...prev, [field]: value }));
  };

  // Simple Confetti Particles
  const ConfettiParticles = () => {
    const particles = Array.from({ length: 28 }, (_, i) => i);
    
    return (
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {particles.map((i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 0.6;
          const duration = 1.8 + Math.random() * 0.9;
          const size = 6 + Math.random() * 8;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${left}%`,
                top: '-20px',
                width: size,
                height: size,
                background: i % 3 === 0 ? '#c084fc' : i % 2 === 0 ? '#f9a8d4' : '#a5b4fc',
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                opacity: [1, 1, 0.2, 0],
                rotate: [0, 180, 360],
                x: [0, (Math.random() - 0.5) * 120]
              }}
              transition={{ 
                duration, 
                delay, 
                ease: [0.25, 0.1, 0.25, 1] 
              }}
            />
          );
        })}
      </div>
    );
  };

  // Floating Soft Particles for Background
  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/40"
          style={{
            left: `${15 + (i * 8)}%`,
            top: `${25 + ((i % 3) * 22)}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 6 + i % 3,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f1e9] text-[#3f2e2e] overflow-x-hidden font-sans">
      {/* Elegant Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-serif text-xl tracking-[3px] text-[#3f2e2e]">THE LAST CHAPTER</div>
                <div className="text-[9px] text-[#7d6b63] -mt-1 tracking-[2px]">CYBER SECURITY • CLASS OF 2026</div>
              </div>
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center gap-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-400 scale-125' 
                    : 'bg-[#d4c5b9]'
                }`}
                aria-label={`Go to ${steps[index]}`}
              />
            ))}
          </div>

          <div className="text-xs tracking-[1.5px] text-[#8a7565] font-light">FAREWELL '26</div>
        </div>

        {/* Progress Bar */}
        <div className="h-px bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-transparent" style={{ width: `${progress}%` }} />
      </nav>

      {/* ========== 1. ENTRY SCREEN ========== */}
      <section id="section-0" className="relative min-h-[100dvh] flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f1e9] via-[#f4e9f0] to-[#e9e4f5]" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero.jpg" 
            alt="College friends embracing at sunset" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f1e9]/70 via-[#f8f1e9]/75 to-[#f8f1e9]/95" />
        </div>

        <FloatingParticles />

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="inline-block mb-6 px-5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/70 text-xs tracking-[3px] text-[#5d4b3f]">
            FAREWELL DAY • MAY 16
          </div>
          
          <h1 className="font-serif text-[72px] md:text-[92px] leading-[0.9] tracking-[-4.2px] mb-4 text-[#32251f]">
            Not every goodbye<br />feels like an ending…
          </h1>
          
          <p className="max-w-md mx-auto text-xl text-[#6c584a] mb-10 tracking-[-0.2px]">
            It feels like the beginning of everything we’ve become — Cyber Security ’26.
          </p>

          <motion.button
            onClick={startJourney}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#32251f] text-white text-sm tracking-[3px] hover:bg-[#3f2e2e] transition-all duration-300 shadow-xl shadow-black/10"
          >
            OPEN THE INVITE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs tracking-widest text-[#8a7565]">
          SCROLL TO BEGIN
          <div className="w-px h-8 bg-gradient-to-b from-[#8a7565]/40 mt-2" />
        </div>
      </section>

      {/* ========== 2. EMOTIONAL LINES ========== */}
      <section id="section-1" className="relative py-24 bg-[#f8f1e9]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[4px] text-[#a18e7b]">THE JOURNEY WE SHARED</div>
            <h2 className="font-serif text-6xl md:text-7xl tracking-[-2.8px] mt-3">You guided us.<br />Our story in three breaths.</h2>
            <p className="mt-4 max-w-md mx-auto text-[#6c584a]">Through every laugh, every late night, and every quiet moment of guidance — these are the memories that shaped us.</p>
          </div>

          <div className="space-y-8 md:space-y-10 max-w-3xl mx-auto">
            {emotionalLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.18 }}
                className="group relative pl-8 md:pl-12 border-l-2 border-[#d4c5b9] hover:border-[#a18e7b] transition-colors"
              >
                <div className="font-serif text-[42px] md:text-[54px] leading-none tracking-[-1.8px] text-[#3f2e2e] group-hover:text-[#32251f] transition-colors">
                  {line}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button 
              onClick={() => goToStep(2)}
              className="flex items-center gap-2 text-sm tracking-[2px] text-[#6c584a] hover:text-[#32251f] transition-colors group"
            >
              CONTINUE TO THE STORIES <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* ========== 3. INTERACTIVE SECTION: CLICK-TO-REVEAL CARDS ========== */}
      <section id="section-2" className="relative py-20 bg-gradient-to-b from-[#f8f1e9] to-[#f4e9f0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline px-4 py-1 rounded-full text-xs tracking-[3px] bg-white/70 text-[#6c584a]">TAP TO REMEMBER</div>
            <h3 className="font-serif text-5xl md:text-6xl tracking-[-2.6px] mt-4">Our story in three breaths.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {cards.map((card, index) => {
              const isRevealed = revealedCards[index];
              return (
                <motion.div
                  key={card.id}
                  onClick={() => toggleCard(index)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative cursor-pointer h-[380px] rounded-3xl overflow-hidden border border-white/60 shadow-xl shadow-black/5"
                >
                  {/* Glassmorphism Card Base */}
                  <div className={`absolute inset-0 bg-white/75 backdrop-blur-2xl transition-all duration-500 ${isRevealed ? 'opacity-10' : ''}`} />
                  
                  {/* Color Accent Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} transition-all duration-700`} />

                  <div className="relative h-full flex flex-col p-8 z-10">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-auto">
                      <div className="w-11 h-11 rounded-2xl bg-white/90 flex items-center justify-center text-[#32251f] shadow-inner">
                        {card.icon}
                      </div>
                      <div className="font-serif text-[21px] tracking-[-0.6px] text-[#32251f]">
                        {card.title}
                      </div>
                    </div>

                    {/* Revealed Message or Prompt */}
                    <AnimatePresence mode="wait">
                      {isRevealed ? (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-[#46342a] text-[15px] leading-snug tracking-[-0.1px] pr-4"
                        >
                          {card.message}
                        </motion.div>
                      ) : (
                        <div className="mt-auto">
                          <div className="flex items-center gap-2 text-[#a18e7b] text-xs tracking-[2px] group-hover:text-[#6c584a] transition">
                            TAP TO REVEAL <Star className="w-3 h-3" />
                          </div>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Subtle Bottom Glow Indicator */}
                    <div className="absolute bottom-8 right-8 text-[10px] font-mono tracking-[3px] text-[#a18e7b]/60">
                      {isRevealed ? "REMEMBERED" : "CLICK"}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <button 
              onClick={() => {
                const el = document.getElementById('section-3');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex items-center gap-2 px-9 py-4 text-sm tracking-[3px] border border-[#c9b7a5] hover:bg-white/70 rounded-full transition-all"
            >
              CONTINUE TO THE ECHOES
            </button>
          </div>
        </div>
      </section>

      {/* ========== CAPTURED MOMENTS — 6 Photo Frames ========== */}
      

      {/* ========== 4. CINEMATIC FLASH WORDS SECTION ========== */}
      <section id="section-3" className="relative py-20 bg-[#32251f] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_0.8px,transparent_1px)] bg-[length:5px_5px]" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="text-purple-300 text-xs tracking-[4px]">IN A SINGLE BREATH</div>
            <h2 className="font-serif text-white text-7xl md:text-[86px] tracking-[-4.4px] leading-none mt-2">The words that<br />will echo in our hearts.</h2>
          </div>

          {/* Cinematic Flash Words Display */}
          <div className="relative h-[280px] flex items-center justify-center mb-10">
            <AnimatePresence>
              {activeFlashIndex >= 0 ? (
                <motion.div
                  key={activeFlashIndex}
                  initial={{ opacity: 0, scale: 0.6, y: 60 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -60 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute text-center"
                >
                  <div 
                    className="font-serif text-[92px] md:text-[118px] tracking-[-7.6px] leading-none"
                    style={{ color: flashWords[activeFlashIndex].color }}
                  >
                    {flashWords[activeFlashIndex].word}
                  </div>
                  <div className="text-[10px] tracking-[6px] text-white/40 mt-2">ECHOES OF US</div>
                </motion.div>
              ) : (
                <div className="text-center text-white/60 text-sm tracking-[3px]">THESE MOMENTS LIVE FOREVER</div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={playFlashSequence}
              disabled={isPlayingFlash}
              whileHover={!isPlayingFlash ? { scale: 1.01 } : {}}
              whileTap={!isPlayingFlash ? { scale: 0.985 } : {}}
              className="group flex items-center justify-center gap-3 px-10 py-[17px] rounded-full bg-white text-[#32251f] text-sm tracking-[3.5px] font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-black/30"
            >
              <Play className="w-4 h-4" /> 
              {isPlayingFlash ? "ILLUMINATING..." : "ILLUMINATE THE MEMORIES"}
            </motion.button>
            
            <button 
              onClick={resetFlash}
              disabled={!isPlayingFlash && activeFlashIndex === -1}
              className="text-xs tracking-widest px-7 py-3.5 rounded-full border border-white/25 text-white/70 hover:bg-white/5 transition disabled:opacity-40"
            >
              RESET
            </button>
          </div>
        </div>
      </section>

      {/* ========== 5. FINAL INVITE CARD ========== */}
      <section id="section-4" className="relative py-20 bg-gradient-to-b from-[#e9e4f5] via-[#f4e9f0] to-[#f8f1e9]">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[4px] text-[#a18e7b]">YOU ARE CORDIALLY INVITED</div>
          </div>

          {/* Beautiful Glass Invite Card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-2xl shadow-black/10 bg-white/80 backdrop-blur-3xl">
            {/* Venue Background Image */}
            <div className="absolute inset-0 opacity-25">
              <img src="/images/venue.jpg" alt="Elegant farewell venue" className="w-full h-full object-cover" />
            </div>

            <div className="relative p-12 md:p-16 z-10">
              <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-16 items-start">
                {/* Left: Event Title */}
                <div className="flex-1">
                  <div className="font-serif text-[#32251f] text-[68px] leading-none tracking-[-4px] mb-2">Farewell<br />Day</div>
                  <div className="text-[#6c584a] text-lg tracking-tight">Cyber Security • The Final Gathering</div>
                </div>

                {/* Right: Details */}
                <div className="flex-1 pt-2 space-y-9 text-[#46342a]">
                  <div className="flex gap-4 items-start">
                    <Calendar className="mt-1 w-5 h-5 text-purple-500/70" />
                    <div>
                      <div className="font-medium tracking-wide text-sm">FRIDAY, MAY 8, 2026</div>
                      <div className="text-[#a18e7b] text-sm">A beautiful event in the campus</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <Clock className="mt-1 w-5 h-5 text-purple-500/70" />
                    <div>
                      <div className="font-medium tracking-wide text-sm">11:30 AM — MORNING</div>
                      <div className="text-[#a18e7b] text-sm">Gathering starts at noon</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <MapPin className="mt-1 w-5 h-5 text-purple-500/70" />
                    <div>
                      <div className="font-medium tracking-wide text-sm">ROOM C-113</div>
                      <div className="text-[#a18e7b] text-sm">G.H Raisoni Campus, Nagpur</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Be There Button */}
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <motion.button 
                  onClick={() => setShowRSVPModal(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="group w-full sm:w-auto flex-1 sm:flex-none flex items-center justify-center gap-3 px-16 py-5 rounded-2xl bg-gradient-to-r from-[#32251f] to-[#46342a] hover:from-[#3f2e2e] text-white text-sm tracking-[4px] font-medium shadow-xl transition-all"
                >
                  BE THERE <Heart className="w-4 h-4 group-hover:scale-110 transition" />
                </motion.button>
                
                <div onClick={() => goToStep(5)} className="cursor-pointer text-xs tracking-widest px-8 py-4 text-[#6c584a] hover:text-[#32251f] transition text-center sm:text-left">
                  SEE THE CLOSING MESSAGE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 6. CLOSING LINE ========== */}
      <section id="section-5" className="relative min-h-[92vh] flex items-center justify-center bg-[#32251f] text-white py-16">
        <div className="max-w-xl px-6 text-center relative z-10">
          <div className="mb-8 text-purple-300/70 tracking-[5px] text-xs">THE FINAL CHAPTER BEGINS</div>
          
          <div className="font-serif text-[58px] md:text-[72px] tracking-[-3.6px] leading-[0.92] mb-9">
            One last day.<br />Let’s make it count.
          </div>

          <div className="text-lg text-white/60 tracking-tight max-w-xs mx-auto">
            See you there, where the stories end and the memories begin.
          </div>

          <div className="mt-16 flex items-center justify-center gap-3 text-sm tracking-[2px]">
            <div className="h-px w-9 bg-white/30" /> 
            WITH LOVE, CYBER SECURITY DEPARTMENT • CLASS OF 202 
            <div className="h-px w-9 bg-white/30" />
          </div>

          {/* Subtle signature */}
          <div className="mt-9 text-[10px] tracking-[5px] text-white/30 font-light">— AB</div>
        </div>

        {/* Soft bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </section>

      {/* ========== RSVP MODAL ========== */}
      <AnimatePresence>
        {showRSVPModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ ease: [0.21, 0.92, 0.3, 1], duration: 0.35 }}
              className="relative w-full max-w-md rounded-3xl bg-[#f8f1e9] p-9 shadow-2xl"
            >
              <button 
                onClick={() => { setShowRSVPModal(false); setRsvpSubmitted(false); }}
                className="absolute top-6 right-6 text-[#6c584a] hover:text-black transition"
              >
                <X className="w-5 h-5" />
              </button>

              {!rsvpSubmitted ? (
                <>
                  <div className="mb-7">
                    <div className="font-serif text-4xl tracking-[-1.5px]">Save Your Seat</div>
                    <p className="text-[#6c584a] mt-2 text-[15px]">We can’t wait to share this final day with the Cyber Security family.</p>
                  </div>

                  <form onSubmit={handleRSVPSubmit} className="space-y-5">
                    <div>
                      <label className="text-xs tracking-widest text-[#8a7565] mb-1.5 block">YOUR NAME</label>
                      <input 
                        type="text" 
                        value={rsvpForm.name}
                        onChange={(e) => updateRSVPForm('name', e.target.value)}
                        required
                        className="w-full bg-white/80 border border-[#d4c5b9] focus:border-[#a18e7b] rounded-2xl px-5 py-[17px] placeholder:text-[#a18e7b]/70 text-[#32251f] outline-none transition"
                        placeholder="Your name"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="mt-2 w-full py-4 rounded-2xl bg-[#32251f] text-white text-sm tracking-[3.5px] hover:bg-[#3f2e2e] active:bg-black transition font-medium"
                    >
                      CONFIRM MY ATTENDANCE
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <Check className="w-9 h-9 text-white" />
                  </div>
                  <div className="font-serif text-3xl tracking-tight mb-2">You’re In.</div>
                  <div className="text-[#6c584a]">Thank you for joining the Cyber Security Department Farewell Day.</div>
                  <div className="text-xs tracking-widest mt-8 text-[#a18e7b]">SEE YOU MAY 8TH</div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confetti Overlay */}
      <AnimatePresence>
        {showConfetti && <ConfettiParticles />}
      </AnimatePresence>
    </div>
  );
};

export default App;