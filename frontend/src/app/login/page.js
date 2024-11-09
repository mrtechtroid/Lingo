"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Button from '../components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const Login = () => {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/auth/login', {
        email,
        password,
      }).then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.jwtToken); // Store JWT in localStorage
        alert('Login successful!');
        router.push("/dashboard")
      })
    } catch (err) {
      setError('Invalid email or password.' + err.message);
    }
  };
  return (
    <div style={{backgroundImage:"url(Designer.jpeg)"}}>
    <div className="min-h-screen  flex flex-col items-center justify-center p-4" style={{backdropFilter:"blur(2px)"}}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Lingo Logo"
              width={64}
              height={64}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Log in to Lingo</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
            {error && <p className="nes-text is-error">{error}</p>}
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={email} onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white py-2 rounded-md">
              Log in
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-[#1CB0F6] hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1CB0F6] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
};

export default Login;
