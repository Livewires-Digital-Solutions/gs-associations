'use client';

import { useRef, useState } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ImageUploadProps {
  /** Current image URL (to show preview) */
  value: string;
  /** Called with the public URL after successful upload */
  onChange: (url: string) => void;
  /** Supabase storage bucket name */
  bucket?: string;
  /** Subfolder within the bucket */
  folder?: string;
  /** Label shown above the upload area */
  label?: string;
  /** Allow multiple files (returns first URL via onChange) */
  multiple?: boolean;
  /** Called with all uploaded URLs when multiple=true */
  onMultipleChange?: (urls: string[]) => void;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = 'uploads',
  folder = 'images',
  label,
  multiple = false,
  onMultipleChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      if (multiple && onMultipleChange) {
        const urls = await Promise.all(Array.from(files).map(uploadFile));
        onMultipleChange(urls);
      } else {
        const url = await uploadFile(files[0]);
        onChange(url);
      }
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-2">
      {label && <label className="label block">{label}</label>}

      {/* Drop zone / trigger */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden
          ${dragOver ? 'border-navy-500 bg-navy-50' : 'border-surface-200 hover:border-navy-400 hover:bg-surface-50'}
          ${uploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {value ? (
          /* Preview */
          <div className="relative group">
            <img
              src={value}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Upload className="w-6 h-6 text-white" />
              <span className="text-white text-sm font-medium">Change Image</span>
            </div>
            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-navy-500 animate-spin mb-3" />
                <p className="text-sm font-medium text-navy-600">Uploading...</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6 text-surface-400" />
                </div>
                <p className="text-sm font-semibold text-surface-700 mb-1">
                  {multiple ? 'Click or drag images here' : 'Click or drag image here'}
                </p>
                <p className="text-xs text-surface-400">PNG, JPG, WEBP up to 10MB</p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
