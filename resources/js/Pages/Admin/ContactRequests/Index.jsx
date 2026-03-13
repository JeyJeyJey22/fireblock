import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Index({ requests }) {
    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Заявки с сайта</h2>}>
            <Head title="Заявки" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">

                        <div className="overflow-x-auto text-gray-900">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                                        <th className="p-4">Дата</th>
                                        <th className="p-4">Имя</th>
                                        <th className="p-4">Контакты</th>
                                        <th className="p-4">Сообщение</th>
                                        <th className="p-4">Статус</th>
                                        <th className="p-4 text-right">Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-4 text-center text-gray-500">Заявок пока нет.</td>
                                        </tr>
                                    ) : (
                                        requests.map((req) => (
                                            <tr key={req.id} className={`border-b border-gray-200 hover:bg-gray-50 transition ${req.status === 'new' ? 'bg-indigo-50/30 font-medium' : 'text-gray-600'}`}>
                                                <td className="p-4 whitespace-nowrap">{new Date(req.created_at).toLocaleString('ru-RU')}</td>
                                                <td className="p-4">{req.name}</td>
                                                <td className="p-4 text-sm">
                                                    <div>{req.phone || 'Нет телефона'}</div>
                                                    <div className="text-gray-500">{req.email}</div>
                                                </td>
                                                <td className="p-4 max-w-xs">{req.message || 'Без сообщения'}</td>
                                                <td className="p-4">
                                                    {req.status === 'new'
                                                        ? <span className="px-2 py-1 bg-red-500/20 text-red-500 rounded text-xs uppercase font-bold tracking-wider">Новая</span>
                                                        : <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs uppercase tracking-wider">Обработана</span>
                                                    }
                                                </td>
                                                <td className="p-4 text-right whitespace-nowrap flex gap-3 justify-end items-center h-full">
                                                    {req.status === 'new' && (
                                                        <Link
                                                            href={route('admin.contact-requests.update', req.id)}
                                                            method="put"
                                                            data={{ status: 'processed' }}
                                                            as="button"
                                                            className="text-green-500 hover:text-green-400 font-semibold text-sm transition"
                                                        >
                                                            ОК
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={route('admin.contact-requests.destroy', req.id)}
                                                        method="delete"
                                                        as="button"
                                                        className="text-gray-600 hover:text-red-500 text-sm transition"
                                                    >
                                                        Удалить
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
