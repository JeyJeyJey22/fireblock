<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactSettingController extends Controller
{
    public function edit()
    {
        $settings = Setting::whereIn('key', [
            'contact_email',
            'contact_phone',
            'contact_address',
            'contact_map_iframe',
            'cookie_text',
            'solution_text',
            'solution_image',
            'notify_email',
            'notify_telegram_enabled',
            'notify_telegram_bot_token',
            'notify_telegram_chat_id'
        ])->pluck('value', 'key');

        return Inertia::render('Admin/ContactSettings/Edit', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'contact_address' => 'nullable|string|max:1000',
            'contact_map_iframe' => 'nullable|string',
            'cookie_text' => 'nullable|string|max:5000',
            'solution_text' => 'nullable|string|max:5000',
            'solution_image' => 'nullable|image|max:5120', // 5MB max
            'notify_email' => 'nullable|email|max:255',
            'notify_telegram_enabled' => 'nullable|boolean',
            'notify_telegram_bot_token' => 'nullable|string|max:255',
            'notify_telegram_chat_id' => 'nullable|string|max:255',
        ]);

        // Извлекаем файл из валидированных данных, если он есть
        $image = $request->file('solution_image');
        unset($validated['solution_image']);

        if ($image) {
            $path = $image->store('settings', 'public');
            Setting::updateOrCreate(
                ['key' => 'solution_image'],
                ['value' => '/storage/' . $path]
            );
        }

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return back()->with('success', 'Настройки сайта успешно обновлены');
    }
}
