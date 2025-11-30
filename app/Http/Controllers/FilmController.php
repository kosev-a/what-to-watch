<?php

namespace App\Http\Controllers;

use App\Http\Resources\FilmResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Film;
use Illuminate\Contracts\Support\Responsable;
use Barryvdh\Debugbar\Facade as Debugbar;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return "Hello";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Загружаем фильм -> комментарии -> пользователей комментариев
        $film = Film::with("comments.user")->findOrFail($id);
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

    public function getComments(int $id)
    {
        // $film = Film::find($id);

        // $comments = $film->comments->toArray();

        // // return $comments;
        // return response()->json($comments);
    }
}
