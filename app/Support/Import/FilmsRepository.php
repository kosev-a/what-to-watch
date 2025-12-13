<?php

namespace App\Support\Import;

interface FilmsRepository
{
    /**
     * Summary of getFilm
     * @param string $imdbId
     * @return array
     */
    public function getFilm(string $imdbId): array|null;
}
