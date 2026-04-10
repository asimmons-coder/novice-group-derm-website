'use client';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useState, useRef, Suspense, useEffect, type ReactNode } from 'react';
import {
  Microscope,
  Layers,
  History,
  User,
  ChevronRight,
  GraduationCap,
  Home,
  Heart,
  Box,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Text,
  Float,
  ContactShadows,
} from '@react-three/drei';
import { Section } from '@/components/ui/Container';
import { SignatureHeadline, SectionLabel } from '@/components/ui/SignatureHeadline';

// --- 3D Skin Model ---
function SkinModel() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#F0DDD8" />
      </mesh>
      <Text position={[2.5, 1.1, 0]} fontSize={0.2} color="#2D2926" anchorX="left">
        Epidermis
      </Text>

      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial color="#D4A69A" />
      </mesh>
      <Text position={[2.5, 0, 0]} fontSize={0.2} color="#2D2926" anchorX="left">
        Dermis
      </Text>

      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#E8D5B0" />
      </mesh>
      <Text position={[2.5, -1.5, 0]} fontSize={0.2} color="#2D2926" anchorX="left">
        Hypodermis
      </Text>

      <mesh position={[-0.5, 0.5, 0.5]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 16]} />
        <meshStandardMaterial color="#2D2926" />
      </mesh>
    </group>
  );
}

function WebGLErrorBoundary({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setHasError(true);
    } catch {
      setHasError(true);
    }
  }, []);

  if (hasError) return <>{fallback}</>;
  return <>{children}</>;
}

function Skin3DFallback() {
  const layers = [
    { name: 'Epidermis', depth: '0.1 – 1.5mm', color: 'bg-blush-light', border: 'border-blush' },
    { name: 'Dermis', depth: '1.5 – 4mm', color: 'bg-blush', border: 'border-blush' },
    { name: 'Hypodermis', depth: '4mm+', color: 'bg-gold-light', border: 'border-gold' },
  ];

  return (
    <div className="w-full h-[500px] bg-cream/40 rounded-3xl overflow-hidden border border-charcoal/5 flex items-center justify-center p-12">
      <div className="w-full max-w-md space-y-3">
        {layers.map((layer) => (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            className={`${layer.color} ${layer.border} border-2 rounded-2xl p-6 flex justify-between items-center`}
          >
            <span className="font-display text-lg">{layer.name}</span>
            <span className="text-xs text-charcoal/50 uppercase tracking-widest">{layer.depth}</span>
          </motion.div>
        ))}
        <p className="text-center text-charcoal/30 text-xs mt-6 italic">
          3D view requires a WebGL-capable browser
        </p>
      </div>
    </div>
  );
}

function Skin3DView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Box className="text-gold" size={24} />
        <h3 className="font-display text-2xl">Interactive 3D Anatomy</h3>
      </div>
      <p className="text-charcoal/60 text-sm mb-8">
        Rotate and zoom to explore the structural layers of the skin. Understanding anatomy is the
        first step to effective treatment.
      </p>

      <WebGLErrorBoundary fallback={<Skin3DFallback />}>
        <div className="w-full h-[500px] bg-cream/40 rounded-3xl overflow-hidden border border-charcoal/5 relative">
          <Canvas shadows>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[8, 5, 8]} fov={40} />
              <OrbitControls enableDamping dampingFactor={0.05} />

              <ambientLight intensity={0.7} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                <SkinModel />
              </Float>

              <ContactShadows
                position={[0, -3, 0]}
                opacity={0.4}
                scale={10}
                blur={2}
                far={4.5}
              />
            </Suspense>
          </Canvas>

          <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-2 pointer-events-none">
            <div className="bg-warm-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm">
              Drag to Rotate
            </div>
            <div className="bg-warm-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold shadow-sm">
              Scroll to Zoom
            </div>
          </div>
        </div>
      </WebGLErrorBoundary>
    </div>
  );
}

// --- Microscope ---
function MicroscopeView() {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const bgX = useTransform(lensX, (v) => -v + 128);
  const bgY = useTransform(lensY, (v) => -v + 128);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Microscope className="text-gold" size={24} />
        <h3 className="font-display text-2xl">The Diagnostic Lens</h3>
      </div>
      <p className="text-charcoal/60 text-sm mb-8">
        Move your cursor over the skin to see the microscopic pathology view. This
        &ldquo;clinicopathologic correlation&rdquo; is our specialty.
      </p>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-none border border-charcoal/5 shadow-inner"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover"
          alt="Clinical view of skin"
          crossOrigin="anonymous"
        />

        {isHovering && (
          <motion.div
            style={{
              left: lensX,
              top: lensY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="absolute w-64 h-64 rounded-full border-4 border-gold shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-none z-20"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200"
              style={{
                position: 'absolute',
                width: 1200,
                maxWidth: 'none',
                left: bgX,
                top: bgY,
                scale: 1.5,
              }}
              className="object-cover grayscale sepia-[.2]"
              alt="Pathology view"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 border-[12px] border-gold/20 rounded-full" />
          </motion.div>
        )}

        <div className="absolute bottom-6 left-6 bg-warm-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold">
          Clinical View
        </div>
      </div>
    </div>
  );
}

// --- Depth of Care ---
function DepthOfCare() {
  const [activeLayer, setActiveLayer] = useState<number | null>(0);

  const layers = [
    {
      name: 'Epidermis',
      depth: '0.1mm – 1.5mm',
      treatments: ['Chemical Peels', 'Topical Retinoids', 'Laser Resurfacing'],
      color: 'bg-blush-light',
      border: 'border-blush',
    },
    {
      name: 'Dermis',
      depth: '1.5mm – 4mm',
      treatments: ['Botox / Dysport', 'Microneedling', 'PRP Therapy'],
      color: 'bg-sage-light',
      border: 'border-sage',
    },
    {
      name: 'Subcutaneous',
      depth: '4mm+',
      treatments: ['Dermal Fillers', 'Kybella', 'Surgical Excision'],
      color: 'bg-gold-light',
      border: 'border-gold',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Layers className="text-gold" size={24} />
        <h3 className="font-display text-2xl">Depth of Care</h3>
      </div>
      <p className="text-charcoal/60 text-sm mb-8">
        Understanding where treatments take effect. Hover over the skin layers to see targeted
        procedures.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-2">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              onMouseEnter={() => setActiveLayer(i)}
              className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
                activeLayer === i
                  ? `${layer.color} ${layer.border} scale-[1.02]`
                  : 'bg-warm-white border-charcoal/5'
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-display text-xl">{layer.name}</h4>
                <span className="text-[10px] uppercase tracking-widest opacity-40">
                  {layer.depth}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-cream p-8 rounded-[2rem] min-h-[300px] flex flex-col justify-center border border-charcoal/5">
          {activeLayer !== null ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={activeLayer}
            >
              <h5 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">
                Targeted Treatments
              </h5>
              <ul className="space-y-4">
                {layers[activeLayer].treatments.map((t) => (
                  <li key={t} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-lg font-display">{t}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <div className="text-center text-charcoal/30 italic">
              Hover a skin layer to explore treatments
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Generation Timeline ---
function GenerationTimeline() {
  const timeline = [
    {
      year: '1983',
      title: 'The Foundation',
      desc: 'Dr. Fred Novice completes residency at Henry Ford Hospital.',
      icon: GraduationCap,
    },
    {
      year: '1999',
      title: 'Practice Opens',
      desc: 'Novice Group Dermatology established in Bloomfield Hills.',
      icon: Home,
    },
    {
      year: '2018',
      title: 'Second Generation',
      desc: 'Dr. Karlee Novice joins after Chief Residency at Henry Ford.',
      icon: User,
    },
    {
      year: '2023',
      title: 'The Trio Complete',
      desc: 'Dr. Taylor Novice joins with dual MD/MBA expertise.',
      icon: Heart,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <History className="text-gold" size={24} />
        <h3 className="font-display text-2xl">Generational Legacy</h3>
      </div>

      <div className="relative pt-12 pb-20">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-charcoal/10 -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-block bg-cream border border-charcoal/10 p-4 rounded-2xl mb-6 group-hover:bg-charcoal group-hover:text-warm-white transition-all duration-500">
                <span className="text-xl font-display font-bold">{item.year}</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-6 border-4 border-cream shadow-sm" />
              <h4 className="font-display text-lg mb-2">{item.title}</h4>
              <p className="text-xs text-charcoal/50 leading-relaxed px-4">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Cosmetic Canvas ---
function CosmeticCanvas() {
  const [selected, setSelected] = useState<string | null>(null);

  const hotspots = [
    {
      id: 'temples',
      top: '25%',
      left: '42%',
      title: 'Temple Volumization',
      desc: 'Restoring youthful contours with advanced fillers.',
    },
    {
      id: 'eyes',
      top: '32%',
      left: '50%',
      title: 'Periorbital Rejuvenation',
      desc: 'Precision Botox for a rested, natural appearance.',
    },
    {
      id: 'jaw',
      top: '65%',
      left: '42%',
      title: 'Jawline Definition',
      desc: 'Sculpting and tightening for a refined profile.',
    },
    {
      id: 'lips',
      top: '58%',
      left: '50%',
      title: 'Lip Enhancement',
      desc: 'Subtle, generational beauty focused on symmetry.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <User className="text-gold" size={24} />
        <h3 className="font-display text-2xl">The Cosmetic Canvas</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] bg-cream rounded-[3rem] overflow-hidden border border-charcoal/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800"
            className="w-full h-full object-cover opacity-60 grayscale"
            alt="Facial map"
            crossOrigin="anonymous"
          />

          {hotspots.map((spot) => (
            <motion.button
              key={spot.id}
              type="button"
              onClick={() => setSelected(spot.id)}
              style={{ top: spot.top, left: spot.left }}
              whileHover={{ scale: 1.2 }}
              className={`absolute w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === spot.id ? 'bg-gold border-gold' : 'bg-warm-white/50 border-gold/50'
              }`}
              aria-label={spot.title}
            >
              <div className={`w-2 h-2 rounded-full ${selected === spot.id ? 'bg-warm-white' : 'bg-gold'}`} />
            </motion.button>
          ))}
        </div>

        <div className="space-y-8">
          <p className="text-charcoal/60 text-sm">
            Click on the markers to explore our specialized approach to aesthetic harmony.
          </p>

          <div className="min-h-[200px]">
            {selected ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={selected}
                className="p-8 rounded-3xl bg-warm-white border border-charcoal/5 shadow-sm"
              >
                <h4 className="text-2xl font-display mb-4">
                  {hotspots.find((s) => s.id === selected)?.title}
                </h4>
                <p className="text-charcoal/60 leading-relaxed">
                  {hotspots.find((s) => s.id === selected)?.desc}
                </p>
                <button
                  type="button"
                  className="mt-6 text-gold uppercase tracking-widest text-[10px] font-bold flex items-center space-x-2"
                >
                  <span>View Procedure Details</span>
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            ) : (
              <div className="p-12 border-2 border-dashed border-charcoal/10 rounded-3xl flex items-center justify-center text-charcoal/30 italic">
                Select a feature to begin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Cosmetic Carousel ---
function CosmeticCarousel() {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      title: 'Botox & Dysport',
      description:
        'Precision injections to smooth fine lines while maintaining natural expression.',
      image:
        'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Dermal Fillers',
      description:
        'Restoring lost volume and enhancing facial contours for a youthful, lifted look.',
      image:
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Laser Resurfacing',
      description:
        'Advanced laser technology to improve texture, reduce pigmentation, and stimulate collagen.',
      image:
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Chemical Peels',
      description:
        'Medical-grade peels tailored to your skin type to reveal a brighter, smoother complexion.',
      image:
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Microneedling with PRP',
      description:
        'Triggers the body&rsquo;s natural healing response for firmer, glowing skin.',
      image:
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  const next = () => setIndex((p) => (p + 1) % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="text-gold" size={24} />
          <h3 className="font-display text-2xl">Aesthetic Offerings</h3>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="p-3 rounded-full border border-charcoal/10 hover:bg-charcoal hover:text-warm-white transition-all"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="p-3 rounded-full border border-charcoal/10 hover:bg-charcoal hover:text-warm-white transition-all"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative h-[450px] overflow-hidden rounded-[2.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2"
          >
            <div className="relative h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slides[index].image}
                alt={slides[index].title}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 to-transparent" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center bg-cream/40 backdrop-blur-sm">
              <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                Featured Treatment
              </span>
              <h4 className="text-3xl md:text-4xl font-display mb-6">{slides[index].title}</h4>
              <p
                className="text-charcoal/60 text-lg leading-relaxed mb-10"
                dangerouslySetInnerHTML={{ __html: slides[index].description }}
              />
              <button
                type="button"
                className="group flex items-center space-x-4 text-charcoal uppercase tracking-widest text-xs font-bold"
              >
                <span>Explore Treatment</span>
                <div className="w-12 h-px bg-charcoal/20 group-hover:w-20 group-hover:bg-gold transition-all" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === i ? 'w-8 bg-gold' : 'w-2 bg-charcoal/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// --- Main Showcase ---
export function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Microscope', icon: Microscope },
    { name: 'Skin Layers', icon: Layers },
    { name: '3D Anatomy', icon: Box },
    { name: 'Aesthetics', icon: Sparkles },
    { name: 'Legacy', icon: History },
    { name: 'Cosmetic', icon: User },
  ];

  return (
    <Section bg="cream" padding="xl" id="showcase">
      <div className="text-center mb-16">
        <SectionLabel align="center">An Interactive Tour</SectionLabel>
        <SignatureHeadline
          primary="Explore the practice"
          accent="up close."
          align="center"
          size="lg"
        />
        <p className="mt-6 max-w-2xl mx-auto text-warm-gray text-lg">
          Most derm websites describe what they do. Ours lets you experience it.
        </p>
      </div>

      <div className="bg-warm-white rounded-[3rem] shadow-2xl overflow-hidden border border-charcoal/5">
        <div className="flex flex-wrap border-b border-charcoal/5">
          {tabs.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(i)}
                className={`flex-1 flex items-center justify-center space-x-3 py-7 px-4 transition-all ${
                  activeTab === i
                    ? 'bg-charcoal text-warm-white'
                    : 'hover:bg-cream text-charcoal/60'
                }`}
              >
                <Icon size={18} />
                <span className="text-[11px] uppercase tracking-widest font-bold hidden sm:inline">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-8 md:p-16">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 0 && <MicroscopeView />}
            {activeTab === 1 && <DepthOfCare />}
            {activeTab === 2 && <Skin3DView />}
            {activeTab === 3 && <CosmeticCarousel />}
            {activeTab === 4 && <GenerationTimeline />}
            {activeTab === 5 && <CosmeticCanvas />}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
