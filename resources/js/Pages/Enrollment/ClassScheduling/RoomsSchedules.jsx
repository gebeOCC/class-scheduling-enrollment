import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function RoomSchedules() {
    return (
        <div>RoomSchedules</div>
    )
}

RoomSchedules.layout = (page) => <AuthenticatedLayout>{page}</AuthenticatedLayout>;
