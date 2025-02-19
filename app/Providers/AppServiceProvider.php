<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\UserInformation;
use Illuminate\Support\Facades\DB;
use App\Models\Course;

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
                        'sidebar' => $this->EnrollmentStatus($user),
                    ];
                }
                return null;
            }
        ]);
    }

    /**
     * Get the sidebar menu based on user role
     */
    private function EnrollmentStatus($user)
    {
        // Get preparing or ongoing school year status and school year
        $schoolYearStatus = getPreparingOrOngoingSchoolYear();

        $schoolYear = [];
        $enrollmentPreparation = false;
        $enrollmentOngoing = false;

        if ($schoolYearStatus['status'] && $schoolYearStatus['school_year']) {
            // If the status is true (either preparing or ongoing), assign the school year
            $schoolYear = $schoolYearStatus['school_year'];

            // Set flags for enrollment preparation and ongoing based on the status
            if ($schoolYearStatus['status'] == 'preparing') {
                $enrollmentPreparation = true;
            } elseif ($schoolYearStatus['status'] == 'ongoing') {
                $enrollmentOngoing = true;
            }
        }

        $courses = [];

        if (($user->user_rule == 'program_head' || $user->user_rule == 'evaluator') && ($enrollmentOngoing || $enrollmentPreparation)) {
            // Fetch courses for program_head or evaluator role when enrollment is preparing or ongoing
            $courses = DB::table('course')
                ->select(DB::raw("MD5(course.id) as hashed_course_id, course_name, course_name_abbreviation"))
                ->join('department', 'course.department_id', '=', 'department.id')
                ->join('faculty', 'faculty.department_id', '=', 'department.id')
                ->join('users', 'faculty.faculty_id', '=', 'users.id')
                ->where('users.id', '=', $user->id)
                ->get();
        } elseif ($user->user_rule == 'registrar' && ($enrollmentPreparation || $enrollmentOngoing)) {
            // Fetch all courses for registrar when enrollment is preparing or ongoing
            $courses = Course::select(DB::raw("MD5(course.id) as hashed_course_id, course_name, course_name_abbreviation"))
                ->get();
        }

        $firstName = UserInformation::where('user_id', '=', $user->id)
            ->first()->first_name;

        return response([
            'message' => 'success',
            'enrollmentOngoing' => $enrollmentOngoing,
            'preparation' => $enrollmentPreparation,
            'courses' => $courses,
            'schoolYear' => $schoolYear,
            'firstName' => $firstName,
            'passwordChange' => $user->password_change,
        ]);
    }
}
