// src/components/ConfigSections/RateLimiting.tsx

import React, { useState } from 'react';
import { RateLimitingConfig } from '../../interfaces/RateLimiting';

const RateLimiting: React.FC = () => {
  const [config, setConfig] = useState<RateLimitingConfig>({
    zoneName: '',
    rate: '',
    burst: undefined,
    delay: undefined
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig((prev: RateLimitingConfig) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rate-limiting-config">
      <div className="form-group row">
        <label htmlFor="zoneName" className="col-sm-2 col-form-label">Zone Name:</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="zoneName" name="zoneName" value={config.zoneName} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="rate" className="col-sm-2 col-form-label">Rate:</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="rate" name="rate" value={config.rate} onChange={handleInputChange} placeholder="e.g., 10r/s" />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="burst" className="col-sm-2 col-form-label">Burst (Optional):</label>
        <div className="col-sm-10">
          <input type="number" className="form-control" id="burst" name="burst" value={config.burst || ''} onChange={handleInputChange} />
        </div>
      </div>

      <div className="form-group row">
        <label htmlFor="delay" className="col-sm-2 col-form-label">Delay (Optional):</label>
        <div className="col-sm-10">
          <input type="number" className="form-control" id="delay" name="delay" value={config.delay || ''} onChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
}

export default RateLimiting;
