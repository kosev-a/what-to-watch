<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddFilmRequest;
use App\Http\Requests\EditFilmRequest;
use App\Http\Resources\FilmResource;
use App\Http\Resources\ModerateFilmCollection;
use App\Http\Resources\EditFilmResource;
use App\Enums\FilmStatusEnum;
// use App\Http\Resources\ModerateFilmResource;
use App\Models\Actor;
use App\Models\Film;
use App\Models\Genre;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Support\Import\OmdbFilmsRepository;
use Illuminate\Support\Facades\Http;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return "Hello";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AddFilmRequest $request): JsonResponse|Responsable
    {
        $validated = $request->validated();

        // Debugbar::info($validated['imdbId']);

        if ($request->user()->cannot('create', Film::class)) {

            return response()->json(['message' => 'Действие доступно только администратору'], 403);
        }

        Film::create(['imdb_id' => $validated['imdbId']]);

        return $this->success(null, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Загружаем фильм -> комментарии -> пользователей комментариев
        $film = Film::with('comments.user')->findOrFail($id);
        // Debugbar::info($film);

        return new FilmResource($film);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditFilmRequest $request, string $id)
    {
        $params = $request->safe()->except('backgroundImage');
        $file = $request->file('backgroundImage');
        Debugbar::info($file);
        $film = Film::findOrFail($id);

        $film->imdb_id = $params['imdbId'];
        $film->title = $params['title'];
        
        if($params['posterImage']) {
            $film->poster_image = $params['posterImage'];
        }
        
        if($params['previewImage']) {
            $film->preview_image = $params['previewImage'];
        }
        
        if($params['backgroundColor']) {
            $film->background_color = $params['backgroundColor'];
        }

        if($params['director']) {
            $film->director = $params['director'];
        }

        if($params['runTime']) {
            $film->run_time = $params['runTime'];
        }

        if($params['released']) {
            $film->released = $params['released'];
        }

        if($params['videoLink']) {
            $film->video_link = $params['videoLink'];
        }

        if($params['previewVideoLink']) {
            $film->preview_video_link = $params['previewVideoLink'];
        }

        if($params['description']) {
            $film->description = $params['description'];
        }
            
        $film->is_promo = $params['isPromo'];

        $film->status = $params['status'];

        if($file) {
            $path = $file->store('images/background_images', 'public');
            $film->background_image = $path;
        }

        $genresIds = [];
        $genres = $params['genres'];
        foreach ($genres as $genre) {
            $genresIds[] = Genre::firstOrCreate(['name' => $genre])->id;
        }

        $actorsIds = [];
        $actors = $params['actors'];
        foreach ($actors as $actor) {
            $actorsIds[] = Actor::firstOrCreate(['name' => $actor])->id;
        }

        $film->save();
        $film->genres()->sync($genresIds);
        $film->actors()->sync($actorsIds);

        return $this->success([
            'film' => $film,
        ], 200);
    }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }

    public function getModeration(): ModerateFilmCollection
    {
        $films = Film::whereIn('status', ['moderate', 'pending'])->get();
        
        return new ModerateFilmCollection($films);
    }

    public function getEditFilm(string $imdbId)
    {
        $film = Film::with(['actors', 'genres'])->where('imdb_id', $imdbId)->first();

        if (!$film) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return new EditFilmResource($film);
    }
}
