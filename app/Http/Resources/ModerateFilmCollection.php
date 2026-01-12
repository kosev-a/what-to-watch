<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ModerateFilmCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function($film) {
            return [
                'imdb_id' => $film->imdb_id,
                'title' =>  $film->title,
                'released' => $film->released,
            ];
        });
    }
}
