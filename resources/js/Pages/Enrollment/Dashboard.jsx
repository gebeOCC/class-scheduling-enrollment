import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard() {
    return (
        <div>Enrollment Dashboard</div>
    )
}

Dashboard.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;