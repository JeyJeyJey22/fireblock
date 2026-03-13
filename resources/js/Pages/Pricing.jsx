import React, { useState } from 'react';
import ContactModal from '@/Components/ContactModal';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import CookieConsent from '@/Components/CookieConsent';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const FadeInText = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function Pricing({ tariffs }) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden selection:bg-fireblock-red selection:text-white flex flex-col">
            <Head title="Стоимость | FIREBLOCK SOLUTION" />

            <Header />

            <ContactModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} />

            <main className="pt-32 pb-24 flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInText className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-700 text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">
                            Тарифы
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Стоимость внедрения</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Выберите подходящий тарифный план для вашего объекта. Мы предлагаем гибкие условия и индивидуальный подход к каждому клиенту.
                        </p>
                    </FadeInText>

                    {tariffs && tariffs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {tariffs.map((tariff, idx) => (
                                <FadeInText key={tariff.id} delay={idx * 0.1} className="flex h-full">
                                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-fireblock-red/50 transition-all flex flex-col w-full relative overflow-hidden group">

                                        {/* Декоративный эффект при наведении */}
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fireblock-red to-red-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <h3 className="text-2xl font-bold mb-2 text-white">{tariff.title}</h3>
                                        <div className="text-fireblock-red font-bold text-3xl mb-8">
                                            {tariff.price || 'Индивидуально'}
                                        </div>

                                        {/* HTML Описание */}
                                        <div
                                            className="prose prose-sm prose-invert prose-red max-w-none mb-8 flex-grow
                                                       prose-p:text-gray-400 prose-ul:text-gray-400 prose-li:my-1"
                                            dangerouslySetInnerHTML={{ __html: tariff.content }}
                                        />

                                        <button
                                            onClick={() => setIsContactModalOpen(true)}
                                            className="w-full py-3 px-4 bg-gray-800 hover:bg-fireblock-red text-white font-medium rounded-lg transition-colors mt-auto"
                                        >
                                            Запросить расчет
                                        </button>
                                    </div>
                                </FadeInText>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-12">
                            Тарифы находятся в стадии формирования. Оставьте заявку, и мы вышлем вам индивидуальное коммерческое предложение.
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            <CookieConsent />
        </div>
    );
}
