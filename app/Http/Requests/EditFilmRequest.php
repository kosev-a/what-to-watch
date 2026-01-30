<?php

namespace App\Http\Requests;

use App\Enums\FilmStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class EditFilmRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    protected function prepareForValidation()
    {
        if ($this->has('payload')) {
            $this->merge(json_decode($this->payload, true));
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $filmId = $this->route('id');

        return [
            'id' => ['required', 'int', 'unique:films,id,'.$filmId],
            'imdbId' => ['required', 'string', 'unique:films,imdb_id,'.$filmId.',id'],
            'title' => ['required', 'string', 'max:255'],
            'posterImage' => ['string', 'max:255'],
            'previewImage' => ['string', 'max:255'],
            'backgroundImage' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:10240'],
            'backgroundColor' => ['string', 'max:9'],
            'director' => ['string', 'max:255'],
            'runTime' => ['int'],
            'released' => ['int'],
            'videoLink' => ['string', 'max:255'],
            'previewVideoLink' => ['string', 'max:255'],
            'description' => ['string', 'max:1000'],
            'isPromo' => ['boolean'],
            'actors' => ['array'],
            'genres' => ['array'],
            'status' => ['required', Rule::enum(FilmStatusEnum::class)],
        ];
    }
}
