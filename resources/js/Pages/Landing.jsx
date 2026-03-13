import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ContactForm from '@/Components/ContactForm';
import CookieConsent from '@/Components/CookieConsent';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

// Мы можем переиспользовать виджет из Дашборда, но пока сделаем упрощенную демо-версию прямо тут
// ИЛИ импортируем Dashboard если хотим прям его встроить, но лучше отдельную секцию "Демо дашборда"

/**
 * Вспомогательные компоненты анимации и UI
 */
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

const NumberCounter = ({ from = 0, to, duration = 2, suffix = '' }) => {
    // Упрощенный каунтер на framer-motion без сложных хуков
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-bold text-fireblock-red"
        >
            {to}{suffix}
        </motion.span>
    );
};

const CircularProgress = ({ value, label, delay = 0 }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="36" fill="transparent" stroke="#1f2937" strokeWidth="8" />
                    <motion.circle
                        cx="48" cy="48" r="36" fill="transparent" stroke="#e63946" strokeWidth="8"
                        strokeDasharray={226}
                        initial={{ strokeDashoffset: 226 }}
                        whileInView={{ strokeDashoffset: 226 - (226 * value) / 100 }}
                        transition={{ duration: 1.5, delay }}
                        viewport={{ once: true }}
                    />
                </svg>
                <div className="absolute font-bold text-xl">{value}%</div>
            </div>
            <div className="mt-4 text-sm text-gray-400 font-medium text-center">{label}</div>
        </div>
    );
};

export default function Landing() {
    const { settings } = usePage().props;

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden selection:bg-fireblock-red selection:text-white">
            <Head title="Официальный сайт | FIREBLOCK SOLUTION" />

            <Header />

            {/* 1. Hero Блок */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[90vh]">
                {/* Фоновые градиенты */}
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-fireblock-red rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 -right-64 w-96 h-96 bg-orange-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <FadeInText>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fireblock-red to-orange-500">FIREBLOCK SOLUTION</span>
                            <br />
                            Пожарная безопасность<br />вашего объекта в одном клике!
                        </h1>
                    </FadeInText>
                    <FadeInText delay={0.2}>
                        <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
                            Профессиональное программное обеспечение для оперативного мониторинга и контроля систем пожарной безопасности.
                        </p>
                    </FadeInText>
                    <FadeInText delay={0.4} className="mt-12 flex justify-center gap-4">
                        <Link href={route('about')} className="px-8 py-4 bg-fireblock-red text-white rounded-lg font-bold text-lg hover:bg-red-700 transition shadow-[0_0_30px_rgba(230,57,70,0.4)]">
                            Об ИТ-компании
                        </Link>
                        <a href="#demo" className="px-8 py-4 bg-gray-900 border border-gray-700 text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition">
                            Смотреть Дашборд
                        </a>
                    </FadeInText>
                </div>
            </section>

            {/* 2. Статистика и Проблематика */}
            <section id="solution" className="py-24 bg-black border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInText>
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Суровая реальность и штрафы</h2>
                    </FadeInText>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FadeInText delay={0.1} className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-center">
                            <div className="text-5xl text-fireblock-red mb-4">&gt;370 000</div>
                            <p className="text-gray-400 text-lg">пожаров в России ежегодно</p>
                        </FadeInText>
                        <FadeInText delay={0.2} className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-center">
                            <div className="text-5xl text-orange-500 mb-4">&gt;18 млрд ₽</div>
                            <p className="text-gray-400 text-lg">прямой материальный ущерб</p>
                        </FadeInText>
                        <FadeInText delay={0.3} className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fireblock-red/10"></div>
                            <div className="text-4xl text-white mb-4 relative z-10">От 300 тыс.<br />до 2 млн ₽</div>
                            <p className="text-gray-400 text-lg relative z-10">штрафы за нарушение ПБ</p>
                        </FadeInText>
                    </div>

                    {/* Наше решение и преимущества */}
                    <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <FadeInText>
                            <h3 className="text-3xl font-bold mb-6">Наше решение</h3>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed whitespace-pre-line">
                                {settings?.solution_text || 'Fireblock Solution — это инновационное программное обеспечение, объединяющее все системы мониторинга пожарной безопасности в единый удобный интерфейс. Мы исключаем человеческий фактор, оцифровываем журналы и предоставляем мгновенные уведомления о критических инцидентах.'}
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Снижение риска пожаров на 60%',
                                    'Экономия средств на штрафах и проверках',
                                    'Минимизация человеческого фактора',
                                    'Полная автоматизация документооборота'
                                ].map((adv, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fireblock-red/20 flex items-center justify-center text-fireblock-red">
                                            ✓
                                        </div>
                                        <span className="text-gray-300">{adv}</span>
                                    </div>
                                ))}
                            </div>
                        </FadeInText>
                        <FadeInText delay={0.2} className="relative">
                            <div className="aspect-square bg-gradient-to-tr from-gray-900 to-gray-800 rounded-3xl border border-gray-700 p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fireblock-red/10 via-transparent to-transparent"></div>
                                <img src={settings?.solution_image || "/images/mockup.png"} alt="Интерфейс ПО" className="relative z-10 rounded-lg shadow-2xl opacity-50" onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231f2937'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='%239ca3af'%3EИнтерфейс FIREBLOCK%3C/text%3E%3C/svg%3E"; }} />
                            </div>
                        </FadeInText>
                    </div>
                </div>
            </section>

            {/* 3. Возможности ПО & Целевая аудитория */}
            <section id="features" className="py-24 bg-black border-y border-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInText className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 rounded-full border border-gray-700 text-sm font-medium text-fireblock-red mb-6 uppercase tracking-wider">
                            Функционал платформы
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Возможности ПО FIREBLOCK</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Единая экосистема для полного контроля над всеми аспектами пожарной безопасности. Подходит для различных типов пользователей.
                        </p>
                    </FadeInText>

                    {/* Сетка функционала */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                        {[
                            { title: 'Мониторинг систем ПБ', desc: 'Сбор данных в реальном времени с датчиков и панелей', icon: '📡' },
                            { title: 'Прогнозная аналитика', desc: 'AI-прогнозирование вероятности отказов оборудования', icon: '🧠' },
                            { title: 'Автозаполнение журналов', desc: 'Генерация отчетов и журналов по ГОСТ в один клик', icon: '📝' },
                            { title: 'Онлайн-оценка риска', desc: 'Автоматический расчет пожарного риска объекта', icon: '📊' },
                            { title: 'Удаленный доступ 24/7', desc: 'Контроль с любого устройства из любой точки мира', icon: '📱' },
                            { title: 'Мгновенные алерты', desc: 'Уведомления в Telegram, SMS и по email', icon: '⚡' },
                        ].map((feature, idx) => (
                            <FadeInText key={idx} delay={idx * 0.1} className="h-full">
                                <div className="h-full p-8 bg-gray-900/40 border border-gray-800 rounded-2xl hover:bg-gray-800 transition-colors group flex flex-col">
                                    <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{feature.icon}</div>
                                    <h4 className="text-xl font-bold mb-3 text-white">{feature.title}</h4>
                                    <p className="text-gray-400 flex-grow">{feature.desc}</p>
                                </div>
                            </FadeInText>
                        ))}
                    </div>

                    {/* Целевая аудитория (Простые табы) */}
                    <FadeInText delay={0.2} className="bg-gray-900 border border-gray-800 rounded-3xl p-8 lg:p-12">
                        <h3 className="text-2xl font-bold mb-8 text-center">Кому необходимо наше решение?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { role: 'Собственник', desc: 'Снижение рисков потери имущества и штрафов. Контроль расходов на ПБ.' },
                                { role: 'Ответственные за ПБ', desc: 'Автоматизация рутины, готовые журналы, контроль подрядчиков.' },
                                { role: 'Обслуживающие орг.', desc: 'Удобный мониторинг всех объектов, прозрачная отчетность для заказчика.' },
                                { role: 'МЧС России', desc: 'Достоверная статистика, удаленный контроль исправности систем.' },
                            ].map((aud, i) => (
                                <div key={i} className="bg-black/50 border border-gray-800 p-6 rounded-xl hover:border-fireblock-red/50 transition duration-300">
                                    <div className="text-fireblock-red font-bold text-lg mb-3">{aud.role}</div>
                                    <div className="text-gray-400 text-sm">{aud.desc}</div>
                                </div>
                            ))}
                        </div>
                    </FadeInText>
                </div>
            </section>

            {/* 4. Интерактивный Дашборд (Демонстрация) */}
            <section id="demo" className="py-24 bg-dark-bg relative overflow-hidden">
                {/* Декорация */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-fireblock-red/5 to-transparent skew-x-12"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FadeInText className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Панель управления <span className="text-fireblock-red">FIREBLOCK</span></h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Оцените удобство и наглядность нашего интерфейса.
                        </p>
                    </FadeInText>

                    {/* Демо-Дашборд внутри контейнера стилизованного под браузер */}
                    <FadeInText delay={0.3}>
                        <div className="bg-[#1C1F26] rounded-t-xl border border-gray-800 p-4 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="mx-auto bg-black border border-gray-800 rounded-md px-32 py-1 text-xs text-gray-500 font-mono">dashboard.fireblock.ru</div>
                        </div>
                        <div className="bg-black border-x border-b border-gray-800 rounded-b-xl p-8 shadow-2xl overflow-x-auto">

                            <div className="min-w-[800px]">
                                <h3 className="text-2xl font-bold mb-8 uppercase tracking-wide">
                                    <span className="text-fireblock-red">Сводная</span> статистика
                                </h3>

                                <div className="grid grid-cols-3 gap-6 mb-12">
                                    <CircularProgress value={97} label="Установленные СППЗ" delay={0.1} />
                                    <CircularProgress value={87} label="Проверки МЧС" delay={0.3} />
                                    <CircularProgress value={96} label="Общая безопасность" delay={0.5} />
                                </div>

                                <div className="w-full bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-black/50 border-b border-gray-800">
                                                <th className="p-4 text-sm font-semibold text-gray-300">Объект</th>
                                                <th className="p-4 text-sm font-semibold text-gray-300">Состояние (%)</th>
                                                <th className="p-4 text-sm font-semibold text-gray-300">Адрес</th>
                                                <th className="p-4 text-sm font-semibold text-gray-300">Ответственный</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { id: 1, name: 'ГБУ «Жилищник»', progress: 98.2, address: 'ул. Беговая, д.4', responsible: 'Королев М.В.' },
                                                { id: 2, name: 'ТЦ "Галерея"', progress: 66.0, address: 'пр-т Ленина, д.15', responsible: 'Иванов А.С.' },
                                                { id: 3, name: 'Складской комплекс', progress: 85.5, address: 'Промзона СЗАО', responsible: 'Смирнов В.П.' }
                                            ].map((obj, i) => (
                                                <motion.tr
                                                    key={obj.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                                    className="border-b border-gray-800/50"
                                                >
                                                    <td className="p-4 text-white font-medium">{obj.name}</td>
                                                    <td className="p-4 w-1/4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: 0 }}
                                                                    whileInView={{ width: `${obj.progress}%` }}
                                                                    viewport={{ once: true }}
                                                                    transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                                                                    className={`h-full rounded-full ${obj.progress > 90 ? 'bg-green-500' : obj.progress > 70 ? 'bg-yellow-500' : 'bg-fireblock-red'}`}
                                                                />
                                                            </div>
                                                            <span className="text-xs text-gray-400 font-mono">{obj.progress}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-sm text-gray-400">{obj.address}</td>
                                                    <td className="p-4 text-sm text-gray-400">{obj.responsible}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </FadeInText>

                    <FadeInText delay={0.5} className="text-center mt-10">
                        <Link
                            href="/demo"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-fireblock-red text-white rounded-lg font-bold text-lg hover:bg-red-700 transition shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:shadow-[0_0_30px_rgba(230,57,70,0.6)]"
                        >
                            Посмотреть демо
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </FadeInText>
                </div>
            </section>

            {/* 5. Контакты и Форма обратной связи */}
            <section id="contact" className="py-24 bg-dark-bg relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInText className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Оставьте заявку, и наши специалисты свяжутся с вами для расчёта стоимости или бесплатной консультации.
                        </p>
                    </FadeInText>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                        {/* Левая часть: Контакты и Карта */}
                        <FadeInText delay={0.1} className="flex flex-col space-y-8">
                            <div className="space-y-6">
                                {settings?.contact_address && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 text-fireblock-red">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-1">Офис</h4>
                                            <p className="text-gray-400">{settings.contact_address}</p>
                                        </div>
                                    </div>
                                )}

                                {settings?.contact_phone && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 text-fireblock-red">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-1">Телефон</h4>
                                            <a href={`tel:${settings.contact_phone.replace(/[\s()-]/g, '')}`} className="text-gray-400 hover:text-fireblock-red transition">{settings.contact_phone}</a>
                                        </div>
                                    </div>
                                )}

                                {settings?.contact_email && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 text-fireblock-red">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                                            <a href={`mailto:${settings.contact_email}`} className="text-gray-400 hover:text-fireblock-red transition">{settings.contact_email}</a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Блок с картой Яндекса */}
                            {settings?.contact_map_iframe && (
                                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl h-80"
                                    dangerouslySetInnerHTML={{ __html: settings.contact_map_iframe }}>
                                </div>
                            )}
                        </FadeInText>

                        {/* Правая часть: Форма */}
                        <FadeInText delay={0.3} className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Написать нам</h3>
                            <ContactForm />
                        </FadeInText>
                    </div>
                </div>
            </section>

            {/* 4. Footer & Контакты */}
            <Footer />

            <CookieConsent />
        </div>
    );
}
