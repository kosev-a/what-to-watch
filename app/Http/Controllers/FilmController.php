<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddFilmRequest;
use App\Http\Resources\FilmResource;
use App\Http\Resources\ModerateFilmCollection;
// use App\Http\Resources\ModerateFilmResource;
use App\Models\Film;
use Barryvdh\Debugbar\Facade as Debugbar;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

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

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  */
    // public function destroy(string $id)
    // {
    //     //
    // }

    // public function getComments(int $id)
    // {
        // $film = Film::find($id);

        // $comments = $film->comments->toArray();

        // // return $comments;
        // return response()->json($comments);
    // }

    public function getModeration()
    {
        $films = Film::get()->where('status', 'moderate');
        
        return new ModerateFilmCollection($films);
    }
}
