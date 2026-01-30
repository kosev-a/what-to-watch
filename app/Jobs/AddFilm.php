<?php

namespace App\Jobs;

use App\Models\Actor;
use App\Models\Film;
use App\Models\Genre;
use App\Services\FilmService;
use App\Support\Import\FilmsRepository;
use App\Exceptions\FilmsRepositoryException;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Enums\FilmStatusEnum;
use Illuminate\Support\Facades\Log;

class AddFilm implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Film $film) {}

    /**
     * Execute the job.
     */
    // public function handle(FilmsRepository $repository, FilmService $service): void
    public function handle(FilmsRepository $repository): void
    {
        // Получение информации
        $data = $repository->getFilm($this->film->imdb_id);

        if(empty($data)) {
            throw new FilmsRepositoryException('Отсутствуют данные для обновления');
        }

        $this->film = $data['film'];

        DB::beginTransaction();

        $genresIds = [];
        $genresArray = explode(', ', $data['genres']);
        foreach ($genresArray as $genre) {
            $genresIds[] = Genre::firstOrCreate(['name' => $genre])->id;
        }

        $actorsIds = [];
        $actorsArray = explode(', ', $data['actors']);
        foreach ($actorsArray as $actor) {
            $actorsIds[] = Actor::firstOrCreate(['name' => $actor])->id;
        }

        $this->film->status = FilmStatusEnum::Moderate;
        $this->film->save();
        $this->film->genres()->sync($genresIds);
        $this->film->actors()->sync($actorsIds);

        DB::commit();

    }
}
