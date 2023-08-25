// src/components/ConfigSections/Timeouts.tsx

import React, { useState } from 'react';
import { TimeoutsConfig } from '../../interfaces/Timeouts';

const Timeouts: React.FC = () => {
  const [config, setConfig] = useState<TimeoutsConfig>({
    connectTimeout: '',
    sendTimeout: '',
    readTimeout: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="timeouts-config">

      <div className="form-group">
        <label>Connection Timeout:</label>
        <input 
          type="text" 
          className="form-control" 
          name="connectTimeout" 
          value={config.connectTimeout}
          onChange={handleInputChange}
          placeholder="e.g. 60s"
        />
      </div>

      <div className="form-group">
        <label>Send Timeout:</label>
        <input 
          type="text" 
          className="form-control" 
          name="sendTimeout" 
          value={config.sendTimeout}
          onChange={handleInputChange}
          placeholder="e.g. 90s"
        />
      </div>

      <div className="form-group">
        <label>Read Timeout:</label>
        <input 
          type="text" 
          className="form-control" 
          name="readTimeout" 
          value={config.readTimeout}
          onChange={handleInputChange}
          placeholder="e.g. 90s"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default Timeouts;
