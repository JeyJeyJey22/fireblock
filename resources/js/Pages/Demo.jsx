import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CookieConsent from '@/Components/CookieConsent';

// Компонент круговой диаграммы
const CircularProgress = ({ value, label, delay = 0 }) => {
    const circumference = 2 * Math.PI * 40; // radius = 40

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-black border border-gray-800 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-fireblock-red/5 rounded-full filter blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative w-32 h-32">
                {/* Background circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                    {/* Animated foreground circle */}
                    <motion.circle
                        cx="64" cy="64" r="40"
                        stroke="currentColor" strokeWidth="8" fill="transparent"
                        className="text-fireblock-red"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (value / 100) * circumference }}
                        transition={{ duration: 1.5, delay, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: delay + 0.5 }}
                        className="text-2xl font-bold text-white">
                        {value}%
                    </motion.span>
                </div>
            </div>
            <p className="mt-4 text-sm font-medium text-gray-400 text-center">{label}</p>
        </div>
    );
};

// Компонент таблицы объектов
const ObjectsTable = ({ objects }) => {
    return (
        <div className="w-full mt-8 overflow-hidden bg-black border border-gray-800 rounded-xl shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-900 border-b border-gray-800">
                            <th className="p-4 text-sm font-semibold text-gray-400">Объект</th>
                            <th className="p-4 text-sm font-semibold text-gray-400">Состояние (%)</th>
                            <th className="p-4 text-sm font-semibold text-gray-400">Адрес</th>
                            <th className="p-4 text-sm font-semibold text-gray-400">Ответственный</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objects.map((obj, i) => (
                            <motion.tr
                                key={obj.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                            >
                                <td className="p-4 text-gray-200 font-medium">{obj.name}</td>
                                <td className="p-4 w-1/4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${obj.progress}%` }}
                                                transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                                                className={`h-full rounded-full flex relative shadow-[0_0_10px_rgba(230,57,70,0.5)] ${obj.progress > 90 ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : obj.progress > 70 ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-fireblock-red'}`}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-400 font-mono w-8">{obj.progress}%</span>
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
    );
};

// Компонент списка событий
const EventsList = ({ events }) => {
    return (
        <div className="w-full bg-black border border-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Журнал событий</h3>
                <span className="text-sm text-gray-500">За последние 24 часа</span>
            </div>
            <ul className="divide-y divide-gray-800">
                {events.map((event, i) => (
                    <motion.li
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-4 hover:bg-gray-900/50 transition-colors flex items-start gap-4"
                    >
                        <div className={`p-2 rounded-lg flex-shrink-0 ${event.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : event.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                            {event.type === 'error' ? '🔥' : event.type === 'warning' ? '⚠️' : '✅'}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-300 text-sm">{event.title}</h4>
                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{event.description}</p>
                        </div>
                        <div className="text-xs text-gray-400 font-mono flex-shrink-0">
                            {event.time}
                        </div>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

// Компонент карточек аналитики
const AnalyticsCards = () => {
    const stats = [
        { label: 'Uptime системы', value: '99.99%', trend: '+0.01%', positive: true },
        { label: 'Обработано логов', value: '1.2M', trend: '+15k/ч', positive: true },
        { label: 'Ошибок связи', value: '24', trend: '-5%', positive: false },
        { label: 'Критичных инцидентов', value: '0', trend: '0', positive: true },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="p-6 bg-black border border-gray-800 rounded-xl shadow-lg flex flex-col justify-between relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-fireblock-red/5 rounded-full filter blur-xl transform translate-x-1/2 -translate-y-1/2 transition-opacity group-hover:bg-fireblock-red/10"></div>
                    <p className="text-sm font-medium text-gray-500 mb-2 relative z-10">{stat.label}</p>
                    <div className="flex items-end justify-between relative z-10">
                        <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                        <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${stat.positive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                            {stat.trend}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// Компонент Интерактивной карты
const InteractiveMap = () => {
    const [showAlarm, setShowAlarm] = useState(true);

    // Демонстрационные точки (объекты)
    const points = [
        { id: 1, x: 20, y: 30, status: 'ok', name: 'ГБУ «Жилищник»' },
        { id: 2, x: 75, y: 25, status: 'warning', name: 'ТЦ "Галерея"' },
        { id: 3, x: 50, y: 60, status: 'ok', name: 'Офис ЦАО' },
        { id: 4, x: 80, y: 80, status: 'error', name: 'Складской комплекс' },
        { id: 5, x: 30, y: 70, status: 'ok', name: 'Школа №12' },
    ];

    return (
        <div className="w-full h-96 bg-black border border-gray-800 rounded-xl shadow-lg relative overflow-hidden flex items-center justify-center">
            {/* Сетка - имитация радара */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Круги радара */}
            <div className="absolute w-[600px] h-[600px] border border-gray-700/30 rounded-full"></div>
            <div className="absolute w-[400px] h-[400px] border border-gray-700/30 rounded-full"></div>
            <div className="absolute w-[200px] h-[200px] border border-gray-700/30 rounded-full"></div>

            {/* Вращающаяся линия радара */}
            <motion.div
                className="absolute w-[300px] h-1 bg-gradient-to-r from-fireblock-red/50 to-transparent transform-origin-left"
                style={{ left: '50%', top: '50%', transformOrigin: 'left center' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Точки объектов */}
            {points.map((point, index) => (
                <motion.div
                    key={point.id}
                    className="absolute group z-10"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                >
                    {/* Пульсирующий эффект */}
                    <motion.div
                        className={`absolute -inset-2 rounded-full ${point.status === 'error' ? 'bg-red-500' :
                            point.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />

                    {/* Сама точка */}
                    <div className={`w-3 h-3 rounded-full relative z-10 shadow-lg ${point.status === 'error' ? 'bg-red-500 shadow-red-500/50' :
                        point.status === 'warning' ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-green-500 shadow-green-500/50'
                        }`}></div>

                    {/* Тултип при наведении */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                        <span className="font-bold">{point.name}</span>
                        <div className={`mt-1 text-[10px] uppercase font-mono tracking-wider ${point.status === 'error' ? 'text-red-400' :
                            point.status === 'warning' ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                            {point.status === 'error' ? 'ТРЕВОГА' : point.status === 'warning' ? 'ВНИМАНИЕ' : 'В НОРМЕ'}
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Всплывающее уведомление о тревоге */}
            <AnimatePresence>
                {showAlarm && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
                        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
                        className="absolute bottom-6 right-6 bg-gray-900 border-l-4 border-red-500 rounded-r shadow-2xl p-4 max-w-sm z-30"
                    >
                        <button
                            onClick={() => setShowAlarm(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex items-start gap-3 mt-1">
                            <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 animate-[pulse_1s_ease-in-out_infinite]">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-red-500 font-bold mb-1 uppercase tracking-wider text-sm">Пожарная тревога</h4>
                                <p className="text-gray-300 text-sm mb-2 leading-relaxed">Сигнал «ПОЖАР» на объекте <span className="font-semibold text-white">«Складской комплекс»</span>. Шлейф №4.</p>
                                <button className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded transition-colors font-medium border border-red-500/30">
                                    Подробнее об инциденте
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Компонент Настройки ролевого доступа
const RoleAccessControl = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Панель ролей */}
            <div className="lg:col-span-1 space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Управление ролями</h3>

                <div className="bg-gray-900 border border-fireblock-red/50 rounded-xl p-4 cursor-pointer relative overflow-hidden group">
                    <div className="absolute inset-0 bg-fireblock-red/10 group-hover:bg-fireblock-red/20 transition-colors"></div>
                    <div className="relative z-10 flex justify-between items-center">
                        <div>
                            <div className="text-white font-bold">Администратор (ЦУС)</div>
                            <div className="text-xs text-gray-400 mt-1">Полный доступ к системе</div>
                        </div>
                        <div className="text-fireblock-red text-xl">🛡️</div>
                    </div>
                </div>

                <div className="bg-black border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-gray-300 font-bold">Диспетчер-оператор</div>
                            <div className="text-xs text-gray-500 mt-1">Только мониторинг и алерты</div>
                        </div>
                        <div className="text-gray-600 text-xl">👁️</div>
                    </div>
                </div>

                <div className="bg-black border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-gray-300 font-bold">Инженер (ТО)</div>
                            <div className="text-xs text-gray-500 mt-1">Журналы ТО, статусы приборов</div>
                        </div>
                        <div className="text-gray-600 text-xl">🔧</div>
                    </div>
                </div>

                <div className="bg-black border border-gray-800 hover:border-gray-700 rounded-xl p-4 cursor-pointer transition-colors">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-gray-300 font-bold">Заказчик (Владелец)</div>
                            <div className="text-xs text-gray-500 mt-1">Сводная аналитика и PDF</div>
                        </div>
                        <div className="text-gray-600 text-xl">💼</div>
                    </div>
                </div>
            </div>

            {/* Панель разрешений */}
            <div className="lg:col-span-2 bg-black border border-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">Разрешения: <span className="text-fireblock-red">Администратор (ЦУС)</span></h3>
                        <p className="text-sm text-gray-400 mt-1">Настройте права доступа к модулям платформы</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { name: 'Гео-радар и картография', enabled: true },
                        { name: 'Мониторинг событий в реальном времени', enabled: true },
                        { name: 'Редактирование топологии объектов', enabled: true },
                        { name: 'Управление пользователями и ролями', enabled: true },
                        { name: 'Генерация журналов МЧС', enabled: true },
                        { name: 'Доступ к биллингу', enabled: false },
                    ].map((permission, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors"
                        >
                            <span className="text-gray-300 font-medium">{permission.name}</span>

                            {/* Toggle Switch */}
                            <div className={`w-12 h-6 rounded-full relative cursor-pointer border ${permission.enabled ? 'bg-fireblock-red/20 border-fireblock-red/50' : 'bg-gray-800 border-gray-700'}`}>
                                <motion.div
                                    className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md ${permission.enabled ? 'bg-fireblock-red' : 'bg-gray-500'}`}
                                    initial={false}
                                    animate={{ left: permission.enabled ? 'calc(100% - 22px)' : '2px' }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end gap-4">
                    <button className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">Отменить</button>
                    <button className="px-4 py-2 text-sm bg-fireblock-red hover:bg-fireblock-red/90 text-white font-bold rounded shadow-[0_0_15px_rgba(230,57,70,0.4)] transition-all">Сохранить изменения</button>
                </div>
            </div>
        </div>
    );
};

// Компонент Автозаполнения журналов
const AutomatedJournals = () => {
    // Имитация процесса печати массива логов
    const lines = [
        "2023-11-20 08:00:01 [SYSTEM] Инициализация генератора отчетов...",
        "2023-11-20 08:00:02 [DB] Извлечение событий за прошедшие сутки...",
        "2023-11-20 08:00:05 [PARSER] Нормализация 12,450 записей с приборов...",
        "2023-11-20 08:00:08 [AI] Распознавание аномальных паттернов...",
        "2023-11-20 08:00:10 [SUCCESS] Аномалий не выявлено. Фон в норме.",
        "2023-11-20 08:00:11 [PDF] Формирование \"Журнала учета неисправностей установок ПБ\"...",
        "2023-11-20 08:00:15 [PDF] Формирование \"Журнала проведения ТО и ППР\"...",
        "2023-11-20 08:00:18 [SIGN] Наложение цифровой подписи (ЭЦП)...",
        "2023-11-20 08:00:20 [DELIVERY] Отправка журналов проверяющим органам МЧС..."
    ];

    const [visibleLines, setVisibleLines] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setVisibleLines(prev => (prev < lines.length ? prev + 1 : 0));
        }, 1500);
        return () => clearInterval(interval);
    }, [lines.length]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-black border border-gray-800 rounded-xl shadow-lg p-6 lg:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-medium text-sm mb-6 border border-green-500/20">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Без участия человека
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Автоматическое заполнение журналов МЧС</h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                    Платформа берет на себя рутину: анализирует логи за сутки, автоматически формирует все обязательные журналы (ТО, неисправностей, инструктажей) и готовит их к подписанию электронной подписью. Вы всегда готовы к проверке.
                </p>
                <div className="flex items-center gap-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex-1 text-center">
                        <div className="text-3xl mb-2">📄</div>
                        <div className="text-sm font-semibold text-gray-300">Журнал неисправностей</div>
                        <div className="text-xs text-green-500 mt-1">Сформирован</div>
                    </div>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex-1 text-center">
                        <div className="text-3xl mb-2">🔧</div>
                        <div className="text-sm font-semibold text-gray-300">Журнал ТО и ППР</div>
                        <div className="text-xs text-green-500 mt-1">Сформирован</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 font-mono text-sm leading-relaxed h-[400px] overflow-y-auto relative z-10 shadow-inner">
                <div className="sticky top-0 bg-gray-900/90 backdrop-blur pb-4 border-b border-gray-800 mb-4 flex items-center justify-between">
                    <span className="text-gray-500 uppercase tracking-widest text-xs">Terminal</span>
                    <span className="flex gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    </span>
                </div>
                <div className="space-y-2">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: index < visibleLines ? 1 : 0,
                                x: index < visibleLines ? 0 : -10
                            }}
                            className={`
                                ${line.includes('[SUCCESS]') || line.includes('[DELIVERY]') ? 'text-green-400' :
                                    line.includes('[ERROR]') ? 'text-red-400' :
                                        line.includes('[AI]') ? 'text-purple-400' : 'text-gray-400'}
                            `}
                        >
                            <span className="text-gray-600 mr-2">{'>'}</span>{line}
                        </motion.div>
                    ))}
                    {visibleLines < lines.length && (
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-2 h-4 bg-gray-400 inline-block align-middle ml-2"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Demo() {
    const [activeTab, setActiveTab] = useState('overview');

    // Демо-данные
    const objects = [
        { id: 1, name: 'ГБУ «Жилищник»', progress: 98.2, address: 'ул. Беговая, д.4', responsible: 'Королев М.В.' },
        { id: 2, name: 'ТЦ "Галерея"', progress: 66.0, address: 'пр-т Ленина, д.15', responsible: 'Иванов А.С.' },
        { id: 3, name: 'Складской комплекс', progress: 85.5, address: 'Промзона СЗАО', responsible: 'Смирнов В.П.' },
    ];

    const events = [
        { id: 1, type: 'error', title: 'Потеря связи с прибором', description: 'Складской комплекс (Шлейф 4) не выходит на связь 5 минут.', time: '10:45' },
        { id: 2, type: 'warning', title: 'Снижение заряда АКБ', description: 'ГБУ «Жилищник», РИП 12В сообщает о низком уровне заряда.', time: '09:12' },
        { id: 3, type: 'success', title: 'Система обновлена', description: 'Службы сбора логов успешно перезагружены.', time: '06:00' },
        { id: 4, type: 'success', title: 'Авторизация в системе', description: 'Пользователь Иванов А.С. вошел с IP 192.168.1.5', time: '08:05' },
    ];

    const tabs = [
        { id: 'overview', name: 'Обзор платформы' },
        { id: 'events', name: 'Мониторинг событий' },
        { id: 'map', name: 'Гео-радар объектов' },
        { id: 'roles', name: 'Настройка ролевого доступа' },
        { id: 'journals', name: 'Генерация отчетов' },
        { id: 'analytics', name: 'Сводная аналитика' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <CircularProgress value={97} label="Установленные СППЗ" delay={0.1} />
                            <CircularProgress value={87} label="Проверки МЧС" delay={0.3} />
                            <CircularProgress value={96} label="Общая безопасность" delay={0.5} />
                        </div>
                        <ObjectsTable objects={objects} />
                    </motion.div>
                );
            case 'events':
                return (
                    <motion.div
                        key="events"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <EventsList events={events} />
                    </motion.div>
                );
            case 'map':
                return (
                    <motion.div
                        key="map"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <InteractiveMap />
                    </motion.div>
                );
            case 'roles':
                return (
                    <motion.div
                        key="roles"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <RoleAccessControl />
                    </motion.div>
                );
            case 'analytics':
                return (
                    <motion.div
                        key="analytics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnalyticsCards />
                    </motion.div>
                );
            case 'journals':
                return (
                    <motion.div
                        key="journals"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AutomatedJournals />
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-white font-sans selection:bg-fireblock-red selection:text-white flex flex-col">
            <Head title="Демонстрация дашборда | FIREBLOCK SOLUTION" />

            <Header />

            <main className="flex-grow pt-28 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Заголовок страницы */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Интерфейс <span className="text-fireblock-red">Мониторинга</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl">
                            Оцените возможности единого дашборда FIREBLOCK. Мгновенный доступ к статусам объектов, журналу событий и аналитике.
                        </p>
                    </motion.div>

                    {/* Навигация по табам */}
                    <div className="mb-8 border-b border-gray-800">
                        <nav className="-mb-px flex space-x-6 overflow-x-auto scrollbar-hide">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm transition-colors relative pb-4
                                        ${activeTab === tab.id
                                            ? 'text-white border-transparent'
                                            : 'border-transparent text-gray-500 hover:text-gray-300'}
                                    `}
                                >
                                    {tab.name}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="demoTabIndicator"
                                            className="absolute bottom-[0px] left-0 right-0 h-[2px] bg-fireblock-red shadow-[0_0_10px_rgba(230,57,70,0.8)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Контент табов (имитация интерфейса) */}
                    <div className="bg-[#0a0a0a] rounded-2xl border border-gray-800 shadow-2xl p-4 sm:p-8 relative">
                        {/* Декорация рамки */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

                        {/* Имитация верхней панели окна (управленческая) */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div className="text-xs text-gray-600 font-mono tracking-widest uppercase">
                                FIREBLOCK SYSTEM V0.1
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {renderContent()}
                        </AnimatePresence>
                    </div>

                    {/* Описание модулей системы - Крупные блоки */}
                    <div className="mt-32 space-y-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Архитектура Платформы</h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                FIREBLOCK SOLUTION состоит из модулей, работающих в едином контуре для обеспечения бесперебойного мониторинга пожарной безопасности.
                            </p>
                        </motion.div>

                        {/* Модуль 1: Интеграция */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
                        >
                            <div className="md:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm mb-6 border border-blue-500/20">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    Hardware & Network
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-6">Аппаратный Модуль Интеграции</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    Обеспечивает надежное подключение к контрольно-приемным приборам различных производителей (Болид, Рубеж, Стрелец). Поддерживает протоколы RS-485, Ethernet, GSM для непрерывного сбора первичных телеметрических данных.
                                </p>
                                <ul className="space-y-3">
                                    {['Унифицированный прием логов', 'Поддержка legacy-оборудования', 'Буферизация при потере связи'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                                <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-2xl overflow-hidden group">
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                                    <div className="flex flex-col items-center justify-center p-8 border border-dashed border-gray-700 rounded-xl bg-black/50">
                                        <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🔌</div>
                                        <div className="flex gap-4 mb-4">
                                            <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-400 font-mono">RS-485</div>
                                            <div className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-sm text-gray-400 font-mono">TCP/IP</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Модуль 2: Ядро (Обратный порядок) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24"
                        >
                            <div className="md:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 font-medium text-sm mb-6 border border-purple-500/20">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                    Highload Service
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-6">Ядро Обработки Логов</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    Высокопроизводительный сервис, способный фильтровать, парсить и нормализовать миллионы событий в сутки в реальном времени. В основе лежат распределенные очереди сообщений и in-memory базы данных.
                                </p>
                                <ul className="space-y-3">
                                    {['Обработка \u003e10k событий в секунду', 'Нормализация разнородных данных', 'Автоматическая архивация'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                                <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-2xl overflow-hidden group">
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                                    <div className="flex flex-col items-center justify-center p-8 border border-gray-800 rounded-xl bg-black relative">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                        <div className="text-6xl mb-6 transform group-hover:rotate-12 transition-transform duration-500">⚙️</div>
                                        <div className="w-full space-y-2">
                                            <div className="h-2 w-full bg-gray-900 rounded overflow-hidden"><div className="h-full bg-purple-500 w-3/4"></div></div>
                                            <div className="h-2 w-full bg-gray-900 rounded overflow-hidden"><div className="h-full bg-purple-500 w-1/2"></div></div>
                                            <div className="h-2 w-full bg-gray-900 rounded overflow-hidden"><div className="h-full bg-purple-500 w-5/6"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Модуль 3: Алертинг */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24"
                        >
                            <div className="md:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fireblock-red/10 text-fireblock-red font-medium text-sm mb-6 border border-fireblock-red/20">
                                    <span className="w-2 h-2 rounded-full bg-fireblock-red animate-pulse"></span>
                                    Critical Response
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-6">Автоматизированные уведомления</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                    Мгновенное распознавание критических инцидентов (Пожар, Тревога, Потеря связи). Система автоматически маршрутизирует уведомления ответственным лицам на основе настроенных правил эскалации.
                                </p>
                                <ul className="space-y-3">
                                    {['Push-уведомления и SMS', 'Матрица эскалации инцидентов', 'Интеграция с Telegram'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <svg className="w-5 h-5 text-fireblock-red flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative">
                                <div className="absolute inset-0 bg-red-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                                <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-8 shadow-2xl overflow-hidden group hover:border-red-900/50 transition-colors">
                                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
                                    <div className="flex flex-col items-center justify-center p-8 relative">
                                        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center relative">
                                            <div className="absolute inset-0 rounded-full border border-red-500/30 animate-[ping_2s_var(--tw-ease)_infinite]"></div>
                                            <div className="text-5xl relative z-10 group-hover:scale-110 transition-transform">🚨</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Модуль 4: Гео и Аналитика (Широкий блок) */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full filter blur-[120px] pointer-events-none group-hover:bg-green-500/10 transition-colors duration-1000"></div>

                            <div className="relative z-10 max-w-3xl">
                                <h3 className="text-3xl font-bold text-white mb-6">Гео-радар и Аналитика Готовности</h3>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Комплексное отображение состояния защищаемых объектов на интерактивной карте. Построение графиков доступности, автоматическое формирование сводных отчетов по объектам и выгрузка статистики для контрольно-надзорных органов.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                {[
                                    { icon: "🗺️", title: "Интерактивная карта", desc: "Цветовая индикация статусов" },
                                    { icon: "📊", title: "Конструктор отчетов", desc: "Экспорт в PDF/Excel" },
                                    { icon: "🛡️", title: "Ролевая модель", desc: "Разделение прав доступа" }
                                ].map((feature, i) => (
                                    <div key={i} className="bg-black border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                                        <div className="text-3xl mb-4">{feature.icon}</div>
                                        <h4 className="text-lg font-bold text-gray-200 mb-2">{feature.title}</h4>
                                        <p className="text-sm text-gray-500">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                </div>
            </main>

            <Footer />
            <CookieConsent />
        </div>
    );
}
