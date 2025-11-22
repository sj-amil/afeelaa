'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Investment } from '@/types';
import Image from 'next/image';

export default function AdminShares() {
  const [shares, setShares] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');
  const [error, setError] = useState('');
  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  useEffect(() => {
    loadShares();
  }, [filter]);

  const loadShares = async () => {
    try {
      const response: any = await api.getAllShares(filter === 'all' ? undefined : filter);
      setShares(response.shares || []);
    } catch (error) {
      setError('Failed to load share requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (shareId: string, action: 'approve' | 'reject') => {
    try {
      await api.approveShare(shareId, action);
      loadShares();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-primary-orange text-white';
      case 'approved': return 'bg-primary-green text-white';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'disbursed': return 'bg-primary-blue text-white';
      default: return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-2xl font-bold text-gray-900">Share Approvals</h1>
            <p className="mt-2 text-sm text-gray-700">
              Review and approve share purchase requests
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6">
          <div className="sm:hidden">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="disbursed">Disbursed</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-8" aria-label="Tabs">
              {[
                { key: 'pending', label: 'Pending' },
                { key: 'approved', label: 'Approved' },
                { key: 'rejected', label: 'Rejected' },
                { key: 'disbursed', label: 'Disbursed' },
                { key: 'all', label: 'All' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="mt-8 hidden lg:flex lg:flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Investor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Investment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Proof
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shares.map((share) => (
                      <tr key={share.share_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {share.user_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {share.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {share.project_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {share.number_of_shares} shares
                            </div>
                            <div className="text-sm text-gray-500">
                              ৳{share.amount_paid.toLocaleString('en-US')} • {share.ownership_percentage}% ownership
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(share.status)}`}>
                            {share.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            {share.amount_sent && (
                              <div className="text-sm font-medium text-gray-900">
                                প্রেরিত: ৳{share.amount_sent.toLocaleString('en-US')}
                              </div>
                            )}
                            {share.account_type && share.sender_account && (
                              <div className="text-sm text-gray-500">
                                {share.account_type === 'bank' ? 'ব্যাংক' :
                                 share.account_type === 'bkash' ? 'বিকাশ' :
                                 share.account_type === 'nagad' ? 'নগদ' :
                                 share.account_type === 'rocket' ? 'রকেট' :
                                 share.account_type === 'upay' ? 'উপায়' : share.account_type}: {share.sender_account}
                              </div>
                            )}
                            {!share.amount_sent && !share.account_type && (
                              <span className="text-gray-400 text-sm">পুরাতন এন্ট্রি</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {share.payment_proof ? (
                            <button
                              onClick={() => setSelectedProof(`https://sun.halumai.com/uploads/${share.payment_proof}`)}
                              className="text-blue-600 hover:text-blue-900 text-sm"
                            >
                              📄 View Proof
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">No proof</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(share.investment_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {share.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproval(share.share_id, 'approve')}
                                className="text-primary-green hover:text-primary-green-medium font-medium"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleApproval(share.share_id, 'reject')}
                                className="text-red-600 hover:text-red-900 font-medium"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {shares.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No share requests found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="mt-8 lg:hidden">
          <div className="space-y-4">
            {shares.map((share) => (
              <div key={share.share_id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{share.user_name}</h3>
                    <p className="text-xs text-gray-500 truncate">{share.email}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(share.status)}`}>
                    {share.status}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Project:</span>
                    <span className="text-xs font-medium text-gray-900 text-right">{share.project_name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Investment:</span>
                    <div className="text-right">
                      <div className="text-xs font-medium text-gray-900">{share.number_of_shares} shares</div>
                      <div className="text-xs text-gray-500">৳{share.amount_paid.toLocaleString('en-US')} • {share.ownership_percentage}%</div>
                    </div>
                  </div>

                  {(share.amount_sent || share.account_type) && (
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Payment:</span>
                      <div className="text-right">
                        {share.amount_sent && (
                          <div className="text-xs font-medium text-gray-900">
                            প্রেরিত: ৳{share.amount_sent.toLocaleString('en-US')}
                          </div>
                        )}
                        {share.account_type && share.sender_account && (
                          <div className="text-xs text-gray-500">
                            {share.account_type === 'bank' ? 'ব্যাংক' :
                             share.account_type === 'bkash' ? 'বিকাশ' :
                             share.account_type === 'nagad' ? 'নগদ' :
                             share.account_type === 'rocket' ? 'রকেট' :
                             share.account_type === 'upay' ? 'উপায়' : share.account_type}: {share.sender_account}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">Date:</span>
                    <span className="text-xs text-gray-900">{new Date(share.investment_date).toLocaleDateString()}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Proof:</span>
                    {share.payment_proof ? (
                      <button
                        onClick={() => setSelectedProof(`https://sun.halumai.com/uploads/${share.payment_proof}`)}
                        className="text-blue-600 hover:text-blue-900 text-xs font-medium"
                      >
                        📄 View Proof
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">No proof</span>
                    )}
                  </div>

                  {share.status === 'pending' && (
                    <div className="flex space-x-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => handleApproval(share.share_id, 'approve')}
                        className="flex-1 bg-primary-green text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-primary-green-medium"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(share.share_id, 'reject')}
                        className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md text-xs font-medium hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {shares.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No share requests found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Proof Modal */}
      {selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-2 xs:p-4">
          <div className="w-full max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="relative w-full h-[70vh] xs:h-[80vh]">
              <Image
                src={selectedProof}
                alt="Payment Proof"
                fill
                className="object-contain"
                sizes="(max-width: 475px) 95vw, (max-width: 768px) 90vw, 80vw"
                unoptimized
              />
              <button
                onClick={() => setSelectedProof(null)}
                className="absolute top-2 right-2 xs:top-4 xs:right-4 bg-black bg-opacity-50 text-white p-1.5 xs:p-2 rounded-full hover:bg-opacity-75 z-10"
              >
                <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-3 xs:p-4 bg-gray-50">
              <p className="text-gray-800 text-center text-sm xs:text-base">Payment Proof Document</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}