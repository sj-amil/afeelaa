'use client';

import Link from 'next/link';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  link: string;
  image?: string;
}

interface BlogSectionProps {
  title: string;
  subtitle?: string;
  posts: BlogPost[];
  viewAllLink?: string;
  viewAllText?: string;
}

export default function BlogSection({
  title,
  subtitle,
  posts,
  viewAllLink = '#',
  viewAllText = 'View All Posts',
}: BlogSectionProps) {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#0F172A] to-[#1E293B] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto rounded-full mb-6"></div>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Link
              key={index}
              href={post.link}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-500 h-full border border-white/10 hover:border-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-500/20">
                {post.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-block text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-7">
                  <div className="flex items-center gap-2 mb-4 text-emerald-300">
                    <i className="fas fa-calendar-alt text-sm"></i>
                    <span className="text-xs font-medium">{post.date}</span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-emerald-300 text-sm font-bold group-hover:gap-3 gap-2 transition-all duration-300">
                    Read More
                    <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform duration-300"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={viewAllLink}
            className="group inline-block px-10 py-5 rounded-full font-extrabold text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {viewAllText}
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
