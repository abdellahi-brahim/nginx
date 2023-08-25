// src/components/ConfigSections/ErrorPages.tsx

import React, { useState } from 'react';
import '../../styles/ErrorPages.scss';
import AceEditor from 'react-ace';
import { Parser } from "htmlparser2";
import { Handler } from "htmlparser2/lib/Parser";


import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

type ErrorCode = '500' | '502' | '503' | '504';

interface ErrorPageContent {
  html: string;
  css: string;
  js: string;
}

type ErrorPagesConfig = Record<ErrorCode, ErrorPageContent>;

const ErrorPages: React.FC = () => {
  const initialContent: ErrorPageContent = { html: '', css: '', js: '' };
  const [config, setConfig] = useState<ErrorPagesConfig>({
    '500': { ...initialContent },
    '502': { ...initialContent },
    '503': { ...initialContent },
    '504': { ...initialContent }
  });
  const [selectedErrorCode, setSelectedErrorCode] = useState<ErrorCode>('500');
  const [currentMode, setCurrentMode] = useState<'html' | 'css' | 'js'>('html');
  const [isEditorExpanded, setEditorExpanded] = useState(false);

  const isValidHTML = (html: string): boolean => {
    let isValid = true;
    const handler = {
      onerror(error: Error) {
          isValid = false;
      },
  };
  

    const parser = new Parser(handler);
    parser.write(html);
    parser.end();

    return isValid;
  };

  const renderPreview = () => {
    const content = config[selectedErrorCode];

    if (!isValidHTML(content.html)) {
      return <div>Invalid or empty HTML content. Preview is not available.</div>;
    }

    let html = content.html;
    if (content.css.trim()) {
      html = `<style>${content.css}</style>` + html;
    }
    if (content.js.trim()) {
      html += `<script type="text/javascript">${content.js}</script>`;
    }

    return <iframe srcDoc={html} title="Preview" style={{ width: '100%', height: '400px', border: '1px solid #ccc' }} />;
  };

  const handleEditorChange = (newValue: string) => {
    setConfig(prev => ({
      ...prev,
      [selectedErrorCode]: { ...prev[selectedErrorCode], [currentMode]: newValue }
    }));
  };

  return (
    <div className="error-pages-config d-flex">
      <div className="editor-section">
        {/* Editor mode selector, editor, and other UI components go here... */}
        <div className="editor-controls mb-3">
          <div className="editor-mode-selector btn-group">
            <button className="btn btn-outline-primary" onClick={() => setCurrentMode('html')}>HTML</button>
            <button className="btn btn-outline-primary" onClick={() => setCurrentMode('css')}>CSS</button>
            <button className="btn btn-outline-primary" onClick={() => setCurrentMode('js')}>JS</button>
          </div>
        </div>

        <AceEditor
          mode={currentMode}
          theme="monokai"
          onChange={handleEditorChange}
          value={config[selectedErrorCode][currentMode]}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{ width: '100%', height: isEditorExpanded ? '600px' : '300px' }}
        />
      </div>

      <div className="preview-section ml-4">
        {renderPreview()}
      </div>
    </div>
  );
}

export default ErrorPages;
