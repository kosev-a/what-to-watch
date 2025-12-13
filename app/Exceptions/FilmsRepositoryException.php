<?php

namespace App\Exceptions;

use Exception;

class FilmsRepositoryException extends Exception
{
    public function getStatusCode()
    {
        return 500;
    }
}
