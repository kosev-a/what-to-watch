<?php

namespace App\Enums;

enum FilmStatusEnum: string
{
    case Pending = 'pending';
    case Moderate = 'moderate';
    case Ready = 'ready';
}
