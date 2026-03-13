import React, { useState } from 'react';
import ContactModal from '@/Components/ContactModal';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Аккордеон-блок для юридической информации
const AccordionItem = ({ title, children, isOpen, onClick, index }) => (
    <div className="border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-5 text-left bg-gray-900/50 hover:bg-gray-900 transition-colors"
        >
            <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-fireblock-red/10 border border-fireblock-red/30 flex items-center justify-center text-fireblock-red text-sm font-bold">{index}</span>
                <span className="text-white font-semibold">{title}</span>
            </span>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                >
                    <div className="px-5 pb-5 pt-3 text-gray-400 text-sm leading-relaxed">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

export default function About({ licenses }) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(0);

    const team = [
        { name: 'Генеральный директор', role: 'Стратегия и развитие', icon: '👨‍💼', color: 'from-red-500/20 to-red-900/10' },
        { name: 'Технический директор', role: 'Архитектура и разработка', icon: '👨‍💻', color: 'from-blue-500/20 to-blue-900/10' },
        { name: 'Руководитель проектов', role: 'Внедрение и сопровождение', icon: '📋', color: 'from-purple-500/20 to-purple-900/10' },
        { name: 'Инженер-проектировщик', role: 'Системы пожарной автоматики', icon: '🔧', color: 'from-orange-500/20 to-orange-900/10' },
        { name: 'Ведущий разработчик', role: 'Backend & DevOps', icon: '⚙️', color: 'from-green-500/20 to-green-900/10' },
        { name: 'Frontend-разработчик', role: 'UI/UX и интерфейсы', icon: '🎨', color: 'from-cyan-500/20 to-cyan-900/10' },
    ];

    const legalItems = [
        {
            title: "Реквизиты организации",
            content: (
                <div className="space-y-1.5">
                    <p><strong className="text-gray-300">Полное наименование:</strong> ООО «Каска-Строй»</p>
                    <p><strong className="text-gray-300">ИНН:</strong> 9718076242 &nbsp;/&nbsp; <strong className="text-gray-300">КПП:</strong> 773401001</p>
                    <p><strong className="text-gray-300">ОГРН:</strong> 1177746960005</p>
                    <p><strong className="text-gray-300">ОКВЭД:</strong> 62.01 — Разработка компьютерного ПО</p>
                </div>
            )
        },
        {
            title: "Сведения о продуктах",
            content: (
                <div>
                    <p><strong className="text-gray-300">ПО:</strong> FIREBLOCK SOLUTION — программный комплекс для оперативного мониторинга систем пожарной автоматики и электронной отчётности.</p>
                </div>
            )
        },
        {
            title: "IT-аккредитация и деятельность",
            content: (
                <div>
                    <p className="mb-2">Коды видов деятельности по Приказу Минцифры РФ № 449:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Проектирование, разработка, модификация, тестирование программ для ЭВМ и баз данных</li>
                        <li>Реализация программ для ЭВМ, баз данных, прав использования</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Тарифообразование",
            content: (
                <p>Стоимость рассчитывается индивидуально на основании количества объектов, объёмов данных и комплекса пусконаладочных работ.</p>
            )
        },
        {
            title: "Исключительные права и стек технологий",
            content: (
                <div>
                    <p>ООО «Каска-Строй» обладает интеллектуальными правами на ПО. Может быть включено в Единый реестр российских программ.</p>
                    <p className="mt-2"><strong className="text-gray-300">Стек:</strong> PHP (Laravel), JavaScript (React.js), PostgreSQL, Node.js</p>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden selection:bg-fireblock-red selection:text-white flex flex-col">
            <Head title="О компании | FIREBLOCK SOLUTION" />

            <Header />

            <ContactModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} />

            <main className="flex-grow pt-36 pb-24">

                {/* Hero секция */}
                <section className="mb-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-fireblock-red/5 via-transparent to-transparent"></div>
                    <div className="absolute top-20 right-0 w-96 h-96 bg-fireblock-red/5 rounded-full blur-3xl"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <FadeInText>
                            <div className="max-w-3xl">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-fireblock-red/30 bg-fireblock-red/5 text-sm font-medium text-fireblock-red mb-6 uppercase tracking-wider">
                                    О компании
                                </div>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                                    Разрабатываем <span className="text-fireblock-red">цифровые решения</span> для пожарной безопасности
                                </h1>
                                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                                    ООО «Каска-Строй» — аккредитованная ИТ-компания, специализирующаяся на создании программного обеспечения для мониторинга и обслуживания систем противопожарной защиты.
                                </p>
                            </div>
                        </FadeInText>

                        {/* Статистика */}
                        <FadeInText delay={0.3}>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                                {[
                                    { value: '5+', label: 'Лет на рынке' },
                                    { value: '500+', label: 'Объектов защиты' },
                                    { value: '24/7', label: 'Мониторинг' },
                                    { value: '99.9%', label: 'Uptime системы' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        className="text-center p-6 bg-gray-900/50 border border-gray-800 rounded-2xl"
                                    >
                                        <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeInText>
                    </div>
                </section>

                {/* Команда */}
                <section className="mb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInText className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Наша <span className="text-fireblock-red">команда</span></h2>
                            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                                Опытные специалисты, объединённые общей целью — сделать пожарную безопасность прозрачной и управляемой.
                            </p>
                        </FadeInText>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {team.map((member, i) => (
                                <FadeInText key={i} delay={i * 0.08}>
                                    <div className="relative group">
                                        <div className={`bg-gradient-to-br ${member.color} border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1`}>
                                            <div className="text-4xl mb-4">{member.icon}</div>
                                            <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                                            <p className="text-gray-400 text-sm">{member.role}</p>
                                        </div>
                                    </div>
                                </FadeInText>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Юридическая информация (компактный аккордеон) */}
                <section className="mb-24">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInText className="mb-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold">Юридическая информация</h2>
                            </div>
                            <p className="text-gray-500 text-sm ml-11">
                                Приказ Минцифры России от 11.05.2023 г. № 449
                            </p>
                        </FadeInText>

                        <div className="space-y-3">
                            {legalItems.map((item, idx) => (
                                <FadeInText key={idx} delay={idx * 0.05}>
                                    <AccordionItem
                                        title={item.title}
                                        isOpen={openAccordion === idx}
                                        onClick={() => setOpenAccordion(openAccordion === idx ? -1 : idx)}
                                        index={idx + 1}
                                    >
                                        {item.content}
                                    </AccordionItem>
                                </FadeInText>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Лицензии */}
                <section>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeInText className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Лицензии и сертификаты</h2>
                            <p className="text-gray-400 max-w-xl mx-auto">Подтверждённая квалификация и соответствие стандартам</p>
                        </FadeInText>

                        {licenses && licenses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {licenses.map((license, idx) => (
                                    <FadeInText key={license.id} delay={idx * 0.08}>
                                        <a href={license.image_path} target="_blank" rel="noopener noreferrer" className="block bg-gray-900/50 border border-gray-800 rounded-2xl p-5 hover:border-fireblock-red/50 transition-all duration-300 group hover:-translate-y-1">
                                            <div className="h-56 mb-4 flex items-center justify-center bg-black/30 overflow-hidden rounded-xl">
                                                <img src={license.image_path} alt={license.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                                            </div>
                                            <h3 className="text-center text-sm font-medium text-gray-400 group-hover:text-white transition">{license.title}</h3>
                                        </a>
                                    </FadeInText>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">В данный момент лицензии на сайте не представлены.</p>
                        )}
                    </div>
                </section>

            </main>

            <Footer />

            <CookieConsent />
        </div>
    );
}
