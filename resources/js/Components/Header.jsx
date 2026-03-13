import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ContactModal from '@/Components/ContactModal';

export default function Header() {
    const { settings } = usePage().props;
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <nav className="fixed w-full z-50 top-0 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            {/* Логотип */}
                            <Link href={route('home')} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-fireblock-red rounded-lg flex items-center justify-center font-bold text-lg text-white">FB</div>
                                <span className="font-bold text-xl tracking-wider uppercase text-white">Fireblock</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300 items-center">
                            <Link href={route('home') + '#solution'} className="hover:text-fireblock-red transition">Решение</Link>
                            <Link href={route('features')} className="hover:text-fireblock-red transition">Возможности</Link>
                            <Link href={route('demo')} className="hover:text-fireblock-red transition">Дашборд</Link>
                            <Link href={route('pricing')} className="hover:text-fireblock-red transition">Стоимость</Link>
                            <Link href={route('about')} className="hover:text-fireblock-red transition">О компании</Link>
                        </div>
                        <div className="flex items-center gap-6">
                            {settings?.contact_phone && (
                                <a href={`tel:${settings.contact_phone.replace(/[\s()-]/g, '')}`} className="hidden lg:block font-bold text-fireblock-red hover:text-white transition">
                                    {settings.contact_phone}
                                </a>
                            )}
                            <button
                                onClick={() => setIsContactModalOpen(true)}
                                className="px-5 py-2.5 bg-fireblock-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition"
                            >
                                Обратная связь
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <ContactModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} />
        </>
    );
}
