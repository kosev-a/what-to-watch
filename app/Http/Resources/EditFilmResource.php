<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\EditActorResource;
use App\Http\Resources\EditGenreResource;

class EditFilmResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'imdb_id'=>$this->imdb_id,
            'title' => $this->title,
            'poster_image' => $this->poster_image,
            'preview_image' => $this->preview_image,
            'background_image' => $this->background_image,
            'background_color' => $this->background_color,
            'director' => $this->director,
            'run_time' => $this->run_time,
            'released' => $this->released,
            'video_link' => $this->video_link,
            'preview_video_link' => $this->preview_video_link,
            'description' => $this->description,
            'isPromo' => $this->isPromo,
            'actors' => EditActorResource::collection($this->whenLoaded('actors')),
            'genres' => EditGenreResource::collection($this->whenLoaded('genres')),
            'status' => $this->status,
        ];
    }
}
