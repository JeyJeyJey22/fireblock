import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { IMaskInput } from 'react-imask';

export default function ContactForm() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '', phone: '', email: '', message: '', privacy_accepted: false
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact'), { preserveScroll: true, onSuccess: () => reset() });
    };

    if (recentlySuccessful) {
        return (
            <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Ваше имя *</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} required className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fireblock-red transition" placeholder="Иван Иванов" />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Телефон *</label>
                    <IMaskInput
                        mask="+{7} (000) 000-00-00"
                        value={data.phone}
                        unmask={false}
                        onAccept={(value) => setData('phone', value)}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fireblock-red transition"
                        placeholder="+7 (999) 000-00-00"
                    />
                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fireblock-red transition" placeholder="example@mail.ru" />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Комментарий</label>
                <textarea value={data.message} onChange={e => setData('message', e.target.value)} rows="3" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fireblock-red transition" placeholder="Краткое описание вашей задачи..."></textarea>
                {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
            </div>

            <div className="flex items-start gap-3">
                <input type="checkbox" id="privacy" checked={data.privacy_accepted} onChange={e => setData('privacy_accepted', e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-700 bg-gray-800 text-fireblock-red focus:ring-fireblock-red focus:ring-offset-gray-900 cursor-pointer" />
                <label htmlFor="privacy" className="text-sm text-gray-400 cursor-pointer">
                    Я согласен(на) на обработку персональных данных в соответствии с <Link href="/privacy-policy" className="text-fireblock-red hover:underline" target="_blank">Политикой конфиденциальности</Link>. *
                </label>
            </div>
            {errors.privacy_accepted && <div className="text-red-500 text-xs">{errors.privacy_accepted}</div>}

            <button type="submit" disabled={processing} className="w-full px-8 py-4 bg-fireblock-red text-white uppercase tracking-wider font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50">
                Оставить заявку
            </button>
        </form>
    );
}
