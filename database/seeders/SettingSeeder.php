<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            ['key' => 'contact_email', 'value' => 'ves@kaska01.ru'],
            ['key' => 'contact_phone', 'value' => '+7 929 933 08 00'],
            ['key' => 'contact_address', 'value' => 'г. Москва, ул. Примерная, д. 1'],
            ['key' => 'contact_map_iframe', 'value' => '<iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A...&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>'],
            ['key' => 'cookie_text', 'value' => 'Продолжая использовать сайт, вы соглашаетесь на обработку файлов cookie и сведений о вас (IP-адрес, действия на сайте) с помощью метрических программ «Яндекс.Метрика». Это нужно для работы сайта и сбора статистики.'],
            ['key' => 'solution_text', 'value' => 'Fireblock Solution — это инновационное программное обеспечение, объединяющее все системы мониторинга пожарной безопасности в единый удобный интерфейс. Мы исключаем человеческий фактор, оцифровываем журналы и предоставляем мгновенные уведомления о критических инцидентах.'],
            ['key' => 'solution_image', 'value' => '/images/mockup.png'],
        ];

        foreach ($settings as $setting) {
            \App\Models\Setting::updateOrCreate(['key' => $setting['key']], ['value' => $setting['value']]);
        }
    }
}
