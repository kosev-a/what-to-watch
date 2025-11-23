<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * Summary of register
     *
     * @return \App\Http\Responses\Success
     */
    public function register(UserRequest $request): Responsable
    {
        $params = $request->safe()->except('file');

        $file = $request->file('image');

        if ($file) {
            // Сохраняем файл в папку storage/app/public/images
            $path = $file->store('images', 'public');

            // $path будет содержать полный путь к файлу, например "images/filename.jpg"

            // Можно также сохранить файл, используя его оригинальное имя
            // $path = $file->storeAs('images', $file->getClientOriginalName(), 'public');

            // Теперь можно сохранить путь $path в базе данных или выполнить другие действия
            $params['avatar_path'] = $path;
        }

        $user = User::create($params);
        $token = $user->createToken('auth-token');
        $name = $user->name;
        $avatar = $user->avatar_path;

        return $this->success([
            'user' => $user,
            'token' => $token->plainTextToken,
            'name'=> $name,
            'avatar' => $avatar,
        ], 201);
    }

    /**
     * Summary of login
     *
     * @return \App\Http\Responses\Success
     */
    public function login(LoginRequest $request): Responsable
    {
        if (! Auth::attempt($request->validated())) {
            abort(401, trans('auth.failed'));
        }

        $token = Auth::user()->createToken('auth-token');
        $name = Auth::user()->name;
        $avatar = Auth::user()->avatar_path;

        return $this->success(['token' => $token->plainTextToken, 'name' => $name, 'avatar' => $avatar]);

    }

    /**
     * Summary of logout
     * @return \App\Http\Responses\Success
     */
    public function logout(): Responsable
    {
        Auth::user()->tokens()->delete();

        return $this->success(null, 204);
    }
}
