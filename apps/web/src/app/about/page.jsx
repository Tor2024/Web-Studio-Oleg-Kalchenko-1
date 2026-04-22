
import Header from '../../components/Header';
import { useLanguage } from '../../context/LanguageContext';
import PolaroidFrame from '../../components/PolaroidFrame';
import FloatingShapes from '../../components/FloatingShapes';

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <FloatingShapes />
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-10 px-4 sm:py-14 sm:px-8 md:py-16 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-4xl sm:text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t('about.title')}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 sm:w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#aboutGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="aboutGradient"
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
          <p className="font-kalam text-base sm:text-lg md:text-xl text-[#5A5A5A] mt-6 sm:mt-8 max-w-xl sm:max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-10 left-2 sm:top-20 sm:left-10 opacity-20">
          <svg width="60" height="60" className="sm:w-80 sm:h-80" viewBox="0 0 80 80">
            <rect
              x="10"
              y="10"
              width="40"
              height="40"
              stroke="#A8D5BA"
              strokeWidth="2.5"
              fill="none"
              transform="rotate(25 40 40)"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Основной контент: слева текст, справа фото с рамкой */}
      <section className="py-8 px-4 sm:py-12 sm:px-8 md:py-12 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 flex flex-col md:flex-row gap-8 items-center border border-[#E0E0E0]">
          {/* Текстовый блок слева */}
          <div className="flex-1 text-left">
            <h2 className="font-kalam text-xl sm:text-2xl text-[#2A2A2A] mb-4">{t('about.title')}</h2>
            <p className="text-base sm:text-lg text-[#5A5A5A] mb-6 leading-relaxed">
              {t('about.content')}
            </p>
            <ul className="list-disc list-inside text-[#5A5A5A] space-y-2 font-kalam">
              {Array.isArray(t('about.list'))
                ? t('about.list').map((item, idx) => <li key={idx}>{item}</li>)
                : null}
            </ul>
          </div>
          {/* Фото с Polaroid рамкой справа */}
          <div className="flex-1 flex justify-center items-center relative min-w-[220px] max-w-[320px]">
            <PolaroidFrame
              src="/photo_2025-02-28_10-51-52.jpg"
              alt="Oleh Kalchenko"
              className="w-64 sm:w-72 transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 px-4 sm:px-8 md:px-12 bg-[#F9F9F9] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-caveat text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t('about.values.items') || []).map((item, index) => (
              <div key={index} className="relative p-8 group">
                {/* Hand-drawn background blob */}
                <div className={`absolute inset-0 opacity-20 rounded-2xl transform transition-transform duration-500 group-hover:scale-105 ${index === 0 ? "bg-[#F0C5A9] rotate-1" : index === 1 ? "bg-[#A8D5BA] -rotate-2" : "bg-[#D4C5F9] rotate-2"
                  }`}></div>

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{index === 0 ? '✨' : index === 1 ? '💎' : '❤️'}</span>
                  </div>
                  <h3 className="font-caveat text-2xl font-bold text-[#2A2A2A] mb-3">{item.title}</h3>
                  <p className="font-kalam text-[#5A5A5A] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-8 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-caveat text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">
            {t('about.process.title')}
          </h2>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <svg className="hidden md:block absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 pointer-events-none opacity-30" viewBox="0 0 800 100" preserveAspectRatio="none">
              <path d="M50,50 C150,20 250,80 400,50 C550,20 650,80 750,50" stroke="#A8D5BA" strokeWidth="2" fill="none" strokeDasharray="10 5" />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {(t('about.process.steps') || []).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-white border-2 border-[#F0C5A9] rounded-full flex items-center justify-center text-2xl font-caveat font-bold text-[#2A2A2A] mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 relative">
                    {index + 1}
                    {/* Decorative circle */}
                    <svg className="absolute -inset-1 w-[72px] h-[72px] animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 100">
                      <path d="M50,10 A40,40 0 1,1 49,10" stroke="#D4C5F9" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                    </svg>
                  </div>
                  <h3 className="font-kalam text-xl font-bold text-[#2A2A2A] mb-2">{step.title}</h3>
                  <p className="text-[#5A5A5A] text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 px-4 sm:px-8 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-caveat text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-8">
            {t('about.techStack.title')}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'Figma', 'Git'].map((tech, index) => (
              <span key={index} className="px-4 py-2 bg-white border-2 border-[#2A2A2A] rounded-full font-kalam text-[#2A2A2A] shadow-[2px_2px_0px_0px_rgba(42,42,42,1)] hover:translate-y-1 hover:shadow-none transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
