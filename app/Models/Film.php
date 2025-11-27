<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Film extends Model
{
    use HasFactory;
    protected $fillable = [
        "imdbid",
        "name",
        "poster_image",
        "preview_image",
        "background_image",
        "background_color",
        "director",
        "run_time",
        "released",
        "video_link",
        "preview_video_link",
        "isPromo",
        "status"
    ];

    public function actor(): HasMany
    {
        return $this->hasMany(Actor::class);
    }

    // public function comments(): HasMany
    // {
    //     return $this->hasMany(Comment::class);
    // }

    // отношение рейтинг
    public function rating(): HasMany
    {
        return $this->hasMany(User::class, 'rating', 'film_id', 'user_id')
            ->withPivot('rating')
            ->withTimestamps();
    }

    // отношение комментарии
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // отношение жанры
    public function genres(): HasMany
    {
        return $this->hasMany(Genre::class)
            ->withPivot('name');
    }

    // отношение избранное
    public function favoriteFilm(): HasMany
    {
        return $this->hasMany(User::class, 'favorite_films', 'film_id', 'user_id');
    }
}
