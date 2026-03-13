import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Create() {
    const editorRef = useRef(null);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Берем актуальный контент из рефа перед отправкой
        if (editorRef.current) {
            data.content = editorRef.current.getContent();
        }
        post(route('admin.pages.store'));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Новая страница</h2>}>
            <Head title="Создать страницу" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={submit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Название страницы (H1)</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red"
                                        required
                                    />
                                    {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Алиас (ссылка, например policy). Если оставить пустым, сгенерируется из названия</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-fireblock-red focus:ring-fireblock-red"
                                    />
                                    {errors.slug && <div className="text-red-500 text-sm mt-1">{errors.slug}</div>}
                                </div>
                            </div>

                            <div className="bg-white rounded-md overflow-hidden">
                                <Editor
                                    apiKey="zowixkttn4c8j5fhl6r32ic42fhlxy9i8uapaw1b64a2n41s"
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue={data.content}
                                    onEditorChange={(content) => setData('content', content)}
                                    init={{
                                        height: 500,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                        skin: 'oxide',
                                    }}
                                />
                                {errors.content && <div className="text-red-500 text-sm p-2">{errors.content}</div>}
                            </div>

                            <div className="flex items-center gap-4">
                                <button disabled={processing} className="px-6 py-3 bg-fireblock-red text-white rounded-md font-bold hover:bg-red-700 transition disabled:opacity-50">
                                    Сохранить страницу
                                </button>
                                <a href={route('admin.pages.index')} className="text-gray-600 hover:text-gray-900 transition">Отмена</a>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
