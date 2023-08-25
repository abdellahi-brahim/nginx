// src/components/ConfigSections/ErrorPages.tsx

import React, { useState } from 'react';
import '../../styles/ErrorPages.scss';
import AceEditor from 'react-ace';
import { Parser } from "htmlparser2";

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
  const [shouldRenderPreview, setShouldRenderPreview] = useState(false);

  const renderPreview = () => {
    if (!shouldRenderPreview) return null;
    const content = config[selectedErrorCode];
    let html = content.html;
    if (content.css.trim()) html = `<style>${content.css}</style>` + html;
    if (content.js.trim()) html += `<script type="text/javascript">${content.js}</script>`;
    return <iframe srcDoc={html} title="Preview" className="preview-iframe" />;
  };

  const handleEditorChange = (newValue: string) => {
    setConfig(prev => ({
      ...prev,
      [selectedErrorCode]: { ...prev[selectedErrorCode], [currentMode]: newValue }
    }));
  };

  return (
    <div className="error-pages-config">
      <div className="form-group">
        <label>Select Error Code:</label>
        <select
          className="form-control"
          value={selectedErrorCode}
          onChange={(e) => setSelectedErrorCode(e.target.value as ErrorCode)}
        >
          {Object.keys(config).map(code => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      </div>

      <div className="editor-section">
        <div className="editor-controls mb-3">
          <div className="editor-mode-selector btn-group">
            <button className={`btn ${currentMode === 'html' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentMode('html')}>HTML</button>
            <button className={`btn ${currentMode === 'css' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentMode('css')}>CSS</button>
            <button className={`btn ${currentMode === 'js' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setCurrentMode('js')}>JS</button>
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
          className="editor"
        />

        <button className="btn btn-info mt-3" onClick={() => setShouldRenderPreview(true)}>Render Preview</button>
      </div>

      <div className="preview-section mt-4">
        {renderPreview()}
      </div>
    </div>
  );
}

export default ErrorPages;
