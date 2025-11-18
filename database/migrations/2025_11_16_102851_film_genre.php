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
        Schema::create("film_genre", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId("film_id")->nullable()->constrained("films")->cascadeOnDelete();
            $table->foreignId("genre_id")->nullable()->constrained("genres")->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
