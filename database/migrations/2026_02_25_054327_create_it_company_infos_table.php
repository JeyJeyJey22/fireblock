<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('it_company_infos', function (Blueprint $table) {
            $table->id();
            // Реквизиты
            $table->string('full_name')->default('ГК «КАСКА»');
            $table->string('address');
            $table->string('inn', 12);
            $table->string('ogrn', 15);
            $table->string('main_okved');
            
            // Контакты
            $table->string('phone')->default('+7 929 933 08 00');
            $table->string('email')->default('ves@kaska01.ru');
            
            // Специфично для Минцифры
            $table->json('it_accreditation_codes')->nullable(); // Коды видов деятельности
            $table->text('software_description')->nullable(); // Сведения о продуктах
            $table->text('pricing_info')->nullable(); // Тарифообразование
            $table->text('intellectual_property')->nullable(); // Исключительные права и реестр
            $table->json('tech_stack')->nullable(); // Стек технологий
            $table->boolean('has_ofd_permission')->default(false); // Фискальные данные
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('it_company_infos');
    }
};
