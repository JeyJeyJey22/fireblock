import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { IMaskInput } from 'react-imask';

export default function Edit({ auth, settings }) {
    const { data, setData, post, processing, errors } = useForm({
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        contact_map_iframe: settings.contact_map_iframe || '',
        cookie_text: settings.cookie_text || '',
        solution_text: settings.solution_text || '',
        solution_image: null,
        notify_email: settings.notify_email || '',
        notify_telegram_enabled: settings.notify_telegram_enabled === 'true' || settings.notify_telegram_enabled === true || false,
        notify_telegram_bot_token: settings.notify_telegram_bot_token || '',
        notify_telegram_chat_id: settings.notify_telegram_chat_id || '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Use POST with _method: 'PUT' for file uploads in Inertia
        post(route('admin.contact-settings.update'), {
            _method: 'put',
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Настройки сайта</h2>}
        >
            <Head title="Настройки сайта" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Редактирование контактной информации</h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Эта информация будет отображаться в блоке контактов на главной странице, а также в подвале сайта.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <label htmlFor="contact_email" className="block font-medium text-sm text-gray-700">Email</label>
                                    <input
                                        id="contact_email"
                                        type="email"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.contact_email}
                                        onChange={(e) => setData('contact_email', e.target.value)}
                                    />
                                    {errors.contact_email && <div className="text-red-600 text-sm mt-1">{errors.contact_email}</div>}
                                </div>

                                <div>
                                    <label htmlFor="contact_phone" className="block font-medium text-sm text-gray-700">Телефон</label>
                                    <IMaskInput
                                        id="contact_phone"
                                        mask="+{7} (000) 000-00-00"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.contact_phone}
                                        unmask={false}
                                        onAccept={(value) => setData('contact_phone', value)}
                                        placeholder="+7 (999) 000-00-00"
                                    />
                                    {errors.contact_phone && <div className="text-red-600 text-sm mt-1">{errors.contact_phone}</div>}
                                </div>

                                <div>
                                    <label htmlFor="contact_address" className="block font-medium text-sm text-gray-700">Адрес</label>
                                    <textarea
                                        id="contact_address"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="3"
                                        value={data.contact_address}
                                        onChange={(e) => setData('contact_address', e.target.value)}
                                    />
                                    {errors.contact_address && <div className="text-red-600 text-sm mt-1">{errors.contact_address}</div>}
                                </div>

                                <div>
                                    <label htmlFor="contact_map_iframe" className="block font-medium text-sm text-gray-700">HTML-код Яндекс Карты (iframe)</label>
                                    <textarea
                                        id="contact_map_iframe"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono text-xs"
                                        rows="5"
                                        value={data.contact_map_iframe}
                                        onChange={(e) => setData('contact_map_iframe', e.target.value)}
                                        placeholder='<iframe src="..." width="..." height="..."></iframe>'
                                    />
                                    {errors.contact_map_iframe && <div className="text-red-600 text-sm mt-1">{errors.contact_map_iframe}</div>}
                                </div>

                                <div className="border-t border-gray-200 mt-8 pt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Настройки уведомлений (Заявки с сайта)</h3>
                                    
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="notify_email" className="block font-medium text-sm text-gray-700">Email для получения заявок</label>
                                            <input
                                                id="notify_email"
                                                type="email"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data.notify_email}
                                                onChange={(e) => setData('notify_email', e.target.value)}
                                                placeholder="admin@example.com"
                                            />
                                            {errors.notify_email && <div className="text-red-600 text-sm mt-1">{errors.notify_email}</div>}
                                        </div>

                                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="notify_telegram_enabled"
                                                    type="checkbox"
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                    checked={data.notify_telegram_enabled}
                                                    onChange={(e) => setData('notify_telegram_enabled', e.target.checked)}
                                                />
                                                <label htmlFor="notify_telegram_enabled" className="ml-2 block font-medium text-sm text-gray-700">
                                                    Включить уведомления в Telegram
                                                </label>
                                            </div>
                                            {errors.notify_telegram_enabled && <div className="text-red-600 text-sm mt-1">{errors.notify_telegram_enabled}</div>}

                                            {data.notify_telegram_enabled && (
                                                <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
                                                    <div>
                                                        <label htmlFor="notify_telegram_bot_token" className="block font-medium text-sm text-gray-700">Telegram Bot Token</label>
                                                        <input
                                                            id="notify_telegram_bot_token"
                                                            type="text"
                                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono text-sm"
                                                            value={data.notify_telegram_bot_token}
                                                            onChange={(e) => setData('notify_telegram_bot_token', e.target.value)}
                                                            placeholder="123456789:ABCdefGHIjklMNO..."
                                                        />
                                                        {errors.notify_telegram_bot_token && <div className="text-red-600 text-sm mt-1">{errors.notify_telegram_bot_token}</div>}
                                                    </div>

                                                    <div>
                                                        <label htmlFor="notify_telegram_chat_id" className="block font-medium text-sm text-gray-700">Telegram Chat ID</label>
                                                        <input
                                                            id="notify_telegram_chat_id"
                                                            type="text"
                                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm font-mono text-sm"
                                                            value={data.notify_telegram_chat_id}
                                                            onChange={(e) => setData('notify_telegram_chat_id', e.target.value)}
                                                            placeholder="-1001234567890"
                                                        />
                                                        {errors.notify_telegram_chat_id && <div className="text-red-600 text-sm mt-1">{errors.notify_telegram_chat_id}</div>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 mt-8 pt-8">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Текстовой контент на сайте</h3>

                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="cookie_text" className="block font-medium text-sm text-gray-700">Текст всплывающего окна "Cookies"</label>
                                            <textarea
                                                id="cookie_text"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="3"
                                                value={data.cookie_text}
                                                onChange={(e) => setData('cookie_text', e.target.value)}
                                            />
                                            {errors.cookie_text && <div className="text-red-600 text-sm mt-1">{errors.cookie_text}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="solution_text" className="block font-medium text-sm text-gray-700">Текст блока "Наше решение" на главной странице</label>
                                            <textarea
                                                id="solution_text"
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                rows="4"
                                                value={data.solution_text}
                                                onChange={(e) => setData('solution_text', e.target.value)}
                                            />
                                            {errors.solution_text && <div className="text-red-600 text-sm mt-1">{errors.solution_text}</div>}
                                        </div>

                                        <div>
                                            <label htmlFor="solution_image" className="block font-medium text-sm text-gray-700">Изображение (мокап) для блока "Наше решение"</label>
                                            <input
                                                id="solution_image"
                                                type="file"
                                                accept="image/*"
                                                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                                onChange={e => setData('solution_image', e.target.files[0])}
                                            />
                                            {settings.solution_image && (
                                                <div className="mt-2 flex items-center gap-4">
                                                    <span className="text-sm text-gray-500">Текущее:</span>
                                                    <img src={settings.solution_image} alt="Preview" className="h-20 object-contain bg-gray-100 rounded border border-gray-200" />
                                                </div>
                                            )}
                                            {errors.solution_image && <div className="text-red-600 text-sm mt-1">{errors.solution_image}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
