<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\UserResource;

class FilmResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->id,
            "name" => $this->name,
            "poster_image" => $this->poster_image,
            "preview_image" => $this->preview_image,
            "background_image" => $this->background_image,
            "background_color" => $this->background_color,
            "scores_count" => $this->scores_count,
            "director" => $this->director,
            "run_time" => $this->run_time,
            "released" => $this->released,
            "video_link" => $this->video_link,
            "preview_video_link" => $this->preview_video_link,
            "isPromo" => $this->isPromo,
            "status" => $this->status,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
