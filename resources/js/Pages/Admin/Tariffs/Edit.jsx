import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TinyEditor from '@/Components/Admin/TinyEditor';

export default function Edit({ tariff }) {
    const { data, setData, put, processing, errors } = useForm({
        title: tariff.title || '',
        price: tariff.price || '',
        content: tariff.content || '',
        sort_order: tariff.sort_order || 0,
        is_active: tariff.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        // Используем PUT/PATCH метод для обновления ресурса в Laravel
        put(route('admin.tariffs.update', tariff.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Редактирование тарифа: {tariff.title}
                </h2>
            }
        >
            <Head title={`Редактировать ${tariff.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Название тарифа</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red sm:text-sm"
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Стоимость (строка)</label>
                                    <input
                                        type="text"
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red sm:text-sm"
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Сортировка</label>
                                        <input
                                            type="number"
                                            value={data.sort_order}
                                            onChange={e => setData('sort_order', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red sm:text-sm"
                                        />
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            id="is_active"
                                            className="h-4 w-4 rounded border-gray-300 bg-white text-fireblock-red focus:ring-fireblock-red"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">Активен (Отображается на сайте)</label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание тарифа (HTML)</label>
                                    <TinyEditor
                                        value={data.content}
                                        onEditorChange={(content) => setData('content', content)}
                                    />
                                    {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-fireblock-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
                                    >
                                        Сохранить изменения
                                    </button>
                                    <Link
                                        href={route('admin.tariffs.index')}
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                                    >
                                        Отмена
                                    </Link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
