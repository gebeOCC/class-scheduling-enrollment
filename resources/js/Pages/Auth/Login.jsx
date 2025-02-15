import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import './Login.css'
import OCC_LOGO from '../../../images/OCC_LOGO.png'
import { useState } from 'react';
import './Login.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id_no: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [submitting, setsubmitting] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleForgotPassword  = () => {
        
    }

    return (
        <GuestLayout>
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <section className="container">
                <div className="login-container">
                    <div className="form-container bg-white">
                        <h1 className="opacity mb-6 text-4xl font-semibold">LOGIN</h1>
                        <img src={OCC_LOGO} alt="illustration" className="illustration" />
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-6">
                                <input
                                    type="text"
                                    id="user_id_no"
                                    name="user_id_no"
                                    value={data.user_id_no}
                                    onChange={(e) => setData('user_id_no', e.target.value)}
                                    className="p-4 text-lg"
                                    required
                                    placeholder="ID NUMBER" />
                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="p-4 text-lg"
                                            required
                                            placeholder="PASSWORD" />
                                        <div
                                            type="button"
                                            onClick={() => setShowPassword(prev => !prev)}
                                            className="absolute top-0 right-0 text-gray-400 hover:text-gray-500 max-w-min h-full bg-transparent flex justify-center items-center py-4 px-2 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <FaEye size={25} />
                                            ) : (
                                                <FaEyeSlash size={25} />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-red-500 text-sm">{errors.user_id_no}</p>
                                </div>
                            </div>

                            <button
                                disabled={submitting}
                                className="login-button">
                                {submitting ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="register-forget opacity text-black">
                            <a className="text-black cursor-pointer" onClick={() => handleForgotPassword()}>FORGOT PASSWORD</a>
                        </div>
                    </div>
                </div>
                <div className="theme-btn-container"></div>
            </section>
        </GuestLayout>
    );
}
