import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import React from 'react';

export default function Index({ licenses, flash }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.licenses.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Лицензии на ПО</h2>}>
            <Head title="Лицензии" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Форма загрузки */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Добавить новую лицензию</h3>
                        <form onSubmit={submit} className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Название (например: Лицензия ФСТЭК)</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red"
                                    required
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">Файл изображения (Скан, фото)</label>
                                <input
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                    required
                                    accept="image/*"
                                />
                                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                            </div>
                            <button disabled={processing} className="px-6 py-2 bg-fireblock-red text-white rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50 min-h-[42px] mt-1 md:mt-0">
                                Загрузить
                            </button>
                        </form>
                    </div>

                    {/* Сетка лицензий */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-6">Загруженные лицензии</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {licenses.map((license) => (
                                <div key={license.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                                    <div className="h-48 bg-white overflow-hidden flex items-center justify-center p-2 border-b border-gray-200">
                                        <img src={license.image_path} alt={license.title} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between flex-1">
                                        <h4 className="text-gray-900 font-medium mb-4">{license.title}</h4>
                                        <Link
                                            href={route('admin.licenses.destroy', license.id)}
                                            method="delete"
                                            as="button"
                                            className="text-red-500 hover:text-red-400 text-sm font-semibold transition self-start"
                                        >
                                            Удалить
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            {licenses.length === 0 && (
                                <div className="col-span-full text-center text-gray-500 py-8">
                                    Нет загруженных лицензий
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
