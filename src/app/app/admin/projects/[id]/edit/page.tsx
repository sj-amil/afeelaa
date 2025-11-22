'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Project } from '@/types';
import ProjectImageGallery from '@/components/ProjectImageGallery';
import { formatCurrency } from '@/lib/format';

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      const response: any = await api.getProject(id as string);
      const projectData = response.project;
      setProject(projectData);
      setFormData({
        name: projectData.name,
        description: projectData.description || '',
      });
    } catch (error) {
      setError('প্রকল্প লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setSaving(true);
    setError('');

    try {
      await api.updateProject(project.id, formData);
      alert('প্রকল্প সফলভাবে আপডেট করা হয়েছে!');
      await loadProject(); // Reload to get updated data
    } catch (err: any) {
      setError(err.message || 'প্রকল্প আপডেট করতে সমস্যা হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleCloseProject = async () => {
    if (!project) return;

    const totalProfitStr = prompt(`${project.name} প্রকল্পের মোট লাভ প্রবেশ করুন (BDT):`);
    if (!totalProfitStr) return;

    const totalProfit = parseFloat(totalProfitStr);
    if (isNaN(totalProfit) || totalProfit < 0) {
      alert('অবৈধ লাভের পরিমাণ');
      return;
    }

    if (!confirm(`আপনি কি নিশ্চিত যে এই প্রকল্পটি ${formatCurrency(totalProfit)} লাভ সহ বন্ধ করতে চান?`)) {
      return;
    }

    try {
      await api.closeProject(project.id, totalProfit);
      alert('প্রকল্প সফলভাবে বন্ধ করা হয়েছে!');
      router.push('/app/admin/projects');
    } catch (err: any) {
      alert('প্রকল্প বন্ধ করতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  const handleArchiveProject = async () => {
    if (!project) return;

    if (!confirm('আপনি কি নিশ্চিত যে এই প্রকল্পটি আর্কাইভ করতে চান?')) {
      return;
    }

    try {
      await api.archiveProject(project.id);
      alert('প্রকল্প সফলভাবে আর্কাইভ করা হয়েছে!');
      router.push('/app/admin/projects');
    } catch (err: any) {
      alert('প্রকল্প আর্কাইভ করতে সমস্যা হয়েছে: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">প্রকল্প পাওয়া যায়নি</h2>
        <p className="mt-2 text-gray-600">আপনি যে প্রকল্পটি খুঁজছেন সেটি বিদ্যমান নেই।</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">প্রকল্প সম্পাদনা</h1>
              <p className="mt-2 text-gray-600">{project.name} প্রকল্পের বিস্তারিত সম্পাদনা করুন</p>
            </div>
            <button
              onClick={() => router.push('/app/admin/projects')}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              ফিরে যান
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="space-y-8">
          {/* Project Details Form */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">প্রকল্প বিস্তারিত</h2>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    প্রকল্পের নাম *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    প্রকল্পের অবস্থা
                  </label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'open' ? 'bg-green-100 text-green-800' :
                      project.status === 'closed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status === 'open' ? 'খোলা' :
                       project.status === 'closed' ? 'বন্ধ' : 'আর্কাইভ'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  প্রকল্পের বর্ণনা
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="প্রকল্পের বিস্তারিত বর্ণনা লিখুন..."
                />
              </div>

              {/* Project Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <dt className="text-sm font-medium text-gray-500">প্রতি শেয়ারের দাম</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(project.price_per_share)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">উপলব্ধ শেয়ার</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {project.available_shares.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">মোট সংগ্রহ</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatCurrency(project.total_raised)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">বিনিয়োগকারী</dt>
                  <dd className="mt-1 text-2xl font-semibold text-gray-900">
                    {project.total_investors}
                  </dd>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'সংরক্ষণ করা হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
                </button>

                <div className="space-x-4">
                  {project.status === 'open' && (
                    <button
                      type="button"
                      onClick={handleCloseProject}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      প্রকল্প বন্ধ করুন
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleArchiveProject}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    আর্কাইভ করুন
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Image Gallery */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">প্রকল্প ছবি গ্যালারি</h2>
            </div>
            <div className="p-6">
              <ProjectImageGallery projectId={id as string} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}