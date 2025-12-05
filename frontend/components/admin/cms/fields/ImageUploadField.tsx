import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FieldSchema } from '../../../lib/cms/types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadFieldProps {
    field: FieldSchema;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function ImageUploadField({ field, value, onChange, error }: ImageUploadFieldProps) {
    const router = useRouter();
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Use the new upload endpoint
            const res = await fetch('http://localhost:8000/api/v1/cms/upload/', {
                method: 'POST',
                body: formData,
                // Add auth headers if needed, but for now assuming session/cookie or public for dev
            });

            if (res.ok) {
                const data = await res.json();
                onChange(data.url);
                router.refresh(); // Ensure global state updates
            } else {
                console.error('Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
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
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="absolute top-1 right-1 p-1 bg-white/80 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
                            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                    <p className="text-xs text-slate-500">
                        Supported formats: JPG, PNG, WEBP. Max size: 5MB.
                    </p>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
}
