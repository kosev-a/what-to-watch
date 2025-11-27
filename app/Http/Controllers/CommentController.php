<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Auth;

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

    // /**
    //  * Display the specified resource.
    //  */
    // public function show(string $id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
