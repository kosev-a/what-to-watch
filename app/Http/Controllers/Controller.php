<?php

namespace App\Http\Controllers;

use App\Http\Responses\Success;
use Symfony\Component\HttpFoundation\Response;

abstract class Controller
{
    /**
     * Summary of success
     * @param mixed $data
     * @param mixed $code
     * @return Success
     */
    protected function success($data, ?int $code = Response::HTTP_OK): Success
    {
        return new Success($data, $code);
    }
}
