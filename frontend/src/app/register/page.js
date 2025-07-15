"use client"
import React, { useState } from 'react';
import axios from 'axios';
import img from 'next/image';
import Button from '../components/Button';
import Link from 'next/link';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/auth/register', {
        name,
        email,
        password,
      });
      setSuccess(true);
      setError('');
    } catch (err) {
      setError('Registration failed.' + err?.message);
      setSuccess('false')
    }
  };

  return (
    <div style={{backgroundImage:"url(Designer.jpeg)"}}>
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{backdropFilter:"blur(2px)"}}>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.png"
              alt="Duolingo Logo"
              width={64}
              height={64}
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Create your profile</h1>
          {error && <p className="nes-text is-error">{error}</p>}
      {success && <p className="nes-text is-success">Registration successful!</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={name} onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
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
                placeholder="Create a password"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full bg-[#58CC02] hover:bg-[#58CC02]/90 text-white py-2 rounded-md">
              Create account
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1CB0F6] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
};

export default Register;
