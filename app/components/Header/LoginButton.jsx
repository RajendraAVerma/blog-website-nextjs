"use client"

import { useAuth } from "@/lib/contexts/AuthContext"
import Link from 'next/link'

export default function LoginButton() {

    const {
        user,
        isLoading,
        error,
        handleSignInWithGoogle,
        handleLogout,
    } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (user) {
        return <div className="flex gap-4 items-center">
            <button
                onClick={() => {
                    handleLogout();
                }}
                className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full"
            >
                Logout
            </button>
            <Link href='/admin'>
                <div className="flex gap-4 rounded-xl bg-blue-100 px-3 py-2">
                    <img className="object-cover h-12 w-12 rounded-full" src={user?.photoURL} alt="" />
                    <div>
                        <h1 className="font-bold">{user?.displayName}</h1>
                        <h1 className="text-sm text-gray-500">{user?.email}</h1>
                    </div>
                </div>
            </Link>
        </div>
    }

    return <section>
        <button
            onClick={() => {
                handleSignInWithGoogle();
            }}
            className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-full">
            <img className='h-7' src="/google.png" alt="" />
            Login With Google
        </button>
    </section>
}