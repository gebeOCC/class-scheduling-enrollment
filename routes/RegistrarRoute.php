<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Enrollment\EnrollmentCourseSectionController;

Route::middleware(['auth', 'registrar'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/enrollment/{id}', [EnrollmentCourseSectionController::class, 'view'])->name('enrollment.view');
    Route::get('/get/enrollment/course/section/{id}', [EnrollmentCourseSectionController::class, 'getEnrollmentCourseSections'])->name('get.enrollment.course.section');
});
