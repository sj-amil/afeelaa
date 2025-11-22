'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  total_shares: number;
  price_per_share: number;
  available_shares: number;
  total_raised: number;
  status: string;
}

interface ProjectsSectionProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  apiUrl?: string;
}

export default function ProjectsSection({
  title,
  subtitle,
  backgroundColor = '#F2F2F2',
  apiUrl = 'https://sun.halumai.com/api',
}: ProjectsSectionProps) {
  const [openProjects, setOpenProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/projects?status=open`)
      .then(res => res.json())
      .then(data => {
        setOpenProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <section id="projects" className="py-16" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (openProjects.length === 0) {
    return (
      <section id="projects" className="py-16" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1D5273' }}>
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">No ongoing projects at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Geometric Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235D8A3A' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1D5273' }}>
            {title}
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {openProjects.map((project) => {
            const progress = Math.round(
              ((project.total_shares - project.available_shares) / project.total_shares) * 100
            );
            const totalTarget = project.total_shares * project.price_per_share;

            return (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Project Header */}
                <div
                  className="h-48 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(93, 138, 58, 0.1) 0%, rgba(93, 138, 58, 0.2) 100%)',
                  }}
                >
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold" style={{ color: '#5D8A3A' }}>
                      {project.total_shares} শেয়ার
                    </div>
                    <div className="text-sm mt-2 text-gray-600">
                      ৳{project.price_per_share.toLocaleString()} প্রতি শেয়ার
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: '#5D8A3A',
                          width: `${progress}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Raised:</span>
                      <div className="font-semibold">৳{project.total_raised.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Target:</span>
                      <div className="font-semibold">৳{totalTarget.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Available:</span>
                      <div className="font-semibold">{project.available_shares} shares</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <div className="font-semibold text-green-600 capitalize">{project.status}</div>
                    </div>
                  </div>

                  {/* Invest Button */}
                  <Link
                    href="/auth/login"
                    className="w-full py-3 rounded-lg font-medium text-center block text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#5D8A3A' }}
                  >
                    Invest Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
