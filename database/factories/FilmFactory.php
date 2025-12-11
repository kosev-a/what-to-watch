<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Film;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Film>
 */
class FilmFactory extends Factory
{
    protected $model = Film::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "imdb_id" => $this->faker->uuid,
            "title" => $this->faker->word,
            "director" => $this->faker->name,
            "run_time" => $this->faker->numberBetween(70, 250),
            "is_promo" => $this->faker->numberBetween(0, 1),
            "status" => "ready",
        ];
    }
}
