<?php

namespace App\Services\Film;

class FilmService
{
    public function __construct(private ImportRepository $repository)
    {
    }

    public function requestFilm(string $imdbId): array
    {
        return $this->repository->getFilm(imdbId: $imdbId);
    }
}