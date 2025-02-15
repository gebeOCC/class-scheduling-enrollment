import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="h-svh w-screen flex flex-col items-center justify-center bg-gray-50 px-5">
            {children}
        </div>
    );
}
