import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ pages }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Страницы (Политики)</h2>}
        >
            <Head title="Динамические страницы" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-800">Управление текстовыми страницами</h3>
                            <Link href={route('admin.pages.create')} className="px-4 py-2 bg-fireblock-red text-white rounded-md hover:bg-red-700 transition">
                                Открыть редактор (Создать)
                            </Link>
                        </div>

                        <div className="overflow-x-auto text-gray-900">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                                        <th className="p-4">Название</th>
                                        <th className="p-4">URL (Slug)</th>
                                        <th className="p-4">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pages.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" className="p-4 text-center text-gray-500">Страниц пока нет.</td>
                                        </tr>
                                    ) : (
                                        pages.map((page) => (
                                            <tr key={page.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                                <td className="p-4 font-medium text-gray-900">{page.title}</td>
                                                <td className="p-4 text-gray-600">/{page.slug}</td>
                                                <td className="p-4 flex gap-4">
                                                    <Link href={route('admin.pages.edit', page.id)} className="text-blue-500 hover:underline">Редактировать</Link>
                                                    <Link href={route('admin.pages.destroy', page.id)} method="delete" as="button" className="text-red-500 hover:underline">Удалить</Link>
                                                    <a href={`/${page.slug}`} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-800 transition">Просмотр</a>
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
