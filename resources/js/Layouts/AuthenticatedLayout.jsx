import { usePage } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import Header from '@/Components/Header';
import SideBar from '@/Components/SideBar';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [onMobile, setOnMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        console.log(user)
        const handleResize = () => {
            if (window.innerWidth <= 640) {
                setSidebarOpen(false);
                setOnMobile(true);
            } else if (window.innerWidth > 640 && onMobile) {
                setSidebarOpen(true);
                setOnMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    // Memoize the sidebar to prevent re-rendering
    const sidebar = useMemo(() => <SideBar sidebarOpen={sidebarOpen} />, [sidebarOpen]);

    return (
        <div className="flex h-svh overflow-hidden">
            {sidebar}
            <div className="flex flex-col flex-grow">
                <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user} />
                <main className="flex-grow p-4 bg-[#F0F4F8] overflow-auto">{children}</main>
            </div>
        </div>
    );
}
