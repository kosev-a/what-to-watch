<?php

namespace App\Services\Film;

interface ImportRepository
{
    /**
     * Summary of getFilm
     * @param string $imdbId
     * @return array|void
     */
    public function getFilm(string $imdbId): ?array;
}
