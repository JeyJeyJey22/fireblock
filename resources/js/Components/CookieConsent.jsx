import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function CookieConsent() {
    const { settings } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pb-6 md:pb-8 pointer-events-none flex justify-center"
                >
                    <div className="bg-gray-900 border border-gray-700/50 shadow-2xl rounded-2xl p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row gap-6 items-center pointer-events-auto backdrop-blur-md">
                        <div className="flex-1 text-gray-300 text-sm md:text-base leading-relaxed">
                            <p className="mb-2 whitespace-pre-line">
                                {settings?.cookie_text || 'Продолжая использовать сайт, вы соглашаетесь на обработку файлов cookie и сведений о вас (IP-адрес, действия на сайте) с помощью метрических программ «Яндекс.Метрика». Это нужно для работы сайта и сбора статистики.'}
                            </p>
                            <p className="text-gray-400 text-xs">
                                Отказаться от обработки можно в настройках браузера.
                            </p>
                        </div>
                        <div className="w-full md:w-auto flex-shrink-0">
                            <button
                                onClick={acceptCookies}
                                className="w-full md:w-auto px-8 py-3 bg-fireblock-red text-white font-bold rounded-xl hover:bg-red-700 transition shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_30px_rgba(230,57,70,0.5)]"
                            >
                                Понятно
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
