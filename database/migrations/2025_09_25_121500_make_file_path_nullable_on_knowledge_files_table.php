<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('knowledge_files', function (Blueprint $table) {
            // Hacer file_path nullable
            $table->string('file_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('knowledge_files', function (Blueprint $table) {

            $table->string('file_path')->nullable(false)->change();
        });
    }
};
