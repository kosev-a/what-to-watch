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
        Schema::create("actor_film", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->foreignId("film_id")->nullable()->constrained("films")->cascadeOnDelete();
            $table->foreignId("actor_id")->nullable()->constrained("actors")->cascadeOnDelete();
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
