import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function EnrolledStudentList() {
    return (
        <div>EnrolledStudentList</div>
    )
}

EnrolledStudentList.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;