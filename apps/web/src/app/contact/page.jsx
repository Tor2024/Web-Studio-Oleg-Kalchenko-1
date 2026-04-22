"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "../../components/Header";
import { Send, Mail, MessageCircle, User, FileText } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import FloatingShapes from "../../components/FloatingShapes";
import HandDrawnFrame from "../../components/HandDrawnFrame";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const contactMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/contact/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      <FloatingShapes />
      <Header />

      {/* Заголовок страницы */}
      <section className="relative py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative inline-block">
            <h1 className="font-caveat text-5xl md:text-7xl font-bold text-[#2A2A2A] mb-4">
              {t("contact.title")}
            </h1>
            {/* Цветное рисованное подчеркивание */}
            <svg
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4/5 h-6"
              viewBox="0 0 300 24"
            >
              <path
                d="M5,12 Q75,18 150,12 Q225,6 295,15"
                stroke="url(#contactGradient)"
                strokeWidth="4"
                fill="none"
                className="hand-drawn-animation"
              />
              <defs>
                <linearGradient
                  id="contactGradient"
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
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute top-20 right-16 opacity-20">
          <svg width="100" height="80" viewBox="0 0 100 80">
            <path
              d="M10,40 Q30,10 50,40 Q70,70 90,40"
              stroke="#F0C5A9"
              strokeWidth="2.5"
              fill="none"
              className="hand-drawn-animation"
            />
          </svg>
        </div>
      </section>

      {/* Секция контактов */}
      <section className="py-12 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Контактная информация */}
            <div className="lg:col-span-1 space-y-8">
              <div className="relative">
                <h2 className="font-caveat text-3xl font-bold text-[#2A2A2A] mb-6">
                  {t("contact.letsTalk")}
                </h2>

                <HandDrawnFrame color="#A8D5BA">
                  <div className="relative p-6 space-y-6 bg-white/50">
                    <div className="relative space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative p-2">
                          <Mail size={24} className="text-[#5A5A5A]" />
                        </div>
                        <div>
                          <p className="font-kalam text-lg text-[#2A2A2A]">
                            oleh@webstudio.de
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="relative p-2">
                          <MessageCircle size={24} className="text-[#5A5A5A]" />
                        </div>
                        <div>
                          <p className="font-kalam text-lg text-[#2A2A2A]">
                            @oleh_kalchenko
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-dashed border-gray-300">
                        <p className="font-kalam text-base text-[#7A7A7A] leading-relaxed">
                          {t("contact.responseTime")}
                        </p>
                      </div>
                    </div>
                  </div>
                </HandDrawnFrame>
              </div>
            </div>

            {/* Контактная форма */}
            <div className="lg:col-span-2">
              {isSubmitted ? (
                <HandDrawnFrame color="#A8D5BA">
                  <div className="relative text-center py-16 bg-white/50">
                    <div className="relative space-y-4">
                      <div className="relative inline-block mb-4">
                        <Send size={48} className="text-[#A8D5BA] mx-auto" />
                      </div>

                      <h3 className="font-caveat text-3xl font-bold text-[#2A2A2A]">
                        {t("contact.success.title")}
                      </h3>
                      <p className="font-kalam text-lg text-[#5A5A5A] max-w-md mx-auto">
                        {t("contact.success.description")}
                      </p>

                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-6 px-8 py-3 bg-[#2A2A2A] text-white font-kalam rounded-full hover:bg-[#4A4A4A] transition-colors"
                      >
                        {t("contact.form.newMessage")}
                      </button>
                    </div>
                  </div>
                </HandDrawnFrame>
              ) : (
                <HandDrawnFrame color="#D4C5F9">
                  <form onSubmit={handleSubmit} className="relative space-y-6 p-8 bg-white/50">
                    {/* Поле имени */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <User size={20} />
                        <span>{t("contact.form.name")} *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-white/50 border-b-2 border-[#A8D5BA] focus:border-[#2A2A2A] focus:outline-none transition-colors placeholder-gray-400"
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                    </div>

                    {/* Поле email */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <Mail size={20} />
                        <span>{t("contact.form.email")} *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-white/50 border-b-2 border-[#F0C5A9] focus:border-[#2A2A2A] focus:outline-none transition-colors placeholder-gray-400"
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                    </div>

                    {/* Поле темы */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <FileText size={20} />
                        <span>{t("contact.form.subject")}</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-white/50 border-b-2 border-[#D4C5F9] focus:border-[#2A2A2A] focus:outline-none transition-colors placeholder-gray-400"
                        placeholder={t("contact.form.subjectPlaceholder")}
                      />
                    </div>

                    {/* Поле сообщения */}
                    <div className="relative">
                      <label className="flex items-center space-x-2 font-caveat text-xl text-[#2A2A2A] mb-3">
                        <MessageCircle size={20} />
                        <span>{t("contact.form.message")} *</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 font-kalam text-lg text-[#2A2A2A] bg-white/50 border-2 border-[#E0E0E0] rounded-lg focus:border-[#A8D5BA] focus:outline-none transition-colors resize-none placeholder-gray-400"
                        placeholder={t("contact.form.messagePlaceholder")}
                      />
                    </div>

                    {/* Кнопка отправки */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={contactMutation.isPending}
                        className="w-full md:w-auto px-8 py-4 bg-[#2A2A2A] text-white font-kalam text-lg rounded-full hover:bg-[#4A4A4A] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {contactMutation.isPending ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                            {t("contact.form.sending")}
                          </>
                        ) : (
                          <>
                            <Send size={20} className="mr-3" />
                            {t("contact.form.sendButton")}
                          </>
                        )}
                      </button>
                    </div>

                    {/* Сообщение об ошибке */}
                    {contactMutation.isError && (
                      <div className="relative mt-4 p-4 text-center bg-red-50 rounded-lg border border-red-100">
                        <p className="font-kalam text-base text-red-600">
                          {contactMutation.error?.message ||
                            "Fehler beim Senden der Nachricht"}
                        </p>
                      </div>
                    )}
                  </form>
                </HandDrawnFrame>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-12 bg-[#F9F9F9] relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-caveat text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">
            {t('contact.faq.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(t('contact.faq.items') || []).map((item, index) => (
              <HandDrawnFrame
                key={index}
                color={index % 2 === 0 ? "#A8D5BA" : "#F0C5A9"}
                className="h-full"
              >
                <div className="bg-white/60 p-6 h-full">
                  <h3 className="font-kalam text-lg font-bold text-[#2A2A2A] mb-3 flex items-start">
                    <span className="text-[#D4C5F9] mr-2">Q:</span>
                    {item.q}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm leading-relaxed font-kalam">
                    {item.a}
                  </p>
                </div>
              </HandDrawnFrame>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
