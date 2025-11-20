<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Comment;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // public function comments(): HasMany
    // {
    //     return $this->hasMany(Comment::class);
    // }

    // public function favoriteFilm(): HasMany
    // {
    //     return $this->hasMany(FavoriteFilm::class);
    // }

    //отношение рейтинг
    public function rating() : HasMany 
    {
        return $this->hasMany(Film::class, 'raing', 'user_id', 'film_id')
            ->withPivot('rating')
            ->withTimestamps();
    }

    //отношение комментарии
    public function comments() : HasMany 
    {
        return $this->hasMany(Film::class, 'comments', 'user_id', 'film_id')
            ->withPivot('comment')
            ->withTimestamps();
    }

        // отношение избранное
    public function favoriteFilm(): HasMany
    {
        return $this->hasMany(Film::class, 'favorite_films', 'user_id', 'film_id');
    }
}