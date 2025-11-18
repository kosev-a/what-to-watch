<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genre extends Model
{
//     public function films(): HasMany
//     {
//         return $this->hasMany(Film::class);
//     }

    public $timestamps = FALSE;

    // отношение жанры
    public function films(): HasMany
    {
        return $this->hasMany(Film::class)
            ->withPivot('name');
    }

}
