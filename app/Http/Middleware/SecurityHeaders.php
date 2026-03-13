<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Добавление заголовков безопасности ко всем HTTP-ответам.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Запрет встраивания сайта во фреймы (Clickjacking)
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Включить встроенную защиту от XSS в браузерах
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Запрет MIME-type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Ограничение информации о реферере
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Запрет доступа к камере, микрофону, геолокации и т.д.
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        return $response;
    }
}
