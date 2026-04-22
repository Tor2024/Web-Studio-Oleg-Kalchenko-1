
import React from "react";
import Header from "../../components/Header";
import { Calendar, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useContentData } from "../../utils/useContentData";
import FloatingShapes from "../../components/FloatingShapes";
import BusAnimation from "../../components/BusAnimation";
import HandDrawnFrame from "../../components/HandDrawnFrame";

export default function NewsPage() {
  const { currentLanguage, t } = useLanguage();
  const { items: newsItems, loading } = useContentData('news');

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <FloatingShapes />
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4 relative">
            <BusAnimation />
            <h1 className="font-caveat text-5xl md:text-7xl font-bold text-[#2A2A2A]">
              {t('news.title')}
            </h1>

            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-6 pointer-events-none"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#newsGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="newsGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#A8D5BA" />
                  <stop offset="50%" stopColor="#F0C5A9" />
                  <stop offset="100%" stopColor="#D4C5F9" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="font-kalam text-lg md:text-xl text-[#5A5A5A] mt-8 max-w-2xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-20 right-16 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="#D4C5F9"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Список новостей */}
      <section className="py-12 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {newsItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="mx-auto mb-6 opacity-40"
                >
                  <rect
                    x="20"
                    y="20"
                    width="80"
                    height="80"
                    stroke="#D4C5F9"
                    strokeWidth="2.5"
                    fill="none"
                    transform="rotate(15 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="25"
                    stroke="#A8D5BA"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
                <p className="font-kalam text-xl text-[#D4C5F9]">
                  No news items yet. Create some in the admin panel.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-12 lg:space-y-16">
              {newsItems.map((news, index) => (
                <article
                  key={news.folder_name || index}
                  className="relative group"
                >
                  <HandDrawnFrame
                    className="w-full transition-transform duration-500 hover:-translate-y-1"
                    color={index % 3 === 0 ? "#F0C5A9" : index % 3 === 1 ? "#D4C5F9" : "#A8D5BA"}
                  >
                    <div className="relative bg-white/50 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                      {/* Изображение */}
                      <div className="lg:col-span-1">
                        <div className="aspect-[4/3] relative overflow-hidden rounded-lg shadow-sm transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                          {news.cover ? (
                            <img
                              src={news.cover}
                              alt={news.title?.ru || news.title?.en || 'News'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#F5F5F5] flex items-center justify-center">
                              <Calendar size={48} className="text-[#F0C5A9]" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Контент */}
                      <div className="lg:col-span-2 space-y-4">
                        {/* Заголовок */}
                        <div className="relative">
                          <h2 className="font-caveat text-3xl lg:text-4xl font-bold text-[#2A2A2A] mb-3 group-hover:text-[#A8D5BA] transition-colors">
                            {news.title?.[currentLanguage] || news.title?.ru || news.title?.en || 'Untitled News'}
                          </h2>
                        </div>

                        {/* Дата и время */}
                        <div className="flex items-center space-x-4 text-[#5A5A5A] border-b border-dashed border-gray-200 pb-3">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} className="text-[#A8D5BA]" />
                            <span className="font-kalam text-sm">{news.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} className="text-[#F0C5A9]" />
                            <span className="font-kalam text-sm">5 min read</span>
                          </div>
                        </div>

                        {/* Содержимое */}
                        <div
                          className="font-kalam text-base lg:text-lg text-[#5A5A5A] leading-relaxed line-clamp-4"
                          dangerouslySetInnerHTML={{
                            __html: typeof news.content === 'string'
                              ? news.content
                              : news.content?.[currentLanguage] || news.content?.ru || news.content?.en || ''
                          }}
                        />

                        {/* Декоративный элемент */}
                        <div className="pt-4 flex justify-end">
                          <span className="font-caveat text-xl text-[#D4C5F9] group-hover:translate-x-2 transition-transform">Read more &rarr;</span>
                        </div>
                      </div>
                    </div>
                  </HandDrawnFrame>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
