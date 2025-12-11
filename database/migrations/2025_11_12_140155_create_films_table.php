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
        Schema::create('films', function (Blueprint $table) {
            $table->id();
            $table->string('imdb_id')->unique();
            $table->string('title')->nullable();
            $table->string('poster_image')->nullable();
            $table->string('preview_image')->nullable();
            $table->string('background_image')->nullable();
            $table->string('background_color')->default('#fff');
            $table->integer('scores_count')->default(0);
            $table->string('director')->nullable();
            $table->integer('run_time')->nullable();
            $table->integer('released')->nullable();
            $table->string('video_link')->nullable();
            $table->string('preview_video_link')->nullable();
            $table->boolean('is_promo')->default(false);
            $table->enum('status', ['pending', 'moderate', 'ready'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('films');
    }
};
