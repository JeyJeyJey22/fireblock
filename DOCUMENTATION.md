# FIREBLOCK SOLUTION — Техническая документация

## Оглавление

1. [Обзор проекта](#1-обзор-проекта)
2. [Стек технологий и зависимости](#2-стек-технологий-и-зависимости)
3. [Структура каталогов](#3-структура-каталогов)
4. [Конфигурация и окружение](#4-конфигурация-и-окружение)
5. [База данных: модели и миграции](#5-база-данных-модели-и-миграции)
6. [Маршруты (Routes)](#6-маршруты-routes)
7. [HTTP Controllers](#7-http-controllers)
8. [Services](#8-services)
9. [Mail (Mailable-классы)](#9-mail-mailable-классы)
10. [Middleware](#10-middleware)
11. [Frontend: React-компоненты (Inertia.js)](#11-frontend-react-компоненты-inertiajs)
12. [Аутентификация](#12-аутентификация)
13. [Безопасность](#13-безопасность)
14. [Деплой и сборка](#14-деплой-и-сборка)

---

## 1. Обзор проекта

**FIREBLOCK SOLUTION** — веб-платформа для мониторинга и управления системами пожарной безопасности. Включает:

- Публичный сайт-лендинг с описанием продукта, тарифами и формой обратной связи.
- Панель администратора для управления контентом сайта, заявками и настройками.
- Систему уведомлений о новых заявках (Email + Telegram).

---

## 2. Стек технологий и зависимости

### Backend (PHP)

| Пакет | Версия | Назначение |
|---|---|---|
| `laravel/framework` | ^12.0 | Основной PHP-фреймворк |
| `inertiajs/inertia-laravel` | ^2.0 | Связь Laravel ↔ React без REST API |
| `laravel/sanctum` | ^4.0 | API-авторизация (используется по умолчанию) |
| `tightenco/ziggy` | ^2.0 | Передача named routes в JavaScript |

### Frontend (JavaScript)

| Пакет | Версия | Назначение |
|---|---|---|
| `react` / `react-dom` | ^19.0 | UI-фреймворк |
| `@inertiajs/react` | ^2.0 | Инерция-адаптер для React |
| `framer-motion` | последняя | Анимации |
| `@tinymce/tinymce-react` | последняя | Редактор контента (admin) |
| `vite` | ^7.0 | Сборщик фронтенда |
| `tailwindcss` | ^3.2 | CSS-фреймворк |

### Сервисы (внешние)

| Сервис | Назначение |
|---|---|
| SMTP-сервер | Отправка email уведомлений о заявках |
| Telegram Bot API | Отправка мгновенных уведомлений в Telegram |

---

## 3. Структура каталогов

```
fireblock/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/               # Контроллеры панели администратора
│   │   │   │   ├── ContactRequestController.php
│   │   │   │   ├── ContactSettingController.php
│   │   │   │   ├── LicenseController.php
│   │   │   │   ├── PageController.php
│   │   │   │   └── TariffController.php
│   │   │   ├── Auth/                # Laravel Breeze (авторизация)
│   │   │   ├── LandingController.php
│   │   │   └── ProfileController.php
│   │   └── Middleware/
│   │       ├── HandleInertiaRequests.php
│   │       └── SecurityHeaders.php
│   ├── Mail/
│   │   └── ContactRequestNotification.php
│   ├── Models/
│   │   ├── ContactRequest.php
│   │   ├── License.php
│   │   ├── Page.php
│   │   ├── Setting.php
│   │   ├── Tariff.php
│   │   └── User.php
│   └── Services/
│       └── TelegramNotificationService.php
├── bootstrap/
│   └── app.php                      # Регистрация middleware
├── database/
│   ├── migrations/                  # Все миграции БД
│   └── seeders/                     # Сидеры начальных данных
├── resources/
│   ├── js/
│   │   ├── Components/              # Переиспользуемые React-компоненты
│   │   ├── Layouts/                 # Layout-компоненты
│   │   └── Pages/                   # Страницы (роутятся через Inertia)
│   └── views/
│       ├── app.blade.php            # Корневой Blade-шаблон
│       └── emails/
│           └── contact-request.blade.php
├── routes/
│   ├── web.php                      # Все веб-маршруты
│   └── auth.php                     # Маршруты авторизации
└── public/build/                    # Скомпилированные ассеты (Vite)
```

---

## 4. Конфигурация и окружение

Файл `.env` (на основе `.env.example`):

```dotenv
APP_NAME=FIREBLOCK
APP_ENV=local                  # local / production
APP_DEBUG=true                 # false на продакшне
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fireblock
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@fireblock.ru"
MAIL_FROM_NAME="FIREBLOCK"
```

> Данные Telegram Bot Token и Chat ID хранятся **в БД** (таблица `settings`), а не в `.env` — это позволяет администратору менять их через интерфейс без правки конфигурации сервера.

---

## 5. База данных: модели и миграции

### Таблица `users`

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `name` | varchar(255) | Имя пользователя |
| `email` | varchar(255) UNIQUE | Email (логин) |
| `password` | varchar(255) | Bcrypt-хеш |
| `remember_token` | varchar(100) | Токен «Запомнить меня» |
| `email_verified_at` | timestamp | Дата подтверждения email |

**Модель:** `App\Models\User`
- `$fillable`: `name`, `email`, `password`
- `$hidden`: `password`, `remember_token`
- Cast: `password → hashed`, `email_verified_at → datetime`

---

### Таблица `contact_requests`

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `name` | varchar(255) | Имя заявителя |
| `phone` | varchar(50) | Телефон |
| `email` | varchar(255) | Email |
| `message` | text | Текст сообщения |
| `status` | enum | `new` или `processed` |
| `created_at` | timestamp | Дата создания |

**Модель:** `App\Models\ContactRequest`
- `$fillable`: `name`, `phone`, `email`, `message`, `status`

---

### Таблица `licenses`

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `title` | varchar(255) | Название лицензии |
| `image_path` | varchar(255) | Путь к изображению |
| `sort_order` | int | Порядок сортировки |

**Модель:** `App\Models\License`
- `$fillable`: `title`, `image_path`, `sort_order`

---

### Таблица `pages`

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `title` | varchar(255) | Заголовок страницы |
| `slug` | varchar(255) UNIQUE | URL-идентификатор |
| `content` | longtext | HTML-контент (TinyMCE) |

**Модель:** `App\Models\Page`
- `$fillable`: `title`, `slug`, `content`

---

### Таблица `tariffs`

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `title` | varchar(255) | Название тарифа |
| `price` | varchar(255) | Цена (текстовая) |
| `content` | text | Описание тарифа |
| `sort_order` | int | Порядок сортировки |
| `is_active` | boolean | Активен ли тариф |

**Модель:** `App\Models\Tariff`
- `$fillable`: `title`, `price`, `content`, `sort_order`, `is_active`

---

### Таблица `settings`

Хранилище пар ключ-значение для настроек всего сайта.

| Поле | Тип | Описание |
|---|---|---|
| `id` | bigint PK | Первичный ключ |
| `key` | varchar(255) UNIQUE | Ключ настройки |
| `value` | text | Значение |

**Модель:** `App\Models\Setting`
- `$fillable`: `key`, `value`

**Используемые ключи:**

| Ключ | Описание | Область применения |
|---|---|---|
| `contact_email` | Email для отображения на сайте | Лендинг |
| `contact_phone` | Телефон для отображения на сайте | Лендинг |
| `contact_address` | Адрес офиса | Лендинг |
| `contact_map_iframe` | HTML-код вставки карты | Лендинг |
| `cookie_text` | Текст уведомления Cookies | Лендинг |
| `solution_text` | Текст блока «Решение» | Лендинг |
| `solution_image` | Изображение блока «Решение» | Лендинг |
| `notify_email` | Email для получения уведомлений о заявках | Уведомления |
| `notify_telegram_enabled` | 1/0 — флаг включения Telegram-уведомлений | Уведомления |
| `notify_telegram_bot_token` | Токен Telegram-бота | Уведомления |
| `notify_telegram_chat_id` | Chat ID в Telegram | Уведомления |

---

## 6. Маршруты (Routes)

Файл: `routes/web.php`

### Публичные маршруты

| Метод | URL | Контроллер | Метод | Middleware |
|---|---|---|---|---|
| `GET` | `/` | `LandingController` | `index` | — |
| `GET` | `/about` | `LandingController` | `about` | — |
| `GET` | `/pricing` | `LandingController` | `pricing` | — |
| `GET` | `/features` | `LandingController` | `features` | — |
| `GET` | `/demo` | `LandingController` | `demo` | — |
| `POST` | `/contact` | `LandingController` | `contact` | `throttle:5,1` |
| `GET` | `/{slug}` | `LandingController` | `page` | — |

> ⚠️ `throttle:5,1` на `/contact` означает: не более 5 запросов в минуту с одного IP.

### Маршруты администратора

Все маршруты находятся под prefix `/admin` и middleware `auth, verified`.

| Метод | URL | Контроллер | Метод | Название маршрута |
|---|---|---|---|---|
| `GET` | `/admin/dashboard` | closure | — | `admin.dashboard` |
| `GET` | `/admin/pages` | `PageController` | `index` | `admin.pages.index` |
| `GET` | `/admin/pages/create` | `PageController` | `create` | `admin.pages.create` |
| `POST` | `/admin/pages` | `PageController` | `store` | `admin.pages.store` |
| `GET` | `/admin/pages/{page}/edit` | `PageController` | `edit` | `admin.pages.edit` |
| `PUT` | `/admin/pages/{page}` | `PageController` | `update` | `admin.pages.update` |
| `DELETE` | `/admin/pages/{page}` | `PageController` | `destroy` | `admin.pages.destroy` |
| `GET` | `/admin/licenses` | `LicenseController` | `index` | `admin.licenses.index` |
| `POST` | `/admin/licenses` | `LicenseController` | `store` | `admin.licenses.store` |
| `DELETE` | `/admin/licenses/{license}` | `LicenseController` | `destroy` | `admin.licenses.destroy` |
| `GET` | `/admin/contact-requests` | `ContactRequestController` | `index` | `admin.contact-requests.index` |
| `PUT` | `/admin/contact-requests/{contactRequest}` | `ContactRequestController` | `update` | `admin.contact-requests.update` |
| `DELETE` | `/admin/contact-requests/{contactRequest}` | `ContactRequestController` | `destroy` | `admin.contact-requests.destroy` |
| `GET` | `/admin/tariffs` | `TariffController` | `index` | `admin.tariffs.index` |
| `GET` | `/admin/tariffs/create` | `TariffController` | `create` | `admin.tariffs.create` |
| `POST` | `/admin/tariffs` | `TariffController` | `store` | `admin.tariffs.store` |
| `GET` | `/admin/tariffs/{tariff}/edit` | `TariffController` | `edit` | `admin.tariffs.edit` |
| `PUT` | `/admin/tariffs/{tariff}` | `TariffController` | `update` | `admin.tariffs.update` |
| `DELETE` | `/admin/tariffs/{tariff}` | `TariffController` | `destroy` | `admin.tariffs.destroy` |
| `GET` | `/admin/contact-settings` | `ContactSettingController` | `edit` | `admin.contact-settings.edit` |
| `PUT` | `/admin/contact-settings` | `ContactSettingController` | `update` | `admin.contact-settings.update` |

### Маршруты профиля

Под middleware `auth`.

| Метод | URL | Контроллер | Метод |
|---|---|---|---|
| `GET` | `/profile` | `ProfileController` | `edit` |
| `PATCH` | `/profile` | `ProfileController` | `update` |
| `DELETE` | `/profile` | `ProfileController` | `destroy` |

### Маршруты авторизации

Определены в `routes/auth.php` (Laravel Breeze).

| Метод | URL | Описание |
|---|---|---|
| `GET` | `/login` | Форма входа |
| `POST` | `/login` | Вход |
| `POST` | `/logout` | Выход |
| `GET` | `/register` | Форма регистрации |
| `POST` | `/register` | Регистрация |
| `GET/POST` | `/forgot-password` | Сброс пароля |
| `GET/POST` | `/reset-password` | Новый пароль |
| `GET/POST` | `/verify-email` | Подтверждение email |

---

## 7. HTTP Controllers

### `LandingController`

**Пространство имён:** `App\Http\Controllers`  
**Файл:** `app/Http/Controllers/LandingController.php`

#### Методы

| Метод | Параметры | Возвращает | Описание |
|---|---|---|---|
| `index()` | — | `Inertia::render('Landing')` | Главная страница |
| `about()` | — | `Inertia::render('About', ['licenses'])` | Страница «О компании»; передаёт все лицензии отсортированные по `sort_order` |
| `features()` | — | `Inertia::render('Features')` | Страница возможностей |
| `demo()` | — | `Inertia::render('Demo')` | Страница демо системы |
| `pricing()` | — | `Inertia::render('Pricing', ['tariffs'])` | Страница тарифов; передаёт активные тарифы (`is_active = true`), отсортированные по `sort_order` |
| `page(string $slug)` | `$slug` | `Inertia::render('Policy', ['page'])` | Динамическая страница по slug; 404 если не найдена |
| `contact(Request $request)` | `Request` | `back()->with('success', ...)` | Обрабатывает форму обратной связи (см. ниже) |

#### Метод `contact()` — детально

**Валидация:**
```
name            required, string, max:255
phone           nullable, string, max:50
email           nullable, email, max:255
message         nullable, string, max:1000
privacy_accepted required, accepted (checkbox)
```

**Процесс:**
1. Данные проходят `strip_tags()` перед сохранением (защита от XSS).
2. Создаётся запись `ContactRequest` в базе.
3. Из таблицы `settings` читаются ключи `notify_email`, `notify_telegram_enabled`, `notify_telegram_bot_token`, `notify_telegram_chat_id`.
4. Если `notify_email` заполнен — отправляет через `Mail::to()->send(new ContactRequestNotification($contactRequest))`.
5. Если Telegram включён и все поля заполнены — формирует HTML-сообщение (теги `<b>`, `<i>`) и вызывает `TelegramNotificationService::sendMessage()`.
6. Исключения логируются (`Log::error`), но **не** прерывают выполнение — пользователь всегда видит успешный ответ.

**Зависимости:**
- `App\Models\ContactRequest`
- `App\Models\Setting`
- `App\Mail\ContactRequestNotification`
- `App\Services\TelegramNotificationService`

---

### `Admin\PageController`

**Файл:** `app/Http/Controllers/Admin/PageController.php`

| Метод | Описание | Валидация |
|---|---|---|
| `index()` | Список всех страниц (desc по дате) | — |
| `create()` | Форма создания | — |
| `store(Request)` | Сохранить страницу | `title: required\|max:255`, `slug: unique:pages`, `content: nullable` |
| `edit(Page $page)` | Форма редактирования | — |
| `update(Request, Page $page)` | Обновить страницу | `title: required\|max:255`, `slug: unique:pages,slug,{id}`, `content: nullable` |
| `destroy(Page $page)` | Удалить страницу | — |

> Slug генерируется автоматически из заголовка через `Str::slug()`, если не указан.

---

### `Admin\TariffController`

**Файл:** `app/Http/Controllers/Admin/TariffController.php`

| Метод | Описание |
|---|---|
| `index()` | Список тарифов, отсортированных по `sort_order` |
| `create()` | Форма создания |
| `store(Request)` | Сохранить тариф; `sort_order` = `max(sort_order) + 1` если не указан |
| `update(Request, Tariff)` | Обновить тариф |
| `destroy(Tariff)` | Удалить тариф |

---

### `Admin\LicenseController`

**Файл:** `app/Http/Controllers/Admin/LicenseController.php`

| Метод | Описание |
|---|---|
| `index()` | Список лицензий |
| `store(Request)` | Загрузить изображение лицензии; хранится в `storage/app/public/licenses/` |
| `destroy(License)` | Удалить лицензию и её файл с диска |

**Валидация загружаемого файла:** `image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120` (5 МБ).

---

### `Admin\ContactRequestController`

**Файл:** `app/Http/Controllers/Admin/ContactRequestController.php`

| Метод | Описание |
|---|---|
| `index()` | Список заявок (desc по дате создания) |
| `update(Request, ContactRequest)` | Изменить статус заявки. Допустимые значения: `new`, `processed` |
| `destroy(ContactRequest)` | Удалить заявку |

---

### `Admin\ContactSettingController`

**Файл:** `app/Http/Controllers/Admin/ContactSettingController.php`

| Метод | Описание |
|---|---|
| `edit()` | Загрузить все настройки сайта и уведомлений из БД |
| `update(Request)` | Сохранить настройки через `Setting::updateOrCreate()` |

Настройки сохраняются поштучно для каждого ключа. Если загружено изображение `solution_image` — оно сохраняется в `storage/app/public/settings/` и путь записывается в БД.

---

### `ProfileController`

**Файл:** `app/Http/Controllers/ProfileController.php`  
Стандартный контроллер Laravel Breeze для управления профилем пользователя.

---

## 8. Services

### `TelegramNotificationService`

**Файл:** `app/Services/TelegramNotificationService.php`  
**Пространство имён:** `App\Services`

#### Метод `sendMessage()`

```php
public static function sendMessage(string $token, string $chatId, string $text): bool
```

**Параметры:**

| Параметр | Тип | Описание |
|---|---|---|
| `$token` | string | Bot API Token (получить у @BotFather в Telegram) |
| `$chatId` | string | ID чата или канала (@имя или числовой ID) |
| `$text` | string | HTML-разметка сообщения (теги `<b>`, `<i>`, `<code>`) |

**Возвращает:** `bool` — `true` при успехе, `false` при ошибке.

**Принцип работы:**
1. Делает `POST`-запрос к `https://api.telegram.org/bot{token}/sendMessage`.
2. Передаёт параметры: `chat_id`, `text`, `parse_mode=HTML`, `disable_web_page_preview=true`.
3. При ошибке HTTP или исключении — логирует через `Log::error()` и возвращает `false`.

**Используется в:** `LandingController::contact()`

---

## 9. Mail (Mailable-классы)

### `ContactRequestNotification`

**Файл:** `app/Mail/ContactRequestNotification.php`  
**Шаблон:** `resources/views/emails/contact-request.blade.php`

**Конструктор:** принимает объект `$contactRequest` (модель `ContactRequest`).

**Тема письма:** `Новая заявка с сайта FIREBLOCK SOLUTION`

**Формат:** Markdown (Blade `@component('mail::message')`). Шаблон отображает поля: имя, телефон, email, сообщение заявки.

**Используется в:** `LandingController::contact()` через `Mail::to()->send()`.

---

## 10. Middleware

### `HandleInertiaRequests`

**Файл:** `app/Http/Middleware/HandleInertiaRequests.php`

Передаёт в каждый Inertia-ответ общие (shared) данные:

| Ключ | Данные | Описание |
|---|---|---|
| `auth.user` | `Request::user()` | Текущий авторизованный пользователь |
| `settings` | `Setting::pluck('value', 'key')` | Настройки сайта: `contact_email`, `contact_phone`, `contact_address`, `contact_map_iframe`, `cookie_text`, `solution_text`, `solution_image` |

Эти данные доступны во **всех** React-компонентах через хук `usePage().props`.

---

### `SecurityHeaders`

**Файл:** `app/Http/Middleware/SecurityHeaders.php`

Добавляет HTTP-заголовки безопасности ко всем ответам:

| Заголовок | Значение | Защита от |
|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | Clickjacking |
| `X-XSS-Protection` | `1; mode=block` | XSS (устаревшие браузеры) |
| `X-Content-Type-Options` | `nosniff` | MIME-sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Утечка Referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Несанкционированный доступ к API устройств |

Зарегистрирован в `bootstrap/app.php` как глобальный web-middleware.

---

## 11. Frontend: React-компоненты (Inertia.js)

Все страницы — SPA на React, маршрутизация — Inertia.js (без REST API).

### Страницы (`resources/js/Pages/`)

| Файл | Маршрут | Props | Описание |
|---|---|---|---|
| `Landing.jsx` | `/` | `settings` (shared) | Главная: hero, блок решения, возможности, демо-вставка, тарифы, контакты |
| `About.jsx` | `/about` | `licenses` | О компании: hero, статистика, команда, юридический аккордеон, лицензии |
| `Features.jsx` | `/features` | — | Возможности платформы |
| `Demo.jsx` | `/demo` | — | Интерактивная демонстрация: интерактивная карта, табы с компонентами |
| `Pricing.jsx` | `/pricing` | `tariffs` | Тарифные планы |
| `Policy.jsx` | `/{slug}` | `page` | Динамическая страница (полит. конфид., условия) |
| `Dashboard.jsx` | `/admin/dashboard` | — | Главная панели администратора |
| `Admin/Pages/Index.jsx` | `/admin/pages` | `pages` | Список страниц |
| `Admin/Pages/Create.jsx` | `/admin/pages/create` | — | Создание страницы (TinyMCE) |
| `Admin/Pages/Edit.jsx` | `/admin/pages/{id}/edit` | `page` | Редактирование страницы (TinyMCE) |
| `Admin/Licenses/Index.jsx` | `/admin/licenses` | `licenses` | Управление лицензиями (загрузка/удаление) |
| `Admin/ContactRequests/Index.jsx` | `/admin/contact-requests` | `requests` | Просмотр заявок, смена статуса |
| `Admin/Tariffs/Index.jsx` | `/admin/tariffs` | `tariffs` | Список тарифов |
| `Admin/Tariffs/Create.jsx` | `/admin/tariffs/create` | — | Создание тарифа |
| `Admin/Tariffs/Edit.jsx` | `/admin/tariffs/{id}/edit` | `tariff` | Редактирование тарифа |
| `Admin/ContactSettings/Edit.jsx` | `/admin/contact-settings` | `settings` | Настройки сайта и уведомлений |

---

### Компоненты (`resources/js/Components/`)

| Компонент | Описание |
|---|---|
| `Header.jsx` | Навигационная шапка (адаптивная, с меню для мобильных) |
| `Footer.jsx` | Подвал с контактами и ссылками |
| `ContactForm.jsx` | Форма обратной связи (name, phone, email, message, checkbox); POST `/contact` |
| `ContactModal.jsx` | Модальное окно с формой обратной связи |
| `CookieConsent.jsx` | Уведомление о cookies (текст из `settings.cookie_text`) |
| `Admin/TinyEditor.jsx` | Обёртка над `@tinymce/tinymce-react` для редактирования HTML-контента |

### Общие данные через `usePage().props`

Доступны во **всех** компонентах без передачи через props:

```js
const { auth, settings } = usePage().props;
// auth.user — текущий пользователь (null, если не авторизован)
// settings.contact_email, settings.contact_phone, и т.д.
```

---

## 12. Аутентификация

Построена на **Laravel Breeze** (пакет):

- Email + пароль.
- Подтверждение email (`verified` middleware).
- Сброс пароля через письмо.
- Сессионная авторизация (cookies).

Все маршруты `/admin/*` защищены двойным middleware: `auth` + `verified`.

---

## 13. Безопасность

| Угроза | Мера защиты |
|---|---|
| **CSRF** | Автоматически: Laravel + Inertia на всех POST/PUT/DELETE |
| **SQL-инъекции** | Eloquent ORM — нет сырого SQL |
| **XSS** | `strip_tags()` в `LandingController::contact()` перед сохранением; `dangerouslySetInnerHTML` только для admin-контента |
| **Mass-assignment** | Все модели используют `$fillable` |
| **Брутфорс форм** | `throttle:5,1` на маршруте `POST /contact` |
| **Clickjacking** | `X-Frame-Options: SAMEORIGIN` через `SecurityHeaders` |
| **MIME-sniffing** | `X-Content-Type-Options: nosniff` через `SecurityHeaders` |
| **Загрузка файлов** | Валидация MIME-типов (`mimes:`) + ограничение размера (5 МБ) |
| **Доступ к админке** | Middleware `auth` + `verified` на всех `/admin/*` маршрутах |
| **Пароли** | Bcrypt через Laravel cast `'password' => 'hashed'` |

---

## 14. Деплой и сборка

### Локальная разработка

```bash
# 1. Установка зависимостей
composer install
npm install

# 2. Настройка окружения
cp .env.example .env
php artisan key:generate

# 3. Запуск миграций с сидерами
php artisan migrate --seed

# 4. Создать символическую ссылку storage
php artisan storage:link

# 5. Запуск серверов
php artisan serve           # http://localhost:8000
npm run dev                 # Vite dev server с hot-reload
```

### Продакшн

```bash
# Сборка фронтенда
npm run build

# Оптимизация Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# При обновлении БД
php artisan migrate --force
```

### Очистка кэша

```bash
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```
