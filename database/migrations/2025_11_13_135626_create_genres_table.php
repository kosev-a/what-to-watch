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
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table
                ->enum('name', ['comedy', 'crime', 'documentory', 'drama', 'horror', 'kids_and_family', 'romance', 'sci-fi', 'thriller'])
                ->nullable();
            $table->foreignId('film_id')->constrained('films')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('genres');
    }
};
