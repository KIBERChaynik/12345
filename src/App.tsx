import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const coffeeMenu = [
  { name: 'Капучино', desc: '350 мл · Нежный, сбалансированный, уютный', price: '180 ₽', img: '/images/coffee-1.jpg' },
  { name: 'Латте', desc: '350 мл · Молочный, мягкий и богатый по вкусу', price: '180 ₽', img: '/images/coffee-2.jpg' },
  { name: 'Раф', desc: '350 мл · Сливочный, нежный, чуть сладкий', price: '200 ₽', img: '/images/coffee-3.jpg' },
  { name: 'Американо', desc: '250 мл · Мягкая интенсивность без потери глубины', price: '110 ₽', img: '/images/coffee-4.jpg' },
  { name: 'Флэт-уайт', desc: '250 мл · Плотный, насыщенный, глубокий вкус', price: '175 ₽', img: '/images/coffee-5.jpg' },
  { name: 'Эспрессо', desc: '36 мл · Концентрированный, мощный, ёмкий', price: '100 ₽', img: '/images/coffee-6.jpg' },
];

const features = ['Wi-Fi', 'Зарядки', 'Сиропы', 'Альт. молоко', 'Завтраки', 'Coffee to go'];

/* ─── Icons ─── */
const CoffeeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const ArrowDown = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const VKIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.136.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.27 4.675 2.608 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z"/>
  </svg>
);

/* ─── Main App ─── */
function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Refs for animations
  const heroCircleRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const menuTitleRef = useRef<HTMLDivElement>(null);
  const menuCardsRef = useRef<HTMLDivElement>(null);
  const priceSectionRef = useRef<HTMLDivElement>(null);
  const priceNumberRef = useRef<HTMLSpanElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const aboutLeftRef = useRef<HTMLDivElement>(null);
  const aboutRightRef = useRef<HTMLDivElement>(null);
  const aboutFeaturesRef = useRef<HTMLDivElement>(null);
  const addressLeftRef = useRef<HTMLDivElement>(null);
  const addressMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Nav scroll detection
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (heroCircleRef.current) {
      tl.fromTo(
        heroCircleRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );
    }

    if (heroTextRef.current) {
      const words = heroTextRef.current.querySelectorAll('.hero-word');
      tl.fromTo(
        words,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
        '-=0.6'
      );
    }

    // Hero parallax
    if (heroCircleRef.current) {
      gsap.to(heroCircleRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroCircleRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    }

    // Menu title animation
    if (menuTitleRef.current) {
      gsap.fromTo(
        menuTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: menuTitleRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    // Menu cards stagger
    if (menuCardsRef.current) {
      const cards = menuCardsRef.current.querySelectorAll('.menu-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: menuCardsRef.current,
            start: 'top 75%',
          },
        }
      );
    }

    // Price counter animation
    if (priceNumberRef.current && priceSectionRef.current) {
      ScrollTrigger.create({
        trigger: priceSectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo(
            priceNumberRef.current,
            { innerText: 0 },
            {
              innerText: 160,
              duration: 1.5,
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate: function () {
                if (priceNumberRef.current) {
                  priceNumberRef.current.textContent = Math.round(Number(priceNumberRef.current.textContent || 0)) + ' ₽';
                }
              },
            }
          );
        },
        once: true,
      });
    }

    // About section
    if (aboutTitleRef.current) {
      gsap.fromTo(
        aboutTitleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutTitleRef.current, start: 'top 80%' },
        }
      );
    }

    if (aboutLeftRef.current) {
      gsap.fromTo(
        aboutLeftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutLeftRef.current, start: 'top 75%' },
        }
      );
    }

    if (aboutRightRef.current) {
      gsap.fromTo(
        aboutRightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: aboutRightRef.current, start: 'top 75%' },
        }
      );
    }

    if (aboutFeaturesRef.current) {
      const items = aboutFeaturesRef.current.querySelectorAll('.feature-item');
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: aboutFeaturesRef.current, start: 'top 85%' },
        }
      );
    }

    // Address section
    if (addressLeftRef.current) {
      const items = addressLeftRef.current.querySelectorAll('.address-item');
      gsap.fromTo(
        items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: addressLeftRef.current, start: 'top 75%' },
        }
      );
    }

    if (addressMapRef.current) {
      gsap.fromTo(
        addressMapRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: addressMapRef.current, start: 'top 75%' },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    }
  };

  return (
    <div className="relative">
      {/* ═══ Navigation ═══ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: navScrolled ? 64 : 80,
          backgroundColor: 'rgba(252, 249, 243, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="max-w-[1280px] mx-auto h-full flex items-center justify-between" style={{ padding: '0 40px' }}>
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
            <CoffeeIcon />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 600, letterSpacing: '0.05em' }}>
              UMD COFFEE
            </span>
          </button>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('menu')} className="link-underline" style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              Меню
            </button>
            <button onClick={() => scrollTo('about')} className="link-underline" style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              О нас
            </button>
            <button onClick={() => scrollTo('address')} className="link-underline" style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-dark)', textTransform: 'uppercase' }}>
              Адрес
            </button>
          </div>

          {/* Phone */}
          <a
            href="tel:+79673500003"
            className="flex items-center gap-2"
            style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--text-dark)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span className="hidden sm:inline">+7 (967) 350-00-03</span>
          </a>
        </div>
      </nav>

      {/* ═══ Hero ═══ */}
      <section id="hero" className="relative min-h-[100dvh] flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 40px 40px' }}>
        {/* Central circle image */}
        <div
          ref={heroCircleRef}
          className="relative circle-image overflow-hidden"
          style={{ width: 'min(45vw, 500px)', height: 'min(45vw, 500px)', marginTop: 40 }}
        >
          <img
            src="/images/hero.jpg"
            alt="Кофейная выпечка UMD Coffee"
            className="w-full h-full object-cover"
          />
          {/* Text overlay on image */}
          <div
            ref={heroTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ textShadow: '0 4px 24px rgba(252, 249, 243, 0.9), 0 2px 8px rgba(0,0,0,0.3)' }}
          >
            <span className="hero-word" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--text-dark)', lineHeight: 1.1, textAlign: 'center' }}>
              Я —
            </span>
            <span className="hero-word" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--text-dark)', lineHeight: 1.1, textAlign: 'center' }}>
              КОФЕ
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="w-full max-w-[1280px] flex justify-between items-end mt-12" style={{ padding: '0 20px' }}>
          <div>
            <button onClick={() => scrollTo('menu')} className="link-underline" style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text-muted)' }}>
              Меню
            </button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
              Кофе, выпечка, завтраки
            </p>
          </div>
          <div className="text-right">
            <button onClick={() => scrollTo('address')} className="link-underline" style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 600, color: 'var(--text-muted)' }}>
              Адрес
            </button>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
              пл. Калинина, 37, Калининград
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex gap-3 flex-wrap justify-center">
          {['#кофе', '#выпечка', '#завтраки', '#вайфай', '#калининград'].map((tag) => (
            <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <button onClick={() => scrollTo('menu')} className="mt-8 animate-bounce" style={{ color: 'var(--text-muted)' }}>
          <ArrowDown />
        </button>
      </section>

      {/* ═══ Menu Section ═══ */}
      <section id="menu" style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 40px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* Title */}
          <div ref={menuTitleRef} className="text-center mb-16">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}>
              <span style={{ color: 'var(--text-dark)' }}>ЧТО ТАМ</span>
              <br />
              <span style={{ color: 'var(--accent)', paddingLeft: 80 }}>У НАС?</span>
            </h2>
          </div>

          {/* Coffee Grid */}
          <div ref={menuCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeMenu.map((item) => (
              <div key={item.name} className="menu-card group cursor-pointer">
                <div className="overflow-hidden" style={{ borderRadius: 24, aspectRatio: '1' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-baseline">
                    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600, color: 'var(--text-dark)' }}>
                      {item.name}
                    </h3>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>
                      {item.price}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                  <div className="h-[2px] mt-3 transition-all duration-300" style={{ backgroundColor: 'var(--accent)', width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Price Highlight ═══ */}
      <section
        ref={priceSectionRef}
        className="relative min-h-[60vh] flex items-center justify-center noise-overlay overflow-hidden"
        style={{ backgroundColor: 'var(--accent-light)' }}
      >
        <div className="text-center relative z-10" style={{ padding: '80px 40px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 4vw, 48px)', fontWeight: 700, color: 'var(--text-light)', marginBottom: 16 }}>
            КАПУЧИНО ОТ
          </p>
          <span
            ref={priceNumberRef}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(60px, 12vw, 120px)', fontWeight: 800, color: 'var(--bg-primary)', lineHeight: 1 }}
          >
            0 ₽
          </span>
        </div>
      </section>

      {/* ═══ About Section ═══ */}
      <section id="about" style={{ backgroundColor: 'var(--bg-primary)', padding: '120px 40px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* Title */}
          <div ref={aboutTitleRef} className="mb-12">
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}>
              <span style={{ color: 'var(--text-dark)' }}>МЫ —</span>
              <br />
              <span style={{ color: 'var(--accent)' }}>КОФЕЙНЯ</span>
            </h2>
          </div>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div ref={aboutLeftRef}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: 24 }}>
                Мы верим, что хороший кофе — это не роскошь, а ежедневная радость. В UMD Coffee мы готовим кофе 
                с заботой: используем свежеобжаренные зёрна, предлагаем альтернативное молоко и сиропы на любой вкус. 
                А ещё у нас есть выпечка, десерты и завтраки — всё, что нужно для идеального утра.
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--text-dark)', lineHeight: 1.7 }}>
                Уютная атмосфера, Wi-Fi и розетки для работы, а также доставка через Яндекс.Еда — 
                заходи за кофе навынос или оставайся пообщаться. Мы работаем каждый день, 
                чтобы ты мог получить свою порцию тепла в любое время.
              </p>
            </div>

            {/* Right: Image */}
            <div ref={aboutRightRef} className="flex justify-center lg:justify-end">
              <div className="circle-image overflow-hidden" style={{ width: 'min(100%, 400px)', height: 'min(100%, 400px)' }}>
                <img src="/images/interior.jpg" alt="Интерьер UMD Coffee" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Features */}
          <div ref={aboutFeaturesRef} className="flex flex-wrap justify-center gap-0 mt-16">
            {features.map((feature, i) => (
              <span key={feature} className="feature-item flex items-center" style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {feature}
                {i < features.length - 1 && (
                  <span className="mx-4" style={{ width: 1, height: 16, backgroundColor: 'var(--text-muted)', opacity: 0.3, display: 'inline-block' }} />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Address Section ═══ */}
      <section
        id="address"
        className="relative noise-overlay"
        style={{ backgroundColor: 'var(--bg-inverse)', padding: '120px 40px', minHeight: '80vh' }}
      >
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
            {/* Left: Info */}
            <div ref={addressLeftRef}>
              <div className="address-item mb-8">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.2 }}>
                  <span style={{ color: 'var(--text-light)' }}>КАК НАС</span>
                  <br />
                  <span style={{ color: 'var(--accent)' }}>НАЙТИ?</span>
                </h2>
              </div>

              <div className="address-item mb-6">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, color: 'var(--text-light)', lineHeight: 1.6 }}>
                  пл. Калинина, 37
                  <br />
                  Калининград, Россия
                </p>
              </div>

              <div className="address-item mb-6">
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Пн–Пт: 08:00–19:30
                  <br />
                  Сб–Вс: 09:00–19:30
                </p>
              </div>

              <div className="address-item mb-6">
                <a
                  href="tel:+79673500003"
                  className="link-underline"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'var(--text-light)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  +7 (967) 350-00-03
                </a>
              </div>

              <div className="address-item flex items-center gap-4">
                <a
                  href="https://t.me/umd888_lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-200"
                  style={{ color: 'var(--text-light)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-light)')}
                >
                  <TelegramIcon />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>Telegram</span>
                </a>
                <a
                  href="https://yandex.ru/maps/org/umd_coffee/244201089330/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors duration-200"
                  style={{ color: 'var(--text-light)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-light)')}
                >
                  <VKIcon />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14 }}>Yandex Карты</span>
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div ref={addressMapRef} className="flex justify-center">
              <div className="circle-image overflow-hidden" style={{ width: 'min(50vw, 450px)', height: 'min(50vw, 450px)' }}>
                <img src="/images/map.jpg" alt="Карта расположения UMD Coffee" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Bottom tags */}
          <div className="flex justify-center gap-4 mt-16">
            {['#кофе', '#выпечка', '#завтраки', '#калининград', '#умдкофе'].map((tag) => (
              <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer style={{ backgroundColor: 'var(--bg-inverse)', padding: '24px 40px', borderTop: '1px solid rgba(107, 91, 79, 0.2)' }}>
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)' }}>
            UMD Coffee © 2025
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', opacity: 0.6 }}>
            Рейтинг 5.0 · 56 оценок · Калининград
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
