import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Code from '@editorjs/code';
import Link from '@editorjs/link';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';
import axios from 'axios';

const ContentEditor = ({ initialData, onSave }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3],
              defaultLevel: 2
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: `${API_URL}/api/upload`,
                byUrl: `${API_URL}/api/fetch-image`
              },
              additionalRequestData: {
                // This will be sent with your image upload request
                authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          },
          code: Code,
          link: Link,
          quote: {
            class: Quote,
            inlineToolbar: true,
          }
        },
        data: initialData?.data ? JSON.parse(initialData.data) : {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Start writing your blog post..."
              }
            }
          ]
        },
        onReady: () => {
          setIsEditorReady(true);
        }
      });
      editorRef.current = editor;
    }
    
    return () => {
      if (editorRef.current && isEditorReady) {
        editorRef.current.isReady
          .then(() => {
            editorRef.current.destroy();
            editorRef.current = null;
          })
          .catch((e) => console.error('Error destroying editor:', e));
      }
    };
  }, [initialData, isEditorReady]);

  const handleSave = async () => {
    if (!editorRef.current || !isEditorReady) return;
    if (!title.trim()) {
      setError('Please enter a title for your post');
      return;
    }
    
    setIsSaving(true);
    setError('');
    
    try {
      const outputData = await editorRef.current.save();
      
      // For local state update
      const postData = {
        title,
        excerpt,
        data: JSON.stringify(outputData)
      };
      
      // Call the API to save the content
      if (initialData?.id) {
        // Update existing post
        await saveToBackend(initialData.id, postData);
      } else {
        // Create new post
        await saveToBackend(null, postData);
      }
      
      // Notify parent component
      onSave(postData);
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const saveToBackend = async (id, postData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('excerpt', postData.excerpt || '');
    formData.append('data', postData.data);
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };
    
    if (id) {
      // Update existing post
      await axios.put(`${API_URL}/api/content/update/${id}`, formData, config);
    } else {
      // Create new post
      await axios.post(`${API_URL}/api/content/addcontent`, formData, config);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0"
        />
      </div>
      
      <div className="mb-6">
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Enter a brief excerpt (optional)"
          className="w-full text-gray-600 border-none focus:outline-none focus:ring-0 resize-none"
          rows={2}
        />
      </div>
      
      <div id="editorjs" className="prose max-w-none min-h-[300px]" />
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || !isEditorReady}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : initialData?.id ? 'Update Post' : 'Save Post'}
        </button>
      </div>
    </div>
  );
};

export default ContentEditor;