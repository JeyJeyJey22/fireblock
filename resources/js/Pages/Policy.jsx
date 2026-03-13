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

export default function Policy({ page }) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans overflow-x-hidden selection:bg-fireblock-red selection:text-white flex flex-col">
            <Head title={`${page.title} | FIREBLOCK SOLUTION`} />

            <Header />

            <ContactModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} />

            <main className="pt-32 pb-24 flex-grow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FadeInText>
                        <h1 className="text-3xl md:text-5xl font-bold mb-12 border-b border-gray-800 pb-8">{page.title}</h1>
                    </FadeInText>

                    <FadeInText delay={0.2}>
                        {/* 
                            Контент из TinyMCE. 
                            Класс prose позволяет Tailwind автоматически красиво стилизовать базовые HTML теги (h1, p, ul, strong, etc.)
                        */}
                        <div
                            className="prose prose-invert prose-red max-w-none 
                                       prose-headings:font-bold prose-a:text-fireblock-red hover:prose-a:text-red-400
                                       prose-img:rounded-xl prose-img:shadow-lg"
                            dangerouslySetInnerHTML={{ __html: page.content }}
                        />
                    </FadeInText>
                </div>
            </main>

            <Footer />

            <CookieConsent />
        </div>
    );
}
