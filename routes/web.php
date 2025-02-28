<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Enrollment\EnrollmentCourseSectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('profile.edit'); // Redirect to dashboard if authenticated
    }

    return redirect()->route('login'); // Redirect to login if unauthenticated

    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/ProgramHeadRoute.php';
require __DIR__ . '/RegistrarRoute.php';