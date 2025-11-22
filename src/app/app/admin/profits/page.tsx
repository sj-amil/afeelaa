'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

interface DisbursementSummary {
  project_id: string;
  project_name: string;
  status: string;
  total_profit: number;
  disbursed_count: number;
  disbursed_amount: number;
  pending_count: number;
  pending_amount: number;
  updated_at: string;
}

export default function AdminProfits() {
  const [disbursements, setDisbursements] = useState<DisbursementSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDisbursements();
  }, []);

  const loadDisbursements = async () => {
    try {
      const response: any = await api.getAllDisbursements();
      setDisbursements(response.disbursements || []);
    } catch (error) {
      setError('Failed to load disbursement data');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDisbursed = async (projectId: string) => {
    if (!confirm('Mark all profits as disbursed for this project?')) return;

    try {
      await api.markProfitsDisbursed(projectId);
      loadDisbursements();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
    );
  }

  return (
    <>
      <div className="px-4 py-6 sm:px-0">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold text-gray-900">Profit Distribution</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage profit disbursements for closed projects
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Profit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Disbursed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pending
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {disbursements.map((disbursement) => (
                      <tr key={disbursement.project_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {disbursement.project_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Status: {disbursement.status}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ৳{disbursement.total_profit?.toLocaleString('en-US') || '0'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              ৳{(disbursement.disbursed_amount || 0).toLocaleString('en-US')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {disbursement.disbursed_count || 0} investors
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              ৳{(disbursement.pending_amount || 0).toLocaleString('en-US')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {disbursement.pending_count || 0} investors
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(disbursement.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {(disbursement.pending_count || 0) > 0 && (
                            <button
                              onClick={() => handleMarkDisbursed(disbursement.project_id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Mark Disbursed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {disbursements.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No closed projects with profit distribution</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profit Distribution Process
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                When a project is closed, profits are automatically calculated and distributed proportionally
                to approved shareholders. Use the "Mark Disbursed" button once you have physically
                transferred the profits to investors.
              </p>
            </div>
            <div className="mt-5">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      Profit Calculation Formula
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>User Profit = (Shares Owned ÷ Total Shares) × Total Project Profit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}