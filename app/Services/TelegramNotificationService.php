<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TelegramNotificationService
{
    /**
     * Отправить сообщение в Telegram через Bot API
     *
     * @param string $token Token бота
     * @param string $chatId Chat ID
     * @param string $text Текст сообщения
     * @return bool
     */
    public static function sendMessage(string $token, string $chatId, string $text): bool
    {
        if (empty($token) || empty($chatId)) {
            return false;
        }

        try {
            $url = "https://api.telegram.org/bot{$token}/sendMessage";
            
            $response = Http::post($url, [
                'chat_id' => $chatId,
                'text' => $text,
                'parse_mode' => 'HTML',
                'disable_web_page_preview' => true,
            ]);

            if (!$response->successful()) {
                Log::error('Ошибка отправки уведомления в Telegram', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return false;
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Исключение при отправке уведомления в Telegram: ' . $e->getMessage());
            return false;
        }
    }
}
