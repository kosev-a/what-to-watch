<?php

namespace App\Support\Import;

use App\Models\Film;
use \Psr\Http\Client\ClientInterface;
use \GuzzleHttp\Psr7\HttpFactory;
use Illuminate\Support\Facades\Http;
use Barryvdh\Debugbar\Facade as Debugbar;

class OmdbFilmsRepository implements FilmsRepository
{
    // /**
    //  * @inheritDoc
    //  */
    // public function getFilm(string $imdbId): ?array
    // {
    //     $response = $this->httpClient->sendRequest($this->createRequest(imdbId: $imdbId));

    //     return json_decode($response->getBody()->getContents(), true);
    // }

    // private function createRequest(string $imdbId)
    // {
    //     $api = 'http://www.omdbapi.com/?apikey=66c75d3';
    //     return (new HttpFactory())->createRequest('get', "$api&i=$imdbId");
    // }

    /**
     * Summary of getFilm
     * @param string $imdbId
     * @return array{film: Film, genres: mixed, links: array{background_image: mixed, poster_image: mixed, preview_image: mixed, preview_video_link: mixed, video_link: mixed}|null}
     */
    public function getFilm(string $imdbId): array|null
    {
        $data = Http::get(trim(config('services.omdb.films.url'), '/') . '&i=' . $imdbId);

        Debugbar::info($data);
        if ($data->clientError()) {
            return null;
        }

        $film = Film::firstOrNew(['imdb_id' => $imdbId]);

        $film->fill([
            'title' => $data['Title'],
            'description' => $data['Plot'],
            'director' => $data['Director'],
            // 'starring' => $data['actors'],
            'run_time' => (int)$data['Runtime'],
            'released' => (int)substr($data['Released'], -4),
            // 'status' => '',
            'poster_image' => $data['Poster'],
            // 'preview_image' => $data['icon'],
            // 'background_image' => $data['background'],
            // 'video_link' => $data['video'],
            // 'preview_video_link' => $data['preview'],
        ]);

        return [
            'film' => $film,
            'genres' => $data['Genre'],
            'actors' => $data['Actors'],
        ];
    }
}
