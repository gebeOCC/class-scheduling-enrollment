import React from 'react'

import { usePage, Link } from '@inertiajs/react';
export default function SideBar({ sidebarOpen }) {

    const { auth } = usePage().props; // Get user data from Inertia
    const sidebarItems = auth?.sidebar || [];
    return (
        <aside className={`h-full fixed top-0 left-0 z-50  md:h-auto md:static bg-[#3e5c76] text-white flex-shrink-0 flex-col justify-between lg:block transition-all duration-200 ease-in-out ${sidebarOpen ? `'w-16 md:60 w-60` : `-translate-x-full md:translate-x-0 w-16`}`}>
            <div className="flex flex-col h-full">
                <div
                    className={`w-full p-2 flex items-center h-14 justify-center`}
                >
                    <h2 className="text-4xl font-bold">
                        OCC
                    </h2>
                </div>
            </div >
        </aside >
    )
}
