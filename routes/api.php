<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\SimilarFilmController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'registration']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/user', [UserController::class, 'show']);
Route::patch('/user', [UserController::class, 'update']);

Route::apiResource('films', FilmController::class);

Route::apiResource('genres', GenreController::class);

Route::apiResource('favorites', FavoriteController::class);

Route::get('/films/{id}/similar', [SimilarFilmController::class, 'index']);

Route::apiResource('comment', CommentController::class);

Route::get('/promo', [PromoController::class,'show']);
Route::post('/promo/{id}', [PromoController::class, 'set']);