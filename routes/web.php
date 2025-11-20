<?php

use Illuminate\Support\Facades\Route;

Route::view('/{path?}', 'home')
    ->where('path', '.*');
