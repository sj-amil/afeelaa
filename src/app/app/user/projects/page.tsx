'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Project } from '@/types';

export default function UserProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response: any = await api.getProjects('open');
      setProjects(response.projects || []);
    } catch (error) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center">
            <i className="fas fa-seedling text-4xl mr-4"></i>
            <div>
              <h1 className="text-3xl font-bold">Browse Projects</h1>
              <p className="mt-2 text-green-100">
                Discover and invest in sustainable agriculture projects
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl shadow-md flex items-center">
            <i className="fas fa-exclamation-triangle mr-3"></i>
            {error}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white overflow-hidden shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center shadow-md">
                      <span className="text-xl font-bold">
                        {project.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-baseline mt-1">
                        <span className="text-2xl font-bold text-green-600">
                          ৳{project.price_per_share.toLocaleString('en-US')}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          /share
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {project.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <i className="fas fa-box text-gray-400 mr-2"></i>
                      Available Shares
                    </span>
                    <span className="font-bold text-gray-900">{project.available_shares.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <i className="fas fa-money-bill-wave text-gray-400 mr-2"></i>
                      Total Raised
                    </span>
                    <span className="font-bold text-gray-900">৳{project.total_raised.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-600 flex items-center">
                      <i className="fas fa-users text-gray-400 mr-2"></i>
                      Investors
                    </span>
                    <span className="font-bold text-gray-900">{project.total_investors}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}% funded</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(((project.total_shares - project.available_shares) / project.total_shares) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>

                <a
                  href={`/app/user/projects/${project.id}`}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Details & Invest
                </a>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto max-w-md bg-white rounded-2xl shadow-xl p-12">
              <i className="fas fa-inbox text-gray-300 text-6xl mb-6"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Projects Available</h3>
              <p className="text-gray-600">
                There are currently no open projects available for investment.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back later for new sustainable agriculture opportunities!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}