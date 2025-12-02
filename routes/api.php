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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])
    ->name('login');
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'show']);
Route::patch('/user', [UserController::class, 'update']);

Route::apiResource('films', FilmController::class);
Route::get('/films/{id}/comments', [FilmController::class, 'show']);

Route::apiResource('genres', GenreController::class);

Route::apiResource('favorites', FavoriteController::class);

Route::get('/films/{id}/similar', [SimilarFilmController::class, 'index']);

Route::post('/films/{id}/comments', [CommentController::class, 'store'])
    ->middleware('auth:sanctum');
Route::get('/comments/{id}', [CommentController::class, 'show'])
    ->middleware('auth:sanctum');
Route::patch('/comments/{id}', [CommentController::class, 'update'])
    ->middleware('auth:sanctum');

Route::get('/promo', [PromoController::class,'show']);
Route::post('/promo/{id}', [PromoController::class, 'set']);