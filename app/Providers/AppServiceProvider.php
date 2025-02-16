<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Vite::prefetch(concurrency: 3);

        // Share authentication data globally with Inertia
        Inertia::share([
            'auth' => function () {
                if (Auth::check()) {
                    $user = Auth::user();
                    return [
                        'user' => $user,
                        'user_role' => $user->user_role,
                        'sidebar' => $this->getSidebarForRole($user->user_role),
                    ];
                }
                return null;
            }
        ]);
    }

    /**
     * Get the sidebar menu based on user role
     */
    private function getSidebarForRole($role)
    {
        $menus = [
            'admin' => [
                ['name' => 'Dashboard', 'path' => '/admin/dashboard'],
                ['name' => 'Users', 'path' => '/admin/users'],
            ],
            'program_head' => [
                ['name' => 'Dashboard', 'path' => '/program/dashboard'],
                ['name' => 'Courses', 'path' => '/program/courses'],
            ],
            'evaluator' => [
                ['name' => 'Evaluate Students', 'path' => '/evaluator/evaluate'],
            ],
            'registrar' => [
                ['name' => 'Dashboard', 'path' => '/registrar/dashboard'],
                ['name' => 'Enrollment', 'path' => '/registrar/enrollment'],
            ],
        ];

        return $menus[$role] ?? [];
    }
}
