import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Code from '@editorjs/code';
import Link from '@editorjs/link';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';

const BlogEditor = ({ initialData, onSave }) => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(null);
  const [title, setTitle] = useState(initialData?.title || '');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);

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
              defaultLevel: 1
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
                byFile: 'http://localhost:8000/uploadFile', // Your image upload endpoint
                byUrl: 'http://localhost:8000/fetchUrl', // Your URL fetch endpoint
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
        data: initialData?.content || {
          blocks: [
            {
              type: "paragraph",
              data: {
                text: "Start writing your blog post..."
              }
            }
          ]
        },
        onChange: async () => {
          const outputData = await editor.save();
          setEditorData(outputData);
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

    setIsSaving(true);
    try {
      const outputData = await editorRef.current.save();
      console.log('Editor data:', outputData); // Log the JSON output
      onSave({
        title,
        content: outputData
      });
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full text-2xl font-bold border-none focus:outline-none focus:ring-0"
        />
      </div>
      <div id="editorjs" className="prose max-w-none min-h-[300px]" />
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || !isEditorReady}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Post'}
        </button>
      </div>
    </div>
  );
};

export default BlogEditor; 