<?php

namespace App\Services;
use App\Support\Import\FilmsRepository;

class FilmService
{
    public function __construct(private FilmsRepository $repository)
    {
    }

    public function requestFilm(string $imdbId): array
    {
        return $this->repository->getFilm(imdbId: $imdbId);
    }
}