<?php

namespace App\Http\Controllers;

use App\Models\ContactRequest;
use App\Models\License;
use App\Models\Page;
use App\Models\Tariff;
use App\Models\Setting;
use App\Mail\ContactRequestNotification;
use App\Services\TelegramNotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        // В будущем тут можно доставать реквизиты из БД, пока отдаем статику для фронта
        return Inertia::render('Landing');
    }

    public function about()
    {
        $licenses = License::orderBy('sort_order')->get();
        return Inertia::render('About', [
            'licenses' => $licenses
        ]);
    }

    public function features()
    {
        return Inertia::render('Features');
    }

    public function demo()
    {
        return Inertia::render('Demo');
    }

    public function pricing()
    {
        $tariffs = Tariff::where('is_active', true)->orderBy('sort_order')->get();
        return Inertia::render('Pricing', [
            'tariffs' => $tariffs
        ]);
    }

    public function page($slug)
    {
        $page = Page::where('slug', $slug)->firstOrFail();
        return Inertia::render('Policy', [
            'page' => $page
        ]);
    }

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'message' => 'nullable|string|max:1000',
            'privacy_accepted' => 'required|accepted',
        ]);

        $contactRequest = ContactRequest::create([
            'name' => strip_tags($validated['name']),
            'phone' => strip_tags($validated['phone'] ?? ''),
            'email' => strip_tags($validated['email'] ?? ''),
            'message' => strip_tags($validated['message'] ?? ''),
        ]);

        // Отправка уведомлений
        try {
            $settings = Setting::whereIn('key', [
                'notify_email',
                'notify_telegram_enabled',
                'notify_telegram_bot_token',
                'notify_telegram_chat_id'
            ])->pluck('value', 'key');

            // Отправка на Email
            if (!empty($settings['notify_email'])) {
                Mail::to($settings['notify_email'])->send(new ContactRequestNotification($contactRequest));
            }

            // Отправка в Telegram
            if (
                isset($settings['notify_telegram_enabled']) && 
                ($settings['notify_telegram_enabled'] === '1' || $settings['notify_telegram_enabled'] === 'true' || $settings['notify_telegram_enabled'] === true) &&
                !empty($settings['notify_telegram_bot_token']) && 
                !empty($settings['notify_telegram_chat_id'])
            ) {
                
                $telegramMessage = "🚨 <b>Новая заявка с сайта FIREBLOCK</b>\n\n";
                $telegramMessage .= "👤 <b>Имя:</b> {$contactRequest->name}\n";
                if ($contactRequest->phone) {
                    $telegramMessage .= "📞 <b>Телефон:</b> {$contactRequest->phone}\n";
                }
                if ($contactRequest->email) {
                    $telegramMessage .= "✉️ <b>Email:</b> {$contactRequest->email}\n";
                }
                if ($contactRequest->message) {
                    $telegramMessage .= "💬 <b>Сообщение:</b>\n<i>{$contactRequest->message}</i>\n";
                }
                
                TelegramNotificationService::sendMessage(
                    $settings['notify_telegram_bot_token'],
                    $settings['notify_telegram_chat_id'],
                    $telegramMessage
                );
            }

        } catch (\Exception $e) {
            // Логируем ошибку, но не прерываем выполнение (пользователь все равно должен увидеть "Успешно")
            Log::error('Ошибка отправки уведомлений о заявке: ' . $e->getMessage());
        }

        return back()->with('success', 'Спасибо за обращение! Ваша заявка отправлена.');
    }
}
