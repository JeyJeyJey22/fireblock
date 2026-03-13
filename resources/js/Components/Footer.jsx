import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { settings } = usePage().props;

    return (
        <footer className="bg-black py-16 border-t border-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-fireblock-red rounded-lg flex items-center justify-center font-bold text-sm text-white">FB</div>
                            <span className="font-bold text-lg tracking-wider uppercase text-white">Fireblock Solution</span>
                        </div>
                        <p className="text-gray-400 max-w-sm mb-6">
                            Инновационная платформа мониторинга пожарной безопасности объектов любого уровня сложности.
                        </p>
                        <p className="text-sm text-gray-600">
                            © 2026 ООО «Каска-Строй». Все права защищены.<br />
                            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 transition mt-2 inline-block">Политика конфиденциальности</Link>
                        </p>
                    </div>
                    <div className="md:text-right">
                        <h4 className="text-xl font-bold mb-6 text-white">Реквизиты</h4>
                        <div className="space-y-2 text-gray-400 text-sm">
                            <p>Общество с ограниченной ответственностью «Каска-Строй»<br />(ООО «Каска-Строй»)</p>
                            <p>ИНН: 9718076242 / КПП: 773401001</p>
                            <p>ОГРН: 1177746960005</p>
                            <p>Основной ОКВЭД 62.01</p>
                            <p className="max-w-xs md:ml-auto">Коды видов деятельности в области информационных технологий 1.01, 1.04, 1.05, 2.01</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
