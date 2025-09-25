<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('knowledge_files', function (Blueprint $table) {
            // Índice para acelerar filtros por categoría
            $table->index('category_id', 'knowledge_files_category_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('knowledge_files', function (Blueprint $table) {
            $table->dropIndex('knowledge_files_category_id_index');
        });
    }
};
