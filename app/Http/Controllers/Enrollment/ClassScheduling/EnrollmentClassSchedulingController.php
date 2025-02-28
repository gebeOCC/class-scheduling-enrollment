<?php

namespace App\Http\Controllers\Enrollment\ClassScheduling;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EnrollmentClassSchedulingController extends Controller
{
    public function viewRoomSchedules (){
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
}
