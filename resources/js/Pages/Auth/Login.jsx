import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import OCC_LOGO from '../../../images/OCC_LOGO.png';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Head } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id_no: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        post(route('login'), {
            onFinish: () => {
                reset('password');
                setSubmitting(false);
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <Card className="w-1/4 max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
                <CardContent className="flex flex-col items-center">
                    <img src={OCC_LOGO} alt="OCC Logo" className="w-24 m-4" />
                    <form onSubmit={submit} className="w-full space-y-4">
                        <div className="space-y-2">
                            <Input
                                type="text"
                                id="user_id_no"
                                name="user_id_no"
                                value={data.user_id_no}
                                onChange={(e) => setData('user_id_no', e.target.value)}
                                placeholder="ID NUMBER"
                                required
                            />
                            {errors.user_id_no && <p className="text-red-500 text-sm">{errors.user_id_no}</p>}
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="PASSWORD"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing || submitting}
                            className="w-full"
                        >
                            {submitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                    <div className="mt-4 text-sm text-center">
                        <button
                            onClick={() => console.log("Forgot Password clicked")}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            FORGOT PASSWORD?
                        </button>
                    </div>
                </CardContent>
            </Card>
        </GuestLayout>
    );
}
