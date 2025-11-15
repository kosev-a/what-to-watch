<?php

namespace App\Http\Responses;

class Success extends Base
{
    /**
     * Summary of makeResponseData
     * @return array|null}
     */
    protected function makeResponseData(): ?array
    {
        return $this->data ? [
            'data' => $this->prepareData(),
        ] : null;
    }
}
