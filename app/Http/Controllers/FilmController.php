<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddFilmRequest;
use App\Http\Requests\EditFilmRequest;
use App\Http\Resources\FilmResource;
use App\Http\Resources\ModerateFilmCollection;
use App\Http\Resources\EditFilmResource;
// use App\Http\Resources\ModerateFilmResource;
use App\Models\Film;
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
        // $params = $request->safe()->except('background_image');
        $film = Film::findOrFail($id);
        Debugbar::info($request);
        // $film = Film::first($id);

        // $file = $request->file('backgroundImage');

        // $film->imdb_id = $params['imdbId'];
        // $film->title = $params['title'];
        
        // if($params['posterImage']) {
        //     $film->poster_image = $params['posterImage'];
        // }
        
        // if($params['previewImage']) {
        //     $film->preview_image = $params['previewImage'];
        // }
        
        // if($params['background_color']) {
        //     $film->preview_image = $params['previewImage'];
        // }
            
            // 'background_image' => ['string', 'max:255'],
            // 'background_color' => ['string', 'max:9'],
            // 'director' => ['string', 'max:255'],
            // 'run_time' => ['int'],
            // 'released' => ['int'],
            // 'video_link' => ['string', 'max:255'],
            // 'preview_video_link' => ['string', 'max:255'],
            // 'description' => ['string', 'max:1000'],
            // 'isPromo' => ['boolean'],
            // 'actors' => ['array'],
            // 'genres' => ['array'],
            // 'status' => ['required', Rule::enum(FilmStatusEnum::class)],

        // if ($file) {
        //     $path = $file->store('images', 'public');
        //     $user->avatar_path = $path;
        // }

        // $film->save();

        // return $this->success([
        //     'film' => $film,
        // ], 200);
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
