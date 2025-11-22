'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Project, Investment } from '@/types';
import { formatCurrency } from '@/lib/format';

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [pendingShares, setPendingShares] = useState<any[]>([]);
  const [profits, setProfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (isAdmin) {
          const [projectsResponse, pendingResponse]: any = await Promise.all([
            api.getProjects(),
            api.getAllShares('pending'),
          ]);
          setProjects(projectsResponse.projects || []);
          setPendingShares(pendingResponse.shares || []);
        } else {
          const [investmentsResponse, projectsResponse, profitsResponse]: any = await Promise.all([
            api.getMyInvestments(),
            api.getProjects('open'),
            api.getMyProfits(),
          ]);
          setInvestments(investmentsResponse.investments || []);
          setProjects(projectsResponse.projects || []);
          setProfits(profitsResponse.profits || []);
        }
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-green-100 text-lg">
            {isAdmin ? 'Admin Dashboard' : 'Investment Dashboard'}
          </p>
        </div>

        {isAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                    <p className="text-3xl font-bold text-white mt-2">{projects.length}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <i className="fas fa-folder text-2xl text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Active Projects</p>
                    <p className="text-3xl font-bold text-white mt-2">{projects.filter(p => p.status === 'open').length}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <i className="fas fa-chart-line text-2xl text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending Approvals</p>
                    <p className="text-3xl font-bold text-white mt-2">{pendingShares.length}</p>
                    {pendingShares.length > 0 && (
                      <p className="text-sm text-yellow-100 mt-1">
                        {formatCurrency(pendingShares.reduce((sum, s) => sum + (parseFloat(s.amount_paid?.toString() || '0') || 0), 0))} total
                      </p>
                    )}
                  </div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <i className="fas fa-clock text-2xl text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Raised</p>
                    <p className="text-3xl font-bold text-white mt-2">{formatCurrency(projects.reduce((sum, p) => sum + p.total_raised, 0))}</p>
                    <p className="text-sm text-purple-100 mt-1">
                      {projects.reduce((sum, p) => sum + p.total_investors, 0)} total investors
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <i className="fas fa-coins text-2xl text-white"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Approvals Section */}
            {pendingShares.length > 0 && (
              <div className="col-span-full">
                <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
                  <div className="px-6 py-6 sm:px-8 flex justify-between items-center bg-gradient-to-r from-yellow-50 to-orange-50">
                    <div>
                      <h3 className="text-xl leading-6 font-bold text-gray-900 flex items-center">
                        <i className="fas fa-clock text-yellow-600 mr-3"></i>
                        Pending Investment Approvals
                      </h3>
                      <p className="mt-1 max-w-2xl text-sm text-gray-600">
                        Investment requests waiting for approval
                      </p>
                    </div>
                    <a
                      href="/app/admin/shares"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                    >
                      <i className="fas fa-arrow-right mr-2"></i>
                      Review All
                    </a>
                  </div>
                  <ul className="divide-y divide-gray-100">
                    {pendingShares.slice(0, 5).map((share) => (
                      <li key={share.share_id} className="px-6 py-5 sm:px-8 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md">
                                {share.user_name?.charAt(0).toUpperCase() || 'U'}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900">
                                {share.user_name} - {share.project_name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1 flex items-center">
                                <i className="fas fa-share-alt text-gray-400 mr-2"></i>
                                {share.number_of_shares} shares • {formatCurrency(share.amount_paid)}
                                {share.account_type && ` • ${share.account_type}`}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {new Date(share.investment_date).toLocaleDateString()}
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                              Pending
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recent Projects Section */}
            <div className="col-span-full">
              <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
                <div className="px-6 py-6 sm:px-8 bg-gradient-to-r from-blue-50 to-green-50">
                  <h3 className="text-xl leading-6 font-bold text-gray-900 flex items-center">
                    <i className="fas fa-project-diagram text-green-600 mr-3"></i>
                    Recent Projects
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-600">
                    Latest project activity and performance
                  </p>
                </div>
                <ul className="divide-y divide-gray-100">
                  {projects.slice(0, 5).map((project) => (
                    <li key={project.id} className="px-6 py-5 sm:px-8 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className="flex-shrink-0">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-md ${
                              project.status === 'open' ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' :
                              project.status === 'closed' ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white' :
                              'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
                            }`}>
                              {project.name.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="ml-5 flex-1">
                            <div className="flex items-center">
                              <h4 className="text-base font-semibold text-gray-900">
                                {project.name}
                              </h4>
                              <span className={`ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                project.status === 'open' ? 'bg-green-100 text-green-800' :
                                project.status === 'closed' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mt-2 flex items-center flex-wrap gap-3">
                              <span className="flex items-center">
                                <i className="fas fa-users text-gray-400 mr-1"></i>
                                {project.total_investors} investors
                              </span>
                              <span className="flex items-center">
                                <i className="fas fa-money-bill-wave text-gray-400 mr-1"></i>
                                {formatCurrency(project.total_raised)} raised
                              </span>
                              <span className="flex items-center">
                                <i className="fas fa-chart-pie text-gray-400 mr-1"></i>
                                {project.shares_sold || 0}/{project.total_shares} shares
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(project.price_per_share)}
                          </div>
                          <div className="text-xs text-gray-500">per share</div>
                          <div className="text-sm text-green-600 font-medium mt-1">
                            {project.available_shares} available
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">My Investments</p>
                      <p className="text-3xl font-bold text-white mt-2">{investments.length}</p>
                      <p className="text-sm text-blue-100 mt-1">
                        {investments.filter(i => i.status === 'pending').length} pending
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <i className="fas fa-briefcase text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Invested</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {formatCurrency(investments.filter(i => i.status === 'approved' || i.status === 'disbursed').reduce((sum, i) => sum + (parseFloat(i.amount_paid?.toString() || '0') || 0), 0))}
                      </p>
                      <p className="text-sm text-green-100 mt-1">
                        {investments.filter(i => i.status === 'approved' || i.status === 'disbursed').reduce((sum, i) => sum + (i.number_of_shares || 0), 0)} shares total
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <i className="fas fa-hand-holding-usd text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100 text-sm font-medium">Profits Received</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {formatCurrency(profits.filter(p => p.profit_status === 'Received').reduce((sum, p) => sum + (parseFloat(p.profit_amount?.toString() || '0') || 0), 0))}
                      </p>
                      <p className="text-sm text-teal-100 mt-1">
                        {profits.filter(p => p.profit_status === 'Received').length} payments
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <i className="fas fa-chart-line text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm font-medium">Pending Profits</p>
                      <p className="text-3xl font-bold text-white mt-2">
                        {formatCurrency(profits.filter(p => p.profit_status === 'Ready to Receive').reduce((sum, p) => sum + (parseFloat(p.profit_amount?.toString() || '0') || 0), 0))}
                      </p>
                      <p className="text-sm text-yellow-100 mt-1">
                        {profits.filter(p => p.profit_status === 'Ready to Receive').length} pending
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <i className="fas fa-hourglass-half text-2xl text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
              <div className="px-6 py-6 sm:px-8 flex justify-between items-center bg-gradient-to-r from-green-50 to-blue-50">
                <div>
                  <h3 className="text-xl leading-6 font-bold text-gray-900 flex items-center">
                    <i className="fas fa-seedling text-green-600 mr-3"></i>
                    Available Projects
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-600">
                    Open projects available for investment
                  </p>
                </div>
                <a
                  href="/app/user/projects"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                >
                  <i className="fas fa-arrow-right mr-2"></i>
                  View All
                </a>
              </div>
              <ul className="divide-y divide-gray-100">
                {projects.slice(0, 5).map((project) => (
                  <li key={project.id} className="px-6 py-6 sm:px-8 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="flex-shrink-0">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-md">
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-5 flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-gray-900 truncate">
                            {project.name}
                          </h4>
                          <div className="text-sm text-gray-600 mt-1 flex items-center flex-wrap gap-2">
                            <span className="flex items-center">
                              <i className="fas fa-tag text-gray-400 mr-1"></i>
                              {formatCurrency(project.price_per_share)}/share
                            </span>
                            <span className="flex items-center">
                              <i className="fas fa-box text-gray-400 mr-1"></i>
                              {project.available_shares} available
                            </span>
                            <span className="flex items-center">
                              <i className="fas fa-users text-gray-400 mr-1"></i>
                              {project.total_investors} investors
                            </span>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                              <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min(((project.total_shares - project.available_shares) / project.total_shares) * 100, 100)}%`
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1.5 font-medium">
                              {Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}% funded • {formatCurrency(project.total_raised)} raised
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <a
                          href={`/app/user/projects/${project.id}`}
                          className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                        >
                          <i className="fas fa-hand-holding-usd mr-2"></i>
                          Invest Now
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
                {projects.length === 0 && (
                  <li className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <i className="fas fa-inbox text-gray-300 text-5xl mb-4"></i>
                      <p className="text-gray-500 font-medium">No projects available for investment</p>
                      <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
  );
}