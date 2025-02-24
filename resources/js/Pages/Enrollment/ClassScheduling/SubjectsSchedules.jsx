import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SubjectsSchedules() {
    return (
        <div>SubjectsSchedules</div>
    )
}


SubjectsSchedules.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;