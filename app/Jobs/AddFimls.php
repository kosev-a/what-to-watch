<?php

namespace App\Jobs;

use App\Models\Film;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class AddFimls implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Film::where('status', Film::STATUS_PENDING)->chunk(1000, function ($films) {
            /** @var Film $film */
            foreach ($films as $film) {
                AddFilm::dispatch($film);
            }
        });
    }
}
