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
        Schema::create('project_objects', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // ГБУ «Жилищник»
            $table->string('address');
            $table->decimal('safety_progress', 5, 2)->default(0); // 98.2%
            
            // Связь с ответственным лицом
            $table->foreignId('responsible_person_id')->nullable()->constrained('responsible_people')->nullOnDelete();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_objects');
    }
};
