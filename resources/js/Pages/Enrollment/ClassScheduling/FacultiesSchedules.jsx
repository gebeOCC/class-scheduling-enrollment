import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function FacultySchedules() {
    return (
        <div>FacultySchedules</div>
    )
}

FacultySchedules.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;