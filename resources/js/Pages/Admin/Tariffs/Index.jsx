import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ tariffs }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот тариф?')) {
            destroy(route('admin.tariffs.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Управление Стоимостью (Тарифы)
                    </h2>
                    <Link
                        href={route('admin.tariffs.create')}
                        className="rounded-md bg-fireblock-red px-4 py-2 text-sm text-white hover:bg-red-600 transition"
                    >
                        Добавить тариф
                    </Link>
                </div>
            }
        >
            <Head title="Стоимость" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-600 border-b border-gray-200">
                                        <tr>
                                            <th className="p-4">Название</th>
                                            <th className="p-4">Цена</th>
                                            <th className="p-4">Сортировка</th>
                                            <th className="p-4 text-right">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tariffs.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="p-4 text-center text-gray-500">Тарифы пока не добавлены.</td>
                                            </tr>
                                        ) : (
                                            tariffs.map((tariff) => (
                                                <tr key={tariff.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                                    <td className="p-4 font-medium text-gray-900">{tariff.title} {tariff.is_active ? '' : '(Скрыт)'}</td>
                                                    <td className="p-4">{tariff.price}</td>
                                                    <td className="p-4">{tariff.sort_order}</td>
                                                    <td className="p-4 text-right flex justify-end gap-4">
                                                        <Link href={route('admin.tariffs.edit', tariff.id)} className="text-blue-500 hover:underline">Редактировать</Link>
                                                        <button
                                                            onClick={() => handleDelete(tariff.id)}
                                                            className="text-red-500 hover:underline"
                                                        >
                                                            Удалить
                                                        </button>
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
            </div>
        </AuthenticatedLayout>
    );
}
