// src/components/ConfigSections/SSLTLSTermination.tsx

import React, { useState } from 'react';
import { SSLTLSConfig } from '../../interfaces/SSLTLSTermination';

const SSLTLSTermination: React.FC = () => {
  const [config, setConfig] = useState<SSLTLSConfig>({
    domain: '',
    certText: '',
    certFile: null,
    keyText: '',
    keyFile: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'certFile' | 'keyFile') => {
    const file = e.target.files ? e.target.files[0] : null;
    setConfig(prev => ({ ...prev, [type]: file }));
  };

  return (
    <div className="ssl-tls-config">
      
      <div className="form-group">
        <label>Domain Name:</label>
        <input 
          type="text" 
          className="form-control" 
          name="domain" 
          value={config.domain}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>SSL Certificate:</label>
        <textarea 
          className="form-control mb-2" 
          name="certText"
          value={config.certText}
          onChange={handleInputChange}
          rows={10}
          placeholder="Enter the certificate content here"
        />
        <label>Or Upload SSL Certificate:</label>
        <input 
          type="file" 
          className="form-control-file" 
          onChange={(e) => handleFileChange(e, 'certFile')}
        />
      </div>

      <div className="form-group">
        <label>SSL Certificate Key:</label>
        <textarea 
          className="form-control mb-2" 
          name="keyText"
          value={config.keyText}
          onChange={handleInputChange}
          rows={10}
          placeholder="Enter the certificate key content here"
        />
        <label>Or Upload SSL Certificate Key:</label>
        <input 
          type="file" 
          className="form-control-file" 
          onChange={(e) => handleFileChange(e, 'keyFile')}
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default SSLTLSTermination;
