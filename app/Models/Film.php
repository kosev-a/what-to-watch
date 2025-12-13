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

    public const STATUS_PENDING = 'pending';
    public const STATUS_ON_MODERATION = 'moderate';
    public const STATUS_READY = 'ready';
    
    protected $fillable = [
        "imdb_id",
        "title",
        "poster_image",
        "preview_image",
        "background_image",
        "background_color",
        "director",
        "run_time",
        "released",
        "video_link",
        "preview_video_link",
        "is_promo",
        "status"
    ];

    // public function comments(): HasMany
    // {
    //     return $this->hasMany(Comment::class);
    // }

    // отношение рейтинг
    // public function rating(): HasMany
    // {
    //     return $this->hasMany(User::class, 'rating', 'film_id', 'user_id')
    //         ->withPivot('rating')
    //         ->withTimestamps();
    // }

    // отношение комментарии
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // отношение жанры
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class);
    }

    public function actors(): BelongsToMany
    {
        return $this->belongsToMany(Actor::class);
    }

    // отношение избранное
    public function favoriteFilm(): HasMany
    {
        return $this->hasMany(User::class, 'favorite_films', 'film_id', 'user_id');
    }
}
