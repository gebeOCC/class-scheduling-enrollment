import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EnrollStudent() {
    return (
        <div>EnrollStudent</div>
    )

}

EnrollStudent.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;