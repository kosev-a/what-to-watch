<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Barryvdh\Debugbar\Facade as Debugbar;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Gate::define('delete-comment', function (User $user, Comment $comment) {
            // if ($user->is_admin) {
            //     return true;
            // }
            // Debugbar::info($user->id);
            // return $user->id === $comment->user_id;
            // return true;
        // });

    }
}
