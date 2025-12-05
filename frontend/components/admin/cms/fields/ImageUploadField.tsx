import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldSchema } from '../../../lib/cms/types';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadFieldProps {
    field: FieldSchema;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function ImageUploadField({ field, value, onChange, error }: ImageUploadFieldProps) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // File validation constants
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    const validateFile = (file: File): string | null => {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            return `File size must be less than 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
        }

        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `Invalid file type. Allowed: JPG, PNG, WEBP. Got: ${file.type}`;
        }

        return null;
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
            toast.error(validationError);
            e.target.value = ''; // Clear input
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const res = await fetch('http://localhost:8000/api/v1/cms/upload/', {
                method: 'POST',
                body: formData,
                // Note: For development, backend allows all origins
                // In production, add proper authentication:
                // headers: {
                //     'Authorization': `Bearer ${getAuthToken()}`
                // }
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            if (res.ok) {
                const data = await res.json();
                onChange(data.url);
                toast.success('Image uploaded successfully!', {
                    icon: <CheckCircle className="w-4 h-4" />,
                });
                router.refresh(); // Refresh to show updated image
                e.target.value = ''; // Clear input for next upload
            } else {
                const errorData = await res.json().catch(() => ({ error: 'Upload failed' }));
                const errorMessage = errorData.error || `Upload failed with status ${res.status}`;

                if (res.status === 401) {
                    toast.error('Authentication required. Please log in again.');
                } else if (res.status === 413) {
                    toast.error('File too large. Maximum size is 5MB.');
                } else {
                    toast.error(errorMessage);
                }

                console.error('Upload failed:', errorData);
            }
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Network error. Please check your connection and try again.', {
                icon: <AlertCircle className="w-4 h-4" />,
            });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="flex items-start gap-4">
                {value ? (
                    <div className="relative w-32 h-32 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group">
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f1f5f9" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="12"%3EImage Error%3C/text%3E%3C/svg%3E';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="absolute top-1 right-1 p-1 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="w-32 h-32 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-8 h-8 mb-2" />
                        <span className="text-xs">No image</span>
                    </div>
                )}

                <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="Enter image URL directly..."
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            id={`file-upload-${field.name}`}
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Image'}
                        </button>

                        {/* Progress bar */}
                        {uploading && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100 rounded-b-lg overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-slate-500">
                        Supported: JPG, PNG, WEBP • Max size: 5MB
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}
