// src/components/ConfigSections/StickySessions.tsx

import React, { useState } from 'react';
import { StickySessionsConfig } from '../../interfaces/StickySessions';

const StickySessions: React.FC = () => {
  const [config, setConfig] = useState<StickySessionsConfig>({
    method: 'cookie',
    cookieName: 'srv_id',
    expires: '1h',
    domain: '.example.com',
    path: '/'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig((prev: StickySessionsConfig) => ({ ...prev, [name]: value }));
  };  

  return (
    <div className="sticky-sessions-config">
      <div className="form-group">
        <label>Method:</label>
        <select
          className="form-control"
          name="method"
          value={config.method}
          onChange={handleInputChange}
        >
          <option value="cookie">Cookie</option>
          {/* Add other methods here if needed in the future */}
        </select>
      </div>

      <div className="form-group">
        <label>Cookie Name:</label>
        <input 
          type="text" 
          className="form-control" 
          name="cookieName" 
          value={config.cookieName}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Expires:</label>
        <input 
          type="text" 
          className="form-control" 
          name="expires"
          value={config.expires}
          onChange={handleInputChange}
          placeholder="e.g. 1h"
        />
      </div>

      <div className="form-group">
        <label>Domain:</label>
        <input 
          type="text" 
          className="form-control" 
          name="domain"
          value={config.domain}
          onChange={handleInputChange}
          placeholder="e.g. .example.com"
        />
      </div>

      <div className="form-group">
        <label>Path:</label>
        <input 
          type="text" 
          className="form-control" 
          name="path"
          value={config.path}
          onChange={handleInputChange}
          placeholder="e.g. /"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}
    </div>
  );
}

export default StickySessions;
