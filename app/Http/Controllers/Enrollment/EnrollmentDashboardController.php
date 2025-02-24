<?php

namespace App\Http\Controllers\Enrollment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentDashboardController extends Controller
{
    public function view(){
        return Inertia::render('Enrollment/Dashboard');
    }
}
