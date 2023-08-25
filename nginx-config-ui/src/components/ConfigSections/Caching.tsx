// src/components/ConfigSections/Caching.tsx

import React, { useState } from 'react';
import { CachingConfig } from '../../interfaces/Caching';

const Caching: React.FC = () => {
  const [config, setConfig] = useState<CachingConfig>({
    cachePath: '',
    cacheLevels: '',
    keysZone: '',
    cacheSize: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="caching-config">

      <div className="form-group">
        <label>Cache Path:</label>
        <input 
          type="text" 
          className="form-control" 
          name="cachePath" 
          value={config.cachePath}
          onChange={handleInputChange}
          placeholder="/path/to/cache"
        />
      </div>

      <div className="form-group">
        <label>Cache Levels:</label>
        <input 
          type="text" 
          className="form-control" 
          name="cacheLevels"
          value={config.cacheLevels}
          onChange={handleInputChange}
          placeholder="e.g. 1:2"
        />
      </div>

      <div className="form-group">
        <label>Keys Zone:</label>
        <input 
          type="text" 
          className="form-control" 
          name="keysZone"
          value={config.keysZone}
          onChange={handleInputChange}
          placeholder="e.g. my_cache:10m"
        />
      </div>

      <div className="form-group">
        <label>Cache Size:</label>
        <input 
          type="text" 
          className="form-control" 
          name="cacheSize"
          value={config.cacheSize}
          onChange={handleInputChange}
          placeholder="e.g. 10m"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default Caching;
