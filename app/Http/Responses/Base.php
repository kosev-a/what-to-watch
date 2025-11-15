<?php

namespace App\Http\Responses;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Arrayable;

abstract class Base implements Responsable
{
    public function __construct(
        protected mixed $data = [],
        public int $statusCode = Response::HTTP_OK,
    )
    {}

    /**
     * Summary of toResponse
     * @param Request $request
     * @return Response
     */
    public function toResponse($request): Response
    {
        return response()->json($this->makeResponseData(), $this->statusCode);
    }
    /**
     * Summary of prepareData
     * @return array
     */
    protected function prepareData(): array
    {
        if ($this->data instanceof Arrayable) {
            return $this->data->toArray();
        }

        return $this->data;
    }

    /**
     * Summary of makeResponseData
     * @return array|null
     */
    abstract protected function makeResponseData(): ?array;
}
