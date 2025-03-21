<?php

use App\Http\Controllers\Enrollment\ClassScheduling\EnrollmentClassSchedulingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Enrollment\EnrollmentCourseSectionController;
use App\Http\Controllers\Enrollment\EnrollmentDashboardController;
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

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'EnrollmentPrepOngoing', 'EnrollmentPermission'])->group(function () {
    Route::get('/enrollment/{id}', [EnrollmentCourseSectionController::class, 'view'])->name('enrollment.view');
    Route::post('/enrollment/{id}', [EnrollmentCourseSectionController::class, 'getEnrollmentCourseSections'])->name('get.enrollment.course.section');
    Route::get('/enrollment/{id}/class/{yearlevel}', [EnrollmentCourseSectionController::class, 'viewClass'])->name('enrollment.view.class');
    Route::get('/dashboard', [EnrollmentDashboardController::class, 'view'])->name('dashboard');
    Route::get('/enrollment/{id}/students/{yearlevel}', [EnrollmentCourseSectionController::class, 'viewStudents'])->name('enrollment.view.students');
    Route::get('/enrollment/{id}/enroll-student/{yearlevel}', [EnrollmentCourseSectionController::class, 'enrollStudent'])->name('enrollment.view.enroll-student');
});

Route::middleware(['auth', 'EnrollmentPrepOngoing', 'program_head'])->group(function () {
    Route::post('api/add/new/section', [EnrollmentCourseSectionController::class, 'addNewSection'])->name('add.new.section');

    Route::get('/enrollment/{id}/class/{yearlevel}', [EnrollmentCourseSectionController::class, 'viewClass'])->name('enrollment.view.class');
    Route::post('/api/enrollment/get-classes', [EnrollmentClassSchedulingController::class, 'enrollmentGetClasses'])->name('enrollment.get.classes');
    Route::post('/api/enrollment/update-main-class', [EnrollmentClassSchedulingController::class, 'enrollmentUpdateMainClass'])->name('enrollment.update.main.class');
    Route::post('/api/enrollment/update-second-class', [EnrollmentClassSchedulingController::class, 'enrollmentUpdateSecondClass'])->name('enrollment.update.second.class');

    Route::get('/rooms-schedules', [EnrollmentClassSchedulingController::class, 'viewRoomSchedules'])->name('enrollment.room-schedules');
    Route::post('/api/get-enrollment-rooms-schedules', [EnrollmentClassSchedulingController::class, 'getEnrollmentRoomsSchedules'])->name('enrollment.get.enrollment.rooms.schedules');
    Route::post('/api/get-enrollment-room-schedules', [EnrollmentClassSchedulingController::class, 'getEnrollmentRoomSchedules'])->name('enrollment.get.enrollment.room.schedules');

    Route::get('/faculties-schedules', [EnrollmentClassSchedulingController::class, 'viewFacultySchedules'])->name('enrollment.faculties-schedules');
    Route::post('/api/get-enrollment-faculties-schedules', [EnrollmentClassSchedulingController::class, 'getEnrollmentFacultiesSchedules'])->name('enrollment.get.faculties-schedules');

    Route::get('/subjects-schedules', [EnrollmentClassSchedulingController::class, 'viewSubjectSchedules'])->name('enrollment.subjects-schedules');
    Route::post('/api/get-enrollment-subjects-schedules', [EnrollmentClassSchedulingController::class, 'getEnrollmentSubjectsSchedules'])->name('enrollment.get.subjects-schedules');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/ProgramHeadRoute.php';
require __DIR__ . '/RegistrarRoute.php';
