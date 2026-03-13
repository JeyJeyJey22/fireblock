import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyEditor({ value, onChange, label }) {
    const editorRef = useRef(null);

    return (
        <div className="flex flex-col gap-2 mb-6">
            {label && <label className="text-sm font-semibold text-gray-300">{label}</label>}

            <div className="border border-gray-700 rounded-md overflow-hidden">
                <Editor
                    apiKey="YOUR_TINYMCE_API_KEY" // Подтянуть из .env
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={value}
                    onEditorChange={onChange}
                    init={{
                        height: 500,
                        menubar: false,
                        skin: 'oxide-dark', // Темная тема для органичности с админкой
                        content_css: 'dark',
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; background-color: #111827; color: #fff }'
                    }}
                />
            </div>
        </div>
    );
}
