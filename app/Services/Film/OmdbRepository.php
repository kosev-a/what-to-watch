<?php

namespace App\Services\Film;
use \Psr\Http\Client\ClientInterface;
use \GuzzleHttp\Psr7\HttpFactory;

class OmdbRepository implements ImportRepository
{
    public function __construct(private ClientInterface $httpClient)
    {
    }

    /**
     * @inheritDoc
     */
    public function getFilm(string $imdbId): ?array
    {
        $response = $this->httpClient->sendRequest($this->createRequest(imdbId: $imdbId));

        return json_decode($response->getBody()->getContents(), true);
    }

    private function createRequest(string $imdbId)
    {
        $api = 'http://www.omdbapi.com/?apikey=66c75d3';
        return (new HttpFactory())->createRequest('get', "$api&i=$imdbId");
    }
}
