'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  caption: string;
  display_order: number;
  created_at: string;
}

interface Props {
  projectId: string;
}

export default function ProjectImageGallery({ projectId }: Props) {
  const { isAdmin } = useAuth();
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);
  const [uploadForm, setUploadForm] = useState({
    images: [] as File[],
    captions: [] as string[],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, [projectId]);

  const loadImages = async () => {
    try {
      const response: any = await api.getProjectImages(projectId);
      setImages(response.images || []);
    } catch (error: any) {
      console.error('Failed to load project images:', error);
      if (error.message !== 'HTTP 404') {
        console.error('Image loading error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin || uploadForm.images.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();

      uploadForm.images.forEach((file, index) => {
        formData.append('images', file);
        formData.append(`caption_${index}`, uploadForm.captions[index] || '');
      });

      await api.uploadProjectImages(projectId, formData);

      setUploadForm({ images: [], captions: [] });
      await loadImages();

      alert('ছবি সফলভাবে আপলোড হয়েছে!');
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('ছবি আপলোড করতে সমস্যা হয়েছে: ' + (error.message || error));
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!isAdmin || !confirm('আপনি কি নিশ্চিত যে এই ছবিটি মুছে ফেলতে চান?')) return;

    try {
      await api.deleteProjectImage(projectId, imageId);
      await loadImages();
      alert('ছবি সফলভাবে মুছে ফেলা হয়েছে');
    } catch (error) {
      alert('ছবি মুছে ফেলতে সমস্যা হয়েছে');
    }
  };

  const compressImage = (file: File, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 1920x1080 for large images)
        const maxWidth = 1920;
        const maxHeight = 1080;
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
    const files = Array.from(e.target.files || []);

    // Validate file count
    if (files.length > 10) {
      alert('সর্বোচ্চ ১০টি ছবি আপলোড করা যাবে');
      return;
    }

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} একটি বৈধ ছবি ফাইল নয়`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`${file.name} ফাইলটি খুব বড় (সর্বোচ্চ ১০MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newCaptions = new Array(validFiles.length).fill('');

    setUploading(true);
    try {
      // Compress all images
      const compressedFiles = await Promise.all(
        validFiles.map(async (file) => {
          if (file.type.startsWith('image/')) {
            return await compressImage(file, 0.8);
          }
          return file;
        })
      );

      setUploadForm({
        images: compressedFiles,
        captions: newCaptions,
      });
    } catch (error) {
      console.error('Image compression error:', error);
      alert('ছবি কমপ্রেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      // Fallback to original files if compression fails
      setUploadForm({
        images: validFiles,
        captions: newCaptions,
      });
    } finally {
      setUploading(false);
    }
  };

  const updateCaption = (index: number, caption: string) => {
    const newCaptions = [...uploadForm.captions];
    newCaptions[index] = caption;
    setUploadForm({ ...uploadForm, captions: newCaptions });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">প্রকল্প ছবি গ্যালারি</h3>
        <span className="text-sm text-gray-500">{images.length} টি ছবি</span>
      </div>

      {/* Admin Upload Form */}
      {isAdmin && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-md font-medium text-gray-900 mb-4">নতুন ছবি আপলোড করুন</h4>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ছবি নির্বাচন করুন (সর্বোচ্চ ১০টি)
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 disabled:opacity-50"
              />
              <p className="mt-1 text-xs text-gray-500">
                ছবি স্বয়ংক্রিয়ভাবে কমপ্রেস হবে এবং সর্বোচ্চ ১৯২০x১০৮০ রেজোলিউশনে পরিবর্তিত হবে
              </p>
              {uploading && uploadForm.images.length === 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  <span className="text-sm text-green-600">ছবি কমপ্রেস করা হচ্ছে...</span>
                </div>
              )}
            </div>

            {uploadForm.images.length > 0 && (
              <div className="space-y-3">
                <h5 className="text-sm font-medium text-gray-700">ছবির বিবরণ যোগ করুন:</h5>
                {uploadForm.images.map((file, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <span className="text-sm text-gray-600">
                          {index + 1}. {file.name}
                        </span>
                        <div className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                          {file.type === 'image/jpeg' && ' (কমপ্রেসড)'}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="ছবির বিবরণ (ঐচ্ছিক)"
                        value={uploadForm.captions[index] || ''}
                        onChange={(e) => updateCaption(index, e.target.value)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={uploadForm.images.length === 0 || uploading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              {uploading ? 'আপলোড হচ্ছে...' : 'ছবি আপলোড করুন'}
            </button>
          </form>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div
                className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer relative"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={`https://sun.halumai.com/uploads/project-images/${image.image_url}`}
                  alt={image.caption || 'Project image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>

              {image.caption && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{image.caption}</p>
              )}

              {isAdmin && (
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">এই প্রকল্পের জন্য কোনো ছবি আপলোড করা হয়নি</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <div className="relative w-full h-[80vh]">
              <Image
                src={`https://sun.halumai.com/uploads/project-images/${selectedImage.image_url}`}
                alt={selectedImage.caption || 'Project image'}
                fill
                className="object-contain"
                sizes="90vw"
                unoptimized
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedImage.caption && (
              <div className="p-4 bg-gray-50">
                <p className="text-gray-800">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}