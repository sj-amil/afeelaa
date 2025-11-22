'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Project } from '@/types';
import ProjectImageGallery from '@/components/ProjectImageGallery';

export default function ProjectDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [investmentForm, setInvestmentForm] = useState({
    shares: 1,
    paymentProof: null as File | null,
    senderAccount: '',
    accountType: 'bank' as 'bank' | 'bkash' | 'nagad' | 'rocket' | 'upay',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response: any = await api.getProject(id as string);
      setProject(response.project);
    } catch (error) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleInvestment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project || !investmentForm.paymentProof) return;

    const amountSent = investmentForm.shares * project.price_per_share;

    if (!investmentForm.senderAccount.trim()) {
      setError('অনুগ্রহ করে আপনার অ্যাকাউন্ট নম্বর লিখুন');
      return;
    }


    setSubmitting(true);
    setError('');

    try {
      await api.purchaseShares({
        project_id: project.id,
        number_of_shares: investmentForm.shares,
        paymentProof: investmentForm.paymentProof,
        amountSent: amountSent,
        senderAccount: investmentForm.senderAccount,
        accountType: investmentForm.accountType,
      });

      alert('Investment request submitted successfully! Please wait for admin approval.');
      router.push('/app/user/investments');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const compressPaymentProof = (file: File, quality: number = 0.9): Promise<File> => {
    return new Promise((resolve) => {
      // If it's not an image, return as-is (for PDFs)
      if (!file.type.startsWith('image/')) {
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 1600x1200 for payment proofs)
        const maxWidth = 1600;
        const maxHeight = 1200;
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          'image/jpeg',
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('ফাইলটি খুব বড় (সর্বোচ্চ ৫MB)');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('শুধুমাত্র JPG, PNG, বা PDF ফাইল আপলোড করা যাবে');
      return;
    }

    setSubmitting(true);
    try {
      let processedFile = file;

      // Compress if it's an image
      if (file.type.startsWith('image/')) {
        processedFile = await compressPaymentProof(file, 0.9);
      }

      setInvestmentForm({ ...investmentForm, paymentProof: processedFile });
    } catch (error) {
      console.error('File processing error:', error);
      alert('ফাইল প্রসেসিং এ সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setInvestmentForm({ ...investmentForm, paymentProof: file });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12">
          <i className="fas fa-exclamation-circle text-red-500 text-6xl mb-4"></i>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Project Not Found</h3>
          <p className="text-gray-600">The requested project could not be found.</p>
        </div>
      </div>
    );
  }

  const totalInvestment = investmentForm.shares * project.price_per_share;

  return (
    <>
      <div className="px-3 py-4 xs:px-4 xs:py-6 sm:px-0">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Projects
          </button>
        </div>

        <div className="bg-white shadow-xl overflow-hidden rounded-2xl border border-gray-100">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {project.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{project.name}</h1>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      project.status === 'open' ? 'bg-green-400 text-green-900' : 'bg-gray-200 text-gray-800'
                    }`}>
                      <i className="fas fa-circle text-xs mr-1.5"></i>
                      {project.status}
                    </span>
                  </div>
                </div>
                <p className="text-green-100 line-clamp-2">
                  {project.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
                <dt className="text-sm font-medium text-gray-600 flex items-center mb-2">
                  <i className="fas fa-tag text-green-600 mr-2"></i>
                  Price per Share
                </dt>
                <dd className="text-2xl lg:text-3xl font-bold text-gray-900">
                  ৳{project.price_per_share.toLocaleString('en-US')}
                </dd>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
                <dt className="text-sm font-medium text-gray-600 flex items-center mb-2">
                  <i className="fas fa-box text-blue-600 mr-2"></i>
                  Available Shares
                </dt>
                <dd className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {project.available_shares.toLocaleString('en-US')}
                </dd>
                {project.pending_shares && project.pending_shares > 0 && (
                  <dd className="mt-1.5 text-xs font-medium text-orange-600 flex items-center">
                    <i className="fas fa-clock mr-1"></i>
                    {project.pending_shares.toLocaleString('en-US')} pending
                  </dd>
                )}
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
                <dt className="text-sm font-medium text-gray-600 flex items-center mb-2">
                  <i className="fas fa-money-bill-wave text-purple-600 mr-2"></i>
                  Total Raised
                </dt>
                <dd className="text-2xl lg:text-3xl font-bold text-gray-900">
                  ৳{project.total_raised.toLocaleString('en-US')}
                </dd>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-5 border border-orange-100">
                <dt className="text-sm font-medium text-gray-600 flex items-center mb-2">
                  <i className="fas fa-users text-orange-600 mr-2"></i>
                  Investors
                </dt>
                <dd className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {project.total_investors}
                </dd>
              </div>
            </div>

            <div className="mt-6">
              <dt className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <i className="fas fa-chart-line text-green-600 mr-2"></i>
                Funding Progress
              </dt>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(((project.total_shares - project.available_shares) / project.total_shares) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <div className="mt-3 flex justify-between text-sm font-medium text-gray-600">
                <span className="flex items-center">
                  <i className="fas fa-check-circle text-green-500 mr-1.5"></i>
                  {project.total_shares - project.available_shares} shares sold
                </span>
                <span className="text-green-600 font-bold">
                  {Math.round(((project.total_shares - project.available_shares) / project.total_shares) * 100)}% funded
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Image Gallery */}
        <div className="mt-8 bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="px-6 py-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <i className="fas fa-images text-green-600 mr-3"></i>
              Project Gallery
            </h3>
            <ProjectImageGallery projectId={id as string} />
          </div>
        </div>

        {project.status === 'open' && project.available_shares > 0 && (project.available_shares - (project.pending_shares || 0)) > 0 && (
          <div className="mt-8 bg-white shadow-xl rounded-2xl border border-gray-100">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-6 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-hand-holding-usd text-green-600 mr-3"></i>
                Make an Investment
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Purchase shares in this project by specifying the number of shares and uploading payment proof.
              </p>
            </div>

            <div className="px-6 py-6">
              {error && (
                <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-5 py-4 rounded-xl flex items-center shadow-md">
                  <i className="fas fa-exclamation-triangle mr-3"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleInvestment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-share-alt text-green-600 mr-2"></i>
                    Number of Shares
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={project.available_shares - (project.pending_shares || 0)}
                    value={investmentForm.shares}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, shares: parseInt(e.target.value) })}
                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base py-3 px-4"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    <i className="fas fa-info-circle text-blue-500 mr-1"></i>
                    Maximum available: {(project.available_shares - (project.pending_shares || 0)).toLocaleString('en-US')} shares
                    {(project.pending_shares || 0) > 0 && (
                      <span className="text-orange-600 font-medium"> (excluding {project.pending_shares.toLocaleString('en-US')} pending)</span>
                    )}
                  </p>
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-university text-green-600 mr-2"></i>
                    অ্যাকাউন্টের ধরন
                  </label>
                  <select
                    value={investmentForm.accountType}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, accountType: e.target.value as any })}
                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base py-3 px-4"
                    required
                  >
                    <option value="bank">ব্যাংক অ্যাকাউন্ট</option>
                    <option value="bkash">বিকাশ</option>
                    <option value="nagad">নগদ</option>
                    <option value="rocket">রকেট</option>
                    <option value="upay">উপায়</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-mobile-alt text-green-600 mr-2"></i>
                    {investmentForm.accountType === 'bank' ? 'ব্যাংক অ্যাকাউন্ট নম্বর' :
                     investmentForm.accountType === 'bkash' ? 'বিকাশ নম্বর' :
                     investmentForm.accountType === 'nagad' ? 'নগদ নম্বর' :
                     investmentForm.accountType === 'rocket' ? 'রকেট নম্বর' :
                     'উপায় নম্বর'}
                  </label>
                  <input
                    type="text"
                    value={investmentForm.senderAccount}
                    onChange={(e) => setInvestmentForm({ ...investmentForm, senderAccount: e.target.value })}
                    className="block w-full border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base py-3 px-4"
                    placeholder={investmentForm.accountType === 'bank' ? '১২৩৪৫৬৭৮৯০১২৩৪' : '০১৭XXXXXXXX'}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    যে অ্যাকাউন্ট থেকে টাকা পাঠিয়েছেন তার নম্বর
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <i className="fas fa-file-upload text-green-600 mr-2"></i>
                    পেমেন্ট প্রমাণপত্র
                  </label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    disabled={submitting}
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-xl py-3 px-4
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-50 file:text-green-700
                      hover:file:bg-green-100
                      disabled:opacity-50 cursor-pointer"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    ব্যাংক ট্রান্সফার রসিদ বা পেমেন্ট প্রমাণ আপলোড করুন (JPG, PNG, PDF)
                    {investmentForm.paymentProof && !submitting && (
                      <span className="block mt-2 text-green-600 font-medium flex items-center">
                        <i className="fas fa-check-circle mr-1.5"></i>
                        ফাইল নির্বাচিত: {investmentForm.paymentProof.name}
                        ({(investmentForm.paymentProof.size / 1024 / 1024).toFixed(2)} MB)
                        {investmentForm.paymentProof.type.startsWith('image/') && ' (কমপ্রেসড)'}
                      </span>
                    )}
                  </p>
                  {submitting && !investmentForm.paymentProof && (
                    <div className="mt-3 flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-sm font-medium">ফাইল প্রসেসিং করা হচ্ছে...</span>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-700">Total Investment:</span>
                    <span className="text-3xl font-bold text-green-600">
                      ৳{totalInvestment.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600 flex items-center justify-end">
                    <i className="fas fa-calculator text-gray-400 mr-2"></i>
                    {investmentForm.shares} shares × ৳{project.price_per_share.toLocaleString('en-US')} per share
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || !investmentForm.paymentProof}
                    className="w-full inline-flex justify-center items-center py-4 px-6 border border-transparent shadow-lg text-base font-medium rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Submit Investment
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-yellow-600 text-2xl"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-bold text-yellow-900 mb-3">
                      Investment Process
                    </h3>
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                        <span>Submit your investment request with payment proof</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                        <span>Admin will review and approve/reject your request</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                        <span>Upon approval, your shares will be allocated</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-yellow-600 mr-2 mt-0.5"></i>
                        <span>You'll receive profits when the project closes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {project.status !== 'open' && (
          <div className="mt-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-8 text-center border border-gray-300 shadow-lg">
            <i className="fas fa-lock text-gray-400 text-5xl mb-4"></i>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Project Not Available</h3>
            <p className="text-gray-600">
              This project is currently <span className="font-semibold">{project.status}</span> and not accepting new investments.
            </p>
          </div>
        )}

        {project.status === 'open' && project.available_shares > 0 && (project.available_shares - (project.pending_shares || 0)) <= 0 && (
          <div className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8 text-center border border-orange-300 shadow-lg">
            <i className="fas fa-hourglass-half text-orange-500 text-5xl mb-4"></i>
            <h3 className="text-xl font-bold text-orange-900 mb-3">All Shares Reserved</h3>
            <p className="text-orange-700">
              All available shares ({project.pending_shares?.toLocaleString('en-US')}) are currently pending admin approval.
            </p>
            <p className="text-orange-600 text-sm mt-2">
              Please wait for existing requests to be processed before making new investments.
            </p>
          </div>
        )}

        {project.available_shares === 0 && project.status === 'open' && (
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-8 text-center border border-blue-300 shadow-lg">
            <i className="fas fa-check-circle text-blue-500 text-5xl mb-4"></i>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Fully Funded</h3>
            <p className="text-blue-700">
              This project has reached its funding goal. No shares are currently available.
            </p>
          </div>
        )}
      </div>
    </>
  );
}