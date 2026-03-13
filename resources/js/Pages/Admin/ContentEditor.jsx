import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function ContentEditor() {
    const editorRef = useRef(null);
    const [savedContent, setSavedContent] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Мокаем отправку контента
    const handleSave = () => {
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            setIsSaving(true);
            setTimeout(() => {
                setSavedContent(content);
                setIsSaving(false);
            }, 800);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Редактор контента
                </h2>
            }
        >
            <Head title="Редактор контента" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg border border-gray-200 p-6">

                        <div className="mb-6 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800">Управление текстовыми блоками сайта</h3>
                                <p className="mt-1 text-sm text-gray-600">Используйте редактор для форматирования текста. (Демонстрационный режим, сохранение имитируется)</p>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`px-4 py-2 bg-fireblock-red text-white rounded-md font-medium hover:bg-red-700 transition ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                            </button>
                        </div>

                        <div className="bg-white rounded-md overflow-hidden">
                            {/* Замените apiKey на ваш реальный ключ от TinyMCE */}
                            <Editor
                                apiKey="zowixkttn4c8j5fhl6r32ic42fhlxy9i8uapaw1b64a2n41s"
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Вы можете редактировать это содержимое. Сделайте его <strong>жирным</strong> или <em>курсивом</em>!</p>"
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
                                    skin: 'oxide', // Или 'oxide-dark' если нужен темный редактор
                                    content_css: 'default' // Или 'dark'
                                }}
                            />
                        </div>

                        {savedContent && (
                            <div className="mt-8">
                                <h4 className="text-lg font-medium text-gray-800 mb-4">Предпросмотр сохраненного (Сырой HTML):</h4>
                                <div className="p-4 bg-gray-50 text-gray-800 rounded-md border border-gray-200 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                                    {savedContent}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
