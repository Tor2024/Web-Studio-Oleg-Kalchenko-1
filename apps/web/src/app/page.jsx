"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { ArrowRight, Send, Palette, Code, Fingerprint, Zap, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion, useMotionValue, useTransform } from "framer-motion";
import PolaroidCard from "../components/PolaroidCard";
import Footer from "../components/Footer";
import { useContentData } from "../utils/useContentData";
import FloatingShapes from "../components/FloatingShapes";
import BusAnimation from "../components/BusAnimation";
import HandDrawnSlideshow from "../components/HandDrawnSlideshow";
import HandDrawnFrame from "../components/HandDrawnFrame";
import CookieConsent from "../components/CookieConsent";
import HighlightedSlogan from "../components/HighlightedSlogan";

export const meta = () => {
  return [
    { title: "Web Studio Oleh Kalchenko | Creative Web Development" },
    { name: "description", content: "Transform your ideas into unique digital experiences. Specialized in React, Next.js, and creative web design." },
    { property: "og:title", content: "Web Studio Oleh Kalchenko | Creative Web Development" },
    { property: "og:description", content: "Transform your ideas into unique digital experiences. Specialized in React, Next.js, and creative web design." },
  ];
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const { items: newsItems, loading: newsLoading } = useContentData('news');
  const { items: portfolioItems, loading: portfolioLoading } = useContentData('portfolio');

  // Get top 3 portfolio items
  const featuredProjects = (portfolioItems || []).slice(0, 3);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


  const layer1X = useTransform(mouseX, [-500, 500], [-20, 20]);
  const layer1Y = useTransform(mouseY, [-500, 500], [-20, 20]);

  const layer2X = useTransform(mouseX, [-500, 500], [30, -30]);
  const layer2Y = useTransform(mouseY, [-500, 500], [30, -30]);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleTelegramContact = () => {
    window.open("https://t.me/oleh_kalchenko", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] relative">
      <FloatingShapes />
      <Header />

      {/* Секция Hero */}
      <section className="relative py-20 px-6 md:px-12 min-h-[90vh] flex items-center">
        {/* Цветные декоративные элементы с параллаксом */}
        <motion.div
          className="absolute top-20 left-10 opacity-30 pointer-events-none"
          style={{ x: layer1X, y: layer1Y }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M10,40 Q30,10 60,40 Q90,70 110,40"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-40 right-16 opacity-25 pointer-events-none"
          style={{ x: layer2X, y: layer2Y }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#F0C5A9"
              strokeWidth="2"
              fill="none"
              transform="rotate(15 50 50)"
              className="hand-drawn-animation"
            />
          </svg>
        </motion.div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Текстовый контент */}
            <div
              className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {/* Лейбл студии */}
              <div className="relative">
                <span className="font-caveat text-xl md:text-2xl text-[#7A7A7A] transform -rotate-2 inline-block animate-squiggle">
                  {t("home.studioLabel")}
                </span>
                {/* Цветная рисованная стрелка */}
                <svg
                  className="absolute -right-8 top-0 w-6 h-6 text-[#D4C5F9]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 17l9.2-9.2M17 17V7h-10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    transform="rotate(10 12 12)"
                  />
                </svg>
              </div>

              {/* Основной заголовок */}
              <div className="relative">
                <HighlightedSlogan />
              </div>

              {/* Описание */}
              <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] leading-relaxed max-w-lg">
                {t("home.description")}
              </p>

              {/* CTA кнопка */}
              <div className="relative pt-4">
                <button
                  onClick={handleTelegramContact}
                  className="relative group watercolor-hover"
                >
                  {/* Цветная рисованная граница кнопки */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 60"
                    preserveAspectRatio="none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="192"
                      height="52"
                      stroke="url(#buttonGradient)"
                      strokeWidth="2.5"
                      fill="none"
                      rx="6"
                      transform="rotate(-0.5 100 30)"
                    />
                    <defs>
                      <linearGradient
                        id="buttonGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#A8D5BA" />
                        <stop offset="50%" stopColor="#F0C5A9" />
                        <stop offset="100%" stopColor="#D4C5F9" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Цветной фон при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4F8] via-[#F0E8D6] to-[#F5E6F8] opacity-0 group-hover:opacity-80 transition-opacity duration-600 rounded-lg transform rotate-1"></div>

                  <div className="relative z-10 flex items-center justify-center px-8 py-4 font-kalam text-lg font-semibold text-[#2A2A2A]">
                    <Send size={20} className="mr-3" />
                    {t("home.telegramButton")}
                    <ArrowRight
                      size={20}
                      className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Визуальный элемент - Слайдшоу */}
            <motion.div
              className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ x: layer2X, y: layer2Y }}
            >
              <HandDrawnSlideshow />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 md:px-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
              {t("home.services.title")}
            </h2>
            <p className="font-kalam text-lg text-[#5A5A5A]">
              {t("home.services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t("home.services.items") || []).map((item, index) => {
              const Icon = { Palette, Code, Fingerprint, Zap }[item.icon] || Palette;
              return (
                <div key={index} className="group p-6 rounded-2xl border-2 border-dashed border-[#E0E0E0] hover:border-[#A8D5BA] transition-colors duration-300 flex flex-col items-center text-center bg-[#FEFEFE] hover:shadow-lg">
                  <div className="w-16 h-16 mb-6 bg-[#F9F9F9] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-[#2A2A2A] group-hover:text-[#A8D5BA] transition-colors" />
                  </div>
                  <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-3">{item.title}</h3>
                  <p className="font-kalam text-sm text-[#5A5A5A] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Featured Projects Section */}
      <section className="py-20 px-6 md:px-12 bg-[#F9F9F9] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-4">
              {t("home.featured.title")}
            </h2>
            <p className="font-kalam text-lg text-[#5A5A5A]">
              {t("home.featured.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioLoading ? (
              <div className="col-span-full text-center font-kalam text-[#A8D5BA]">Loading...</div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((project, index) => (
                <div key={index} className="group relative">
                  <HandDrawnFrame className="aspect-[4/3] bg-gray-50 transition-transform duration-500 group-hover:scale-105">
                    {project.cover ? (
                      <img src={project.cover} alt={project.title?.en || 'Project'} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                  </HandDrawnFrame>
                  <div className="mt-4">
                    <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A]">{project.title?.en || project.title?.ru || 'Untitled'}</h3>
                    <p className="font-kalam text-sm text-[#7A7A7A] line-clamp-2">{project.description?.en || project.description?.ru || ''}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center font-kalam text-[#7A7A7A]">No projects found.</div>
            )}
          </div>

          <div className="text-center mt-12">
            <a href="/portfolio" className="inline-block px-8 py-3 bg-[#2A2A2A] text-white font-kalam rounded-full hover:bg-[#4A4A4A] transition-colors">
              {t("portfolio.viewAll")}
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A] mb-16 text-center">
            {t("home.why.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(t("home.why.items") || []).map((item, index) => (
              <div key={index} className="relative p-8 group">
                {/* Hand-drawn background blob */}
                <div className={`absolute inset-0 opacity-20 rounded-2xl transform transition-transform duration-500 group-hover:scale-105 ${index === 0 ? "bg-[#F0C5A9] rotate-2" : index === 1 ? "bg-[#A8D5BA] -rotate-1" : "bg-[#D4C5F9] rotate-1"
                  }`}></div>

                <div className="relative z-10 text-center">
                  {/* Icon Placeholder */}
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white rounded-full shadow-sm">
                    {index === 0 && <span className="text-2xl">🎨</span>}
                    {index === 1 && <span className="text-2xl">⚡</span>}
                    {index === 2 && <span className="text-2xl">🤝</span>}
                  </div>
                  <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-3">{item.title}</h3>
                  <p className="font-kalam text-[#5A5A5A]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Call to Action Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto relative">
          {/* Decorative border */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <rect x="10" y="10" width="980" height="280" rx="20" stroke="#2A2A2A" strokeWidth="2" fill="none" strokeDasharray="10,10" />
          </svg>

          <div className="bg-[#FDFD96] bg-opacity-20 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-caveat text-4xl md:text-6xl font-bold text-[#2A2A2A] mb-6">
                {t("home.cta.title")}
              </h2>
              <p className="font-kalam text-xl text-[#5A5A5A] mb-8 max-w-2xl mx-auto">
                {t("home.cta.subtitle")}
              </p>
              <a href="/contact" className="inline-block px-10 py-4 bg-[#F0C5A9] text-[#2A2A2A] font-caveat text-2xl font-bold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all transform rotate-1 hover:rotate-0">
                {t("home.cta.button")} 🚀
              </a>
            </div>

            {/* Background doodles */}
            <div className="absolute top-0 left-0 w-32 h-32 opacity-10 transform -translate-x-10 -translate-y-10">
              <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#F0C5A9" /></svg>
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 transform translate-x-10 translate-y-10">
              <svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="#A8D5BA" transform="rotate(15 50 50)" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="max-w-2xl relative">
              <div className="flex items-center justify-center gap-4 mb-4">
                <BusAnimation />
                <h2 className="font-caveat text-4xl md:text-5xl font-bold text-[#2A2A2A]">
                  {t("news.title")}
                </h2>
              </div>
              <p className="font-kalam text-lg text-[#5A5A5A]">
                {t("news.description")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {newsLoading ? (
              <div className="col-span-full text-center font-kalam text-[#A8D5BA]">Loading...</div>
            ) : (newsItems || []).slice(0, 3).map((item, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-2rem)] max-w-sm">
                <PolaroidCard
                  image={item.image}
                  title={item.title?.[currentLanguage] || item.title?.en}
                  description={item.description?.[currentLanguage] || item.description?.en}
                  rotation={index % 2 === 0 ? -2 : 2}
                  link={`/news/${item.slug}`}
                  linkText={t("home.featured.viewCase")}
                  date={item.date}
                  author={item.author}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CookieConsent />
      <Footer />
    </div >
  );
}
