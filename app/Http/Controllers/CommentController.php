<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facade as Debugbar;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request): Responsable
    {
        $params = [
            "user_id" => Auth::user()->id,
            "film_id" => $request->input("filmId"),
            "comment_id" => $request->input("commentId"),
            "text"=> $request->input("comment"),
            "rating"=> $request->input("rating")
        ];
        $comment = Comment::create($params);
        return $this->success([
            "comment" => $comment->id,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $comment = Comment::findOrFail($id);
        // Debugbar::info($comment);

        return response()->json(["comment" => $comment->text, "rating" => $comment->rating],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::findOrFail($id);

        $comment->update([
            "text" => $request->input("comment"),
            "rating" => $request->input("rating"),
        ]);
        Debugbar::message($comment);
        return $this->success([
            "comment" => $comment->id,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Comment::destroy($id);
        
        return response()->noContent();
    }
}
