'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/app/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center py-6 px-4 xs:py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 xs:space-y-8">
        {/* Logo/Brand Section */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
            <i className="fas fa-seedling text-4xl text-white"></i>
          </div>
          <h2 className="text-3xl xs:text-4xl font-extrabold bg-gradient-to-r from-green-700 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-3 text-base text-gray-600 font-medium">
            Sign in to Afeelaa Farms
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Investment platform for sustainable agriculture
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl flex items-center shadow-md">
                <i className="fas fa-exclamation-circle mr-3 text-red-500"></i>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-400"></i>
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-base font-medium"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400"></i>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-base font-medium"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Sign in
                  </>
                )}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-2">
              <Link
                href="/auth/register"
                className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <i className="fas fa-user-plus"></i>
                Don't have an account? Register here
              </Link>
            </div>
          </form>
        </div>

        {/* Demo Credentials Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 shadow-lg border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
              <i className="fas fa-info-circle text-white"></i>
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900 mb-2">Demo Credentials</h3>
              <div className="bg-white rounded-lg p-3 border border-blue-200 shadow-sm">
                <p className="text-sm text-gray-700 font-medium">
                  <i className="fas fa-user-shield text-blue-600 mr-2"></i>
                  <span className="font-semibold">Admin:</span> admin@prymagro.com
                </p>
                <p className="text-sm text-gray-700 font-medium mt-1">
                  <i className="fas fa-key text-blue-600 mr-2"></i>
                  <span className="font-semibold">Password:</span> admin123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}