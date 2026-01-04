<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EditProfileRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userData = User::findOrFail($id);

        return new UserResource($userData);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditProfileRequest $request)
    {
        $params = $request->safe()->except('file');
        $user = Auth::user();

        $file = $request->file('image');

        $user->name = $params['name'];
        
        $user->email = $params['email'];

        if ($params['password']) {
            $user->password = $params['password'];
        }

        if ($file) {
            $path = $file->store('images', 'public');
            $user->avatar_path = $path;
        }

        $user->save();

        return $this->success([
            'user' => $user,
        ], 200);
    }
}
