<?php

namespace App\Http\Controllers\Enrollment\ClassScheduling;

use App\Http\Controllers\Controller;
use App\Models\SchoolYear;
use App\Models\YearSection;
use App\Models\YearSectionSubjects;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EnrollmentClassSchedulingController extends Controller
{
    public function viewRoomSchedules()
    {
        return Inertia::render('Enrollment/ClassScheduling/RoomsSchedules');
    }

    public function viewFacultySchedules()
    {
        return Inertia::render('Enrollment/ClassScheduling/FacultiesSchedules');
    }

    public function viewSubjectSchedules()
    {
        return Inertia::render('Enrollment/ClassScheduling/SubjectsSchedules');
    }

    public function enrollmentGetClasses(Request $request)
    {
        $classes = YearSectionSubjects::where('year_section_id', '=', $request->yearSectionId)
            ->with('Instructor.InstructorInfo')
            ->with('Room')
            ->with('Subject')
            ->with('SecondarySchedule.Room')
            ->get();

        return response([
            'classes' => $classes
        ]);
    }

    private function getPreparingOrOngoingSchoolYear()
    {
        $today = Carbon::now(); // Get today's date
        $twoWeeksBeforeToday = $today->copy()->subWeeks(2); // 2 weeks before today, stored separately
        $twoWeeksAfterToday = $today->copy()->addWeeks(2); // 2 weeks after today, stored separately

        // Check if enrollment preparation is within 2 weeks before today and today
        $enrollmentPreparation = SchoolYear::whereDate('start_date', '>=', $today->toDateString())
            ->whereDate('start_date', '<=', $twoWeeksAfterToday->toDateString())
            ->first();

        // Check if enrollment is ongoing (start_date <= today <= end_date)
        $enrollmentOngoing = SchoolYear::whereDate('start_date', '<=', $today)
            ->whereDate('end_date', '>=', $today)
            ->first();

        $schoolYear = null;
        $status = null;
        $preparation = false;

        // Determine the status and set the school year accordingly
        if ($enrollmentOngoing) {
            // If enrollment is ongoing, set preparation to false
            $status = 'ongoing';
            $schoolYear = $enrollmentOngoing;
            $preparation = false;
        } elseif ($enrollmentPreparation) {
            // If enrollment is in preparation, set status to preparing
            $status = 'preparing';
            $schoolYear = $enrollmentPreparation;
            $preparation = true;
        } else {
            // No enrollment preparation or ongoing, set status to false
            $status = false;
        }

        // Return status, preparation, and school year
        return [
            'status' => $status,
            'preparation' => $preparation,
            'school_year' => $schoolYear
        ];
    }
}
