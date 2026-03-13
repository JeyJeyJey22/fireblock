@component('mail::message')
# Новая заявка с сайта FIREBLOCK SOLUTION

Получена новая заявка через форму обратной связи.

**Имя:** {{ $contactRequest->name }}

@if($contactRequest->phone)
**Телефон:** {{ $contactRequest->phone }}
@endif

@if($contactRequest->email)
**Email:** {{ $contactRequest->email }}
@endif

@if($contactRequest->message)
**Сообщение:**
{{ $contactRequest->message }}
@endif

@component('mail::button', ['url' => config('app.url') . '/admin/contact-requests'])
Перейти в панель администратора
@endcomponent

С уважением,<br>
Автоматическая система уведомлений {{ config('app.name') }}
@endcomponent
