<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genre extends Model
{
    protected $fillable = [
        "name"
    ];

    public $timestamps = FALSE;

    // отношение жанры
    public function films(): BelongsToMany
    {
        return $this->belongsToMany(Film::class);
    }

}
