'use client';

import { uploadFile, uploadMultipleFiles } from '@/app/lib/actions/upload';

// Helper function to simulate fetch API response for single file upload
export async function uploadSingleFile(file: File): Promise<Response> {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const result = await uploadFile(formData);
    
    // Create a Response-like object that matches what the fetch API would return
    const responseData = result.success 
      ? { success: true, url: result.url, filename: result.filename }
      : { error: result.error };
    
    return new Response(JSON.stringify(responseData), {
      status: result.success ? 201 : 400,
      statusText: result.success ? 'Created' : 'Bad Request',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Helper function to simulate fetch API response for multiple files upload  
export async function uploadFiles(files: File[]): Promise<Response> {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  try {
    const result = await uploadMultipleFiles(formData);
    
    // Create a Response-like object that matches what the fetch API would return
    const responseData = result.success 
      ? { files: result.files }
      : { error: result.error };
    
    return new Response(JSON.stringify(responseData), {
      status: result.success ? 200 : 400,
      statusText: result.success ? 'OK' : 'Bad Request',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Drop-in replacement for fetch calls to /api/admin/upload
export async function uploadViaServerAction(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  // Only handle POST requests to our upload endpoints
  if (init?.method === 'POST' && (
    input === '/api/admin/upload' || 
    input === '/api/admin/media' || 
    String(input).includes('/api/admin/upload') ||
    String(input).includes('/api/admin/media')
  )) {
    
    const formData = init.body as FormData;
    if (formData && formData instanceof FormData) {
      
      // Check if it's single file (key: 'file') or multiple files (key: 'files')
      const singleFile = formData.get('file') as File;
      const multipleFiles = formData.getAll('files') as File[];
      
      if (singleFile) {
        return uploadSingleFile(singleFile);
      } else if (multipleFiles.length > 0) {
        return uploadFiles(multipleFiles);
      }
    }
  }
  
  // Fallback to regular fetch for other requests
  return fetch(input, init);
}