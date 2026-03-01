"use client";

import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  bgImage: string | null;
  bgGradient: string | null;
  accentColor: string | null;
}

const fallbackSlides: Slide[] = [
  {
    id: "1",
    title: "Scientific & Laboratory Equipment",
    subtitle: "Your Trusted Partner in Science",
    description:
      "We supply high-quality laboratory instruments, chemicals, and glassware for research institutions, universities, and industries across India.",
    ctaText: "Explore Products",
    ctaLink: "/products",
    bgImage: null,
    bgGradient: "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 60%, #0d0d1a 100%)",
    accentColor: "#6C63FF",
  },
  {
    id: "2",
    title: "Solarbio Research Products",
    subtitle: "Premium Quality Reagents & Chemicals",
    description:
      "Authorized distributors of Solarbio life science products. Browse our extensive catalog of biochemicals, antibodies, and molecular biology reagents.",
    ctaText: "View Solarbio",
    ctaLink: "/products?brand=Solarbio",
    bgImage: null,
    bgGradient: "linear-gradient(135deg, #1B5E20 0%, #0d3311 60%, #091f0b 100%)",
    accentColor: "#66BB6A",
  },
  {
    id: "3",
    title: "Applications & Solutions",
    subtitle: "Industry-Leading Support",
    description:
      "From pharmaceuticals to food testing, we provide complete laboratory solutions tailored to your specific research and quality control needs.",
    ctaText: "Our Applications",
    ctaLink: "/applications",
    bgImage: null,
    bgGradient: "linear-gradient(135deg, #B71C1C 0%, #7f1313 60%, #4a0b0b 100%)",
    accentColor: "#EF5350",
  },
];

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((res) => res.json())
      .then((data: Slide[]) => {
        if (data && data.length > 0) setSlides(data);
      })
      .catch(() => {});
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide, slides.length]);

  const prevSlide = useCallback(() => {
    goToSlide((current - 1 + slides.length) % slides.length);
  }, [current, goToSlide, slides.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "520px",
        overflow: "hidden",
        background: "#0d0d1a",
      }}
    >
      {/* Slides */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === current ? 1 : 0,
              transition: "opacity 0.6s ease-in-out",
              zIndex: index === current ? 2 : 1,
              background: slide.bgImage
                ? `url(${slide.bgImage}) center/cover no-repeat`
                : slide.bgGradient || "linear-gradient(135deg, #2D2B7F 0%, #1a1a2e 60%, #0d0d1a 100%)",
            }}
          >
            {/* Decorative Elements */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                overflow: "hidden",
              }}
            >
              {/* Circle 1 */}
              <div
                style={{
                  position: "absolute",
                  width: "500px",
                  height: "500px",
                  top: "-150px",
                  right: "-100px",
                  borderRadius: "50%",
                  border: `1px solid ${slide.accentColor || "#6C63FF"}`,
                  opacity: 0.12,
                }}
              />
              {/* Circle 2 */}
              <div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  bottom: "-80px",
                  left: "-60px",
                  borderRadius: "50%",
                  border: `1px solid ${slide.accentColor || "#6C63FF"}`,
                  opacity: 0.12,
                }}
              />
              {/* Dots pattern */}
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  right: "80px",
                  width: "120px",
                  height: "120px",
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              {/* SVG decoration */}
              <svg
                style={{
                  position: "absolute",
                  right: "5%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "380px",
                  height: "380px",
                  opacity: 0.6,
                }}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="200" cy="200" r="180" stroke={slide.accentColor || "#6C63FF"} strokeWidth="0.5" strokeDasharray="8 8" opacity="0.3" />
                <circle cx="200" cy="200" r="130" stroke={slide.accentColor || "#6C63FF"} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
                <circle cx="200" cy="200" r="80" stroke={slide.accentColor || "#6C63FF"} strokeWidth="0.5" opacity="0.15" />
                <polygon points="200,40 260,80 260,160 200,200 140,160 140,80" stroke={slide.accentColor || "#6C63FF"} strokeWidth="0.5" opacity="0.12" fill="none" />
                <polygon points="200,100 230,118 230,155 200,173 170,155 170,118" stroke={slide.accentColor || "#6C63FF"} strokeWidth="0.5" opacity="0.18" fill="none" />
              </svg>
            </div>

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 3,
                maxWidth: "1400px",
                margin: "0 auto",
                padding: "0 40px",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ maxWidth: "600px" }}>
                <span className="hero-slide-subtitle">{slide.subtitle}</span>
                <h2 className="hero-slide-title">{slide.title}</h2>
                <p className="hero-slide-description">{slide.description}</p>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <a
                    href={slide.ctaLink || "/products"}
                    className="hero-btn-primary"
                    style={{ background: slide.accentColor || "#6C63FF" }}
                  >
                    {slide.ctaText || "Learn More"}
                  </a>
                  <a href="/contact" className="hero-btn-secondary">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="hero-arrow"
        style={{ position: "absolute", top: "50%", left: "24px", transform: "translateY(-50%)", zIndex: 10 }}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>
      <button
        className="hero-arrow"
        style={{ position: "absolute", top: "50%", right: "24px", transform: "translateY(-50%)", zIndex: 10 }}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "10px",
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: index === current ? "#ffffff" : "rgba(255,255,255,0.25)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              transform: index === current ? "scale(1.2)" : "scale(1)",
              boxShadow: index === current ? "0 0 10px rgba(255,255,255,0.4)" : "none",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: "rgba(255,255,255,0.1)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${((current + 1) / slides.length) * 100}%`,
            background: slides[current]?.accentColor || "#6C63FF",
            transition: "width 0.6s ease",
          }}
        />
      </div>
    </section>
  );
}
