'use client';

import { useState } from 'react';

interface NewsletterCTASectionProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  placeholderText?: string;
  backgroundImage?: string;
}

export default function NewsletterCTASection({
  title,
  subtitle,
  buttonText = 'Subscribe',
  placeholderText = 'Enter your email address',
  backgroundImage,
}: NewsletterCTASectionProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/85"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5D8A3A]/20 to-transparent"></div>
        </div>
      )}

      {/* Fallback Background Color */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F2D] via-[#3D7A3E] to-[#5D8A3A]"></div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-8 shadow-2xl">
          <i className="fas fa-envelope text-3xl text-white"></i>
        </div>

        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        {subtitle && (
          <p className="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-xl p-3 rounded-3xl border border-white/20 shadow-2xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              required
              className="flex-1 px-6 py-4 rounded-2xl text-white placeholder-white/60 bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all"
            />
            <button
              type="submit"
              className="group px-8 py-4 rounded-2xl font-extrabold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {buttonText}
                <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <i className="fas fa-check-circle text-emerald-300"></i>
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-shield-alt text-emerald-300"></i>
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-users text-emerald-300"></i>
            <span>Join 10,000+ subscribers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
