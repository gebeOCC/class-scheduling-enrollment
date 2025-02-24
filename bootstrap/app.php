<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'faculty' => \App\Http\Middleware\Faculty::class,
            'student' => \App\Http\Middleware\Student::class,
            'program_head' => \App\Http\Middleware\ProgramHead::class,
            'registrar' => \App\Http\Middleware\Registrar::class,
            'EnrollmentPrepOngoing' => \App\Http\Middleware\EnrollmentStatus::class,
        ]);
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
