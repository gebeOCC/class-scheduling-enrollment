<?php

use App\Http\Controllers\Curriculum\CurriculumController;
use App\Http\Controllers\Enrollment\ClassScheduling\EnrollmentClassSchedulingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Enrollment\EnrollmentCourseSectionController;
use App\Http\Controllers\Enrollment\EnrollmentDashboardController;

Route::middleware(['auth', 'program_head'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['EnrollmentPrepOngoing'])->group(function () {
        Route::get('/enrollment/{id}', [EnrollmentCourseSectionController::class, 'view'])->name('enrollment.view');
        Route::post('/enrollment/{id}', [EnrollmentCourseSectionController::class, 'getEnrollmentCourseSections'])->name('get.enrollment.course.section');
        Route::post('api/add/new/section', [EnrollmentCourseSectionController::class, 'addNewSection'])->name('add.new.section');

        Route::get('/enrollment/{id}/class/{yearlevel}', [EnrollmentCourseSectionController::class, 'viewClass'])->name('enrollment.view.class');

        Route::get('/enrollment/{id}/students/{yearlevel}', [EnrollmentCourseSectionController::class, 'viewStudents'])->name('enrollment.view.students');

        Route::get('/enrollment/{id}/enroll-student/{yearlevel}', [EnrollmentCourseSectionController::class, 'enrollStudent'])->name('enrollment.view.enroll-student');

        Route::get('/dashboard', [EnrollmentDashboardController::class, 'view'])->name('dashboard');

        Route::get('/rooms-schedules', [EnrollmentClassSchedulingController::class, 'viewRoomSchedules'])->name('room-schedules');

        Route::get('/faculties-schedules', [EnrollmentClassSchedulingController::class, 'viewFacultySchedules'])->name('faculties-schedules');

        Route::get('/subjects-schedules', [EnrollmentClassSchedulingController::class, 'viewSubjectSchedules'])->name('subjects-schedules');

        Route::get('/curriculum', [CurriculumController::class, 'view'])->name('curriculum');
        Route::post('/curriculum', [CurriculumController::class, 'getCoursesCurriculum'])->name('courses.curriculum.list');
        Route::get('/curriculum/{courseId}/{schoolYear}', [CurriculumController::class, 'CurriculumInfoView'])->name('curriculum.info.view');
        Route::post('/curriculum/{courseId}/{schoolYear}', [CurriculumController::class, 'getCurriculumInfo'])->name('curriculum.info');
        Route::post('/api/addSemester', [CurriculumController::class, 'addSemester'])->name('add.semester');
    });
});
