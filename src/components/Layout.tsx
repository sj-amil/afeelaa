'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg" style={{color: '#1D5273'}}>Loading...</div>
      </div>
    );
  }

  if (!user && !loading) {
    router.push('/auth/login');
    return null;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg" style={{color: '#1D5273'}}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-gradient-to-r from-green-700 via-green-600 to-blue-600 shadow-2xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-white rounded-xl p-2 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="Afeelaa Farms"
                  width={200}
                  height={70}
                  className="h-12 w-auto sm:h-14"
                  priority
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-2 lg:space-x-3">
                <a
                  href="/app/dashboard"
                  className="text-white px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 hover:shadow-lg backdrop-blur-sm flex items-center gap-2"
                >
                  <i className="fas fa-chart-line"></i>
                  ড্যাশবোর্ড
                </a>
                {isAdmin ? (
                  <>
                    <a
                      href="/app/admin/projects"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-seedling"></i>
                      প্রকল্প
                    </a>
                    <a
                      href="/app/admin/shares"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-check-circle"></i>
                      শেয়ার অনুমোদন
                    </a>
                    <a
                      href="/app/admin/profits"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-coins"></i>
                      লাভ
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/app/user/projects"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-seedling"></i>
                      প্রকল্প ব্রাউজ করুন
                    </a>
                    <a
                      href="/app/user/investments"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-chart-pie"></i>
                      আমার বিনিয়োগ
                    </a>
                    <a
                      href="/app/user/profile"
                      className="text-white hover:bg-white/20 hover:shadow-lg px-3 lg:px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
                    >
                      <i className="fas fa-user"></i>
                      প্রোফাইল
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-white">
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs text-green-100">{isAdmin ? 'অ্যাডমিন' : 'ব্যবহারকারী'}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 lg:px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:shadow-xl flex items-center gap-2 shadow-lg"
              >
                <i className="fas fa-sign-out-alt"></i>
                লগআউট
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-3 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg backdrop-blur-sm"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t-2 border-white/20 mt-2 pt-3 pb-4">
              <div className="flex flex-col space-y-2">
                <a
                  href="/app/dashboard"
                  className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <i className="fas fa-chart-line w-5"></i>
                  ড্যাশবোর্ড
                </a>
                {isAdmin ? (
                  <>
                    <a
                      href="/app/admin/projects"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-seedling w-5"></i>
                      প্রকল্প
                    </a>
                    <a
                      href="/app/admin/shares"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-check-circle w-5"></i>
                      শেয়ার অনুমোদন
                    </a>
                    <a
                      href="/app/admin/profits"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-coins w-5"></i>
                      লাভ
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/app/user/projects"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-seedling w-5"></i>
                      প্রকল্প ব্রাউজ করুন
                    </a>
                    <a
                      href="/app/user/investments"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-chart-pie w-5"></i>
                      আমার বিনিয়োগ
                    </a>
                    <a
                      href="/app/user/profile"
                      className="text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3 shadow-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <i className="fas fa-user w-5"></i>
                      প্রোফাইল
                    </a>
                  </>
                )}

                {/* Mobile User Info and Logout */}
                <div className="border-t-2 border-white/20 pt-3 mt-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 mb-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-white">
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-green-100">{isAdmin ? 'অ্যাডমিন' : 'ব্যবহারকারী'}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:from-red-600 hover:to-red-700 shadow-lg flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    লগআউট
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}