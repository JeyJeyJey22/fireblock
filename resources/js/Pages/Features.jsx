import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CookieConsent from '@/Components/CookieConsent';

const FadeInText = ({ children, delay = 0, className = '' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function Features() {
    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden selection:bg-fireblock-red selection:text-white">
            <Head title="Возможности ПО | FIREBLOCK SOLUTION" />

            <Header />

            {/* Заголовок страницы */}
            <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden border-b border-gray-900">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-fireblock-red rounded-full mix-blend-screen filter blur-[128px] opacity-10"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <FadeInText>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Возможности <span className="text-fireblock-red">FIREBLOCK</span>
                        </h1>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto font-light">
                            Полная автоматизация контроля систем пожарной безопасности, мгновенные уведомления и электронный документооборот — всё в одном интерфейсе.
                        </p>
                    </FadeInText>
                </div>
            </section>

            {/* Детальный обзор функционала */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    
                    {/* Блок 1: Мониторинг */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeInText className="order-2 md:order-1">
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                📡
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Единая система мониторинга</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Fireblock собирает данные с тысяч датчиков, пожарных панелей и систем дымоудаления в реальном времени. Все объекты выводятся на единую интерактивную карту или дашборд. 
                            </p>
                            <ul className="space-y-3">
                                {['Круглосуточный контроль исправности', 'Поддержка большинства производителей АПС', 'Моментальное отображение статуса объектов (ОК / Тревога / Внимание)'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fireblock-red/20 flex items-center justify-center text-fireblock-red mt-0.5 mt-1 border border-fireblock-red/30">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeInText>
                        <FadeInText delay={0.2} className="order-1 md:order-2">
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-video shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black/50 z-10 pointer-events-none"></div>
                                <div className="text-gray-600 font-mono text-sm">[ Иллюстрация: Карта объектов с цветными статусами ]</div>
                            </div>
                        </FadeInText>
                    </div>

                    {/* Блок 2: Уведомления */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeInText delay={0.2} className="relative">
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-video shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-fireblock-red/10 to-black/50 z-10 pointer-events-none"></div>
                                <div className="text-gray-600 font-mono text-sm">[ Иллюстрация: Окно Telegram бота с алертом ]</div>
                            </div>
                        </FadeInText>
                        <FadeInText>
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_15px_rgba(230,57,70,0.1)] border border-fireblock-red/20">
                                ⚡
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Многоканальные уведомления (Алерты)</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Система мгновенно информирует ответственных лиц при возникновении нештатных ситуаций. Вы сами настраиваете, кому и какие сигналы отправлять.
                            </p>
                            <ul className="space-y-3">
                                {['Email-рассылка для руководителей', 'Telegram-бот для инженеров', 'Push-уведомления в мобильном приложении', 'Гибкая маршрутизация тревог'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fireblock-red/20 flex items-center justify-center text-fireblock-red mt-0.5 mt-1 border border-fireblock-red/30">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeInText>
                    </div>

                    {/* Блок 3: Документооборот */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <FadeInText className="order-2 md:order-1">
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                📝
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Автоматизация журналов по ГОСТ</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Забудьте о бумажном документообороте. Fireblock автоматически заполняет электронные журналы эксплуатации систем противопожарной защиты на основе логов оборудования.
                            </p>
                            <ul className="space-y-3">
                                {['Соответствие требованиям МЧС России', 'Генерация отчетов за любой период', 'Электронная подпись ответственного лица', 'Хранение логов в неизменяемом виде'].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fireblock-red/20 flex items-center justify-center text-fireblock-red mt-0.5 mt-1 border border-fireblock-red/30">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </FadeInText>
                        <FadeInText delay={0.2} className="order-1 md:order-2 relative">
                            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-video shadow-2xl flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-black/50 z-10 pointer-events-none"></div>
                                <div className="text-gray-600 font-mono text-sm">[ Иллюстрация: Сгенерированный Акт ТО ]</div>
                            </div>
                        </FadeInText>
                    </div>

                </div>
            </section>

            {/* Призыв к действию */}
            <section className="py-24 bg-dark-bg border-t border-gray-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <FadeInText>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">Готовы оцифровать пожарную безопасность?</h2>
                        <a href={route('home') + '#contact'} className="inline-block px-10 py-5 bg-fireblock-red text-white rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-[0_0_30px_rgba(230,57,70,0.4)]">
                            Запросить индивидуальный расчет
                        </a>
                    </FadeInText>
                </div>
            </section>

            <Footer />
            <CookieConsent />
        </div>
    );
}
