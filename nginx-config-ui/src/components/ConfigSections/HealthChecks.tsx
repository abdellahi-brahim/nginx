// src/components/ConfigSections/HealthChecks.tsx

import React, { useState } from 'react';
import { HealthChecksConfig } from '../../interfaces/HealthChecks';

const HealthChecks: React.FC = () => {
  const [config, setConfig] = useState<HealthChecksConfig>({
    interval: '30s'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="health-checks-config">
      <div className="form-group">
        <label>Health Check Interval:</label>
        <input 
          type="text" 
          className="form-control" 
          name="interval" 
          value={config.interval}
          onChange={handleInputChange}
          placeholder="e.g. 30s"
        />
      </div>

      {/* Add other health check parameters here if needed. */}
      
      {/* You can add a submit button here to process the form data if needed */}
    </div>
  );
}

export default HealthChecks;
