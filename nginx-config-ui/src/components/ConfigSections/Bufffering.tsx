// src/components/ConfigSections/Buffering.tsx

import React, { useState } from 'react';
import { BufferingConfig } from '../../interfaces/Buffering';

const Buffering: React.FC = () => {
  const [config, setConfig] = useState<BufferingConfig>({
    isEnabled: true,
    bufferSize: '',
    bufferCount: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="buffering-config">

      <div className="form-group">
        <label>
          <input 
            type="checkbox" 
            name="isEnabled"
            checked={config.isEnabled}
            onChange={handleCheckboxChange}
          />
          {' '}
          Enable Buffering
        </label>
      </div>

      <div className="form-group">
        <label>Buffer Size:</label>
        <input 
          type="text" 
          className="form-control" 
          name="bufferSize" 
          value={config.bufferSize}
          onChange={handleInputChange}
          placeholder="e.g. 16k"
        />
      </div>

      <div className="form-group">
        <label>Buffer Count:</label>
        <input 
          type="text" 
          className="form-control" 
          name="bufferCount"
          value={config.bufferCount}
          onChange={handleInputChange}
          placeholder="e.g. 4 64k"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default Buffering;
