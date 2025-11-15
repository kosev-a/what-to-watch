<?php

namespace App\Http\Controllers;

use App\Http\Responses\Success;

abstract class Controller
{
    protected function success($data, ?int $code = Response::HTTP_OK)
    {
        return new Success($data, $code);
    }
}
