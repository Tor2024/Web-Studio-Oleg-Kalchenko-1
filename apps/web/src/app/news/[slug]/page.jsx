"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { useContentData } from "../../../utils/useContentData";
import FloatingShapes from "../../../components/FloatingShapes";
import HandDrawnFrame from "../../../components/HandDrawnFrame";

export default function NewsDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { currentLanguage, t } = useLanguage();
    const { items: newsItems, loading } = useContentData('news');
    const [newsItem, setNewsItem] = useState(null);

    useEffect(() => {
        if (newsItems.length > 0 && slug) {
            // Try to find by slug or folder_name
            const item = newsItems.find(i => i.slug === slug || i.folder_name === slug);
            setNewsItem(item);
        }
    }, [newsItems, slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
                <div className="font-kalam text-xl text-[#A8D5BA]">Loading...</div>
            </div>
        );
    }

    if (!newsItem && !loading && newsItems.length > 0) {
        return (
            <div className="min-h-screen bg-[#FEFEFE] flex flex-col items-center justify-center">
                <div className="font-kalam text-xl text-[#A8D5BA] mb-4">News item not found</div>
                <button
                    onClick={() => navigate('/news')}
                    className="px-6 py-2 bg-[#2A2A2A] text-white rounded-full font-kalam hover:bg-[#4A4A4A] transition-colors"
                >
                    Back to News
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FEFEFE]">
            <FloatingShapes />
            <Header />

            {newsItem && (
                <article className="py-16 px-6 md:px-12 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Back button */}
                        <button
                            onClick={() => navigate('/news')}
                            className="flex items-center text-[#5A5A5A] hover:text-[#2A2A2A] transition-colors mb-8 font-kalam group"
                        >
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            {t('news.backToNews') || 'Back to News'}
                        </button>

                        <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-sm border border-[#E0E0E0] relative">
                            {/* Decorative tape */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-[#F0C5A9]/50 rotate-1"></div>

                            {/* Title */}
                            <div className="relative mb-6 text-center">
                                <h1 className="font-caveat text-4xl md:text-6xl font-bold text-[#2A2A2A] mb-4">
                                    {newsItem.title?.[currentLanguage] || newsItem.title?.en}
                                </h1>
                                <svg className="w-2/3 h-4 mx-auto opacity-60" viewBox="0 0 200 10">
                                    <path d="M2,5 Q50,8 100,5 Q150,2 198,5" stroke="#A8D5BA" strokeWidth="2" fill="none" />
                                </svg>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center justify-center space-x-6 text-[#5A5A5A] mb-12">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={20} className="text-[#A8D5BA]" />
                                    <span className="font-kalam">{newsItem.date}</span>
                                </div>
                                {newsItem.author && (
                                    <div className="font-caveat text-xl text-[#D4C5F9]">
                                        by {newsItem.author}
                                    </div>
                                )}
                            </div>

                            {/* Cover Image */}
                            {newsItem.cover && (
                                <div className="relative mb-12 mx-auto max-w-3xl">
                                    <HandDrawnFrame color="#D4C5F9" className="p-2">
                                        <div className="aspect-video relative overflow-hidden rounded-lg">
                                            <img
                                                src={newsItem.cover}
                                                alt={newsItem.title?.[currentLanguage] || 'Cover'}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </HandDrawnFrame>
                                </div>
                            )}

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none font-kalam text-[#5A5A5A] leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: typeof newsItem.content === 'string'
                                        ? newsItem.content
                                        : newsItem.content?.[currentLanguage] || newsItem.content?.en || ''
                                }}
                            />
                        </div>
                    </div>
                </article>
            )}

            <Footer />
        </div>
    );
}
