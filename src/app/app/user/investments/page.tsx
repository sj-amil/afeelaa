'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Investment } from '@/types';

export default function UserInvestments() {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [profits, setProfits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('investments');
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [investmentsResponse, profitsResponse]: any = await Promise.all([
        api.getMyInvestments(),
        api.getMyProfits(),
      ]);

      setInvestments(investmentsResponse.investments || []);
      setProfits(profitsResponse.profits || []);
    } catch (error) {
      setError('Failed to load investment data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'disbursed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalInvested = () => {
    return investments
      .filter(inv => inv.status === 'approved' || inv.status === 'disbursed')
      .reduce((sum, inv) => sum + (parseFloat(inv.amount_paid?.toString() || '0') || 0), 0);
  };

  const getTotalProfits = () => {
    return profits
      .filter(profit => profit.profit_status === 'Received')
      .reduce((sum, profit) => sum + (parseFloat(profit.profit_amount?.toString() || '0') || 0), 0);
  };

  const getPendingProfits = () => {
    return profits
      .filter(profit => profit.profit_status === 'Ready to Receive')
      .reduce((sum, profit) => sum + (parseFloat(profit.profit_amount?.toString() || '0') || 0), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading investments...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center">
            <i className="fas fa-chart-line text-4xl mr-4"></i>
            <div>
              <h1 className="text-3xl font-bold">My Investments</h1>
              <p className="mt-2 text-green-100">
                Track your investment portfolio and profit history
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

        {/* Summary Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Invested</p>
                  <p className="text-3xl font-bold text-white mt-2">৳{getTotalInvested().toLocaleString('en-US')}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <i className="fas fa-hand-holding-usd text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Profits Received</p>
                  <p className="text-3xl font-bold text-white mt-2">৳{getTotalProfits().toLocaleString('en-US')}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <i className="fas fa-coins text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Pending Profits</p>
                  <p className="text-3xl font-bold text-white mt-2">৳{getPendingProfits().toLocaleString('en-US')}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <i className="fas fa-hourglass-half text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Investments</p>
                  <p className="text-3xl font-bold text-white mt-2">{investments.length}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <i className="fas fa-briefcase text-2xl text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full rounded-xl border-gray-300 shadow-md focus:border-green-500 focus:ring-green-500 bg-white py-3 px-4 font-medium text-gray-900"
            >
              <option value="investments">📊 My Investments</option>
              <option value="profits">💰 Profit History</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b-2 border-gray-200">
              <nav className="flex space-x-8" aria-label="Tabs">
                {[
                  { key: 'investments', label: 'My Investments', icon: 'fa-chart-pie' },
                  { key: 'profits', label: 'Profit History', icon: 'fa-coins' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap py-4 px-6 border-b-4 font-semibold text-base transition-all duration-200 flex items-center gap-2 ${
                      activeTab === tab.key
                        ? 'border-green-600 text-green-700 bg-green-50 rounded-t-lg'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 rounded-t-lg'
                    }`}
                  >
                    <i className={`fas ${tab.icon}`}></i>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Investments Tab */}
        {activeTab === 'investments' && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-seedling mr-2 text-green-600"></i>
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-hand-holding-usd mr-2 text-blue-600"></i>
                        Investment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-percentage mr-2 text-purple-600"></i>
                        Ownership
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-info-circle mr-2 text-orange-600"></i>
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-calendar mr-2 text-indigo-600"></i>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {investments.map((investment) => (
                      <tr key={`${investment.project_id}-${investment.investment_date}`} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-colors duration-150">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-md">
                              {investment.project_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {investment.project_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 flex items-center">
                              <i className="fas fa-box text-blue-500 mr-2 text-xs"></i>
                              {investment.number_of_shares} shares
                            </div>
                            <div className="text-sm text-gray-600 font-medium mt-1">
                              ৳{investment.amount_paid.toLocaleString('en-US')}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-base font-bold text-purple-700">
                            {investment.ownership_percentage}%
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusColor(investment.status)}`}>
                            <i className="fas fa-circle mr-1.5 text-[8px]"></i>
                            {investment.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">
                            {new Date(investment.investment_date).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {investments.length === 0 && (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                      <i className="fas fa-inbox text-gray-400 text-3xl"></i>
                    </div>
                    <p className="text-gray-600 font-semibold text-lg mb-2">No investments found</p>
                    <a
                      href="/app/user/projects"
                      className="mt-3 inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                    >
                      <i className="fas fa-arrow-right mr-2"></i>
                      Browse available projects
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profits Tab */}
        {activeTab === 'profits' && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-seedling mr-2 text-green-600"></i>
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-hand-holding-usd mr-2 text-blue-600"></i>
                        Investment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-money-bill-wave mr-2 text-green-600"></i>
                        Profit Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-info-circle mr-2 text-orange-600"></i>
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        <i className="fas fa-chart-line mr-2 text-purple-600"></i>
                        ROI
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {profits.map((profit) => (
                      <tr key={`${profit.project_id}-${profit.investment_date}`} className="hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-colors duration-150">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-md">
                              {profit.project_name.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-sm font-semibold text-gray-900">
                              {profit.project_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900 flex items-center">
                              <i className="fas fa-box text-blue-500 mr-2 text-xs"></i>
                              {profit.number_of_shares} shares
                            </div>
                            <div className="text-sm text-gray-600 font-medium mt-1">
                              ৳{profit.amount_paid.toLocaleString('en-US')} invested
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-base font-bold text-green-700 flex items-center">
                            <i className="fas fa-coins text-green-500 mr-2"></i>
                            ৳{profit.profit_amount.toLocaleString('en-US')}
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                            profit.profit_status === 'Received' ? 'bg-green-100 text-green-800' :
                            profit.profit_status === 'Ready to Receive' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            <i className="fas fa-circle mr-1.5 text-[8px]"></i>
                            {profit.profit_status}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-base font-bold text-purple-700">
                              {Math.round((profit.profit_amount / profit.amount_paid) * 100)}%
                            </div>
                            <div className="ml-2 w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${Math.min(Math.round((profit.profit_amount / profit.amount_paid) * 100), 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {profits.length === 0 && (
                  <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mb-4">
                      <i className="fas fa-inbox text-gray-400 text-3xl"></i>
                    </div>
                    <p className="text-gray-600 font-semibold text-lg">No profits to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}