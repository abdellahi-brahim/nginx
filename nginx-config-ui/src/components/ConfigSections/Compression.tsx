// src/components/ConfigSections/Compression.tsx

import React, { useState } from 'react';
import Select from 'react-select';
import { CompressionConfig } from '../../interfaces/Compression';

const availableTypes = [
  'text/plain', 
  'text/css', 
  'application/json', 
  'application/x-javascript', 
  'text/xml', 
  'application/xml', 
  'application/xml+rss', 
  'text/javascript'
].map(type => ({ label: type, value: type }));

const Compression: React.FC = () => {
  const [config, setConfig] = useState<CompressionConfig>({
    isEnabled: true,
    compressTypes: []
});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setConfig(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: { value: string }) => option.value);
    setConfig(prev => ({ ...prev, compressTypes: selectedValues }));
  };

  return (
    <div className="compression-config">

      <div className="form-group">
        <label>
          <input 
            type="checkbox" 
            name="isEnabled"
            checked={config.isEnabled}
            onChange={handleCheckboxChange}
          />
          {' '}
          Enable Compression
        </label>
      </div>

      <div className="form-group">
        <label>Compression Types:</label>
        <Select 
          isMulti
          name="compressTypes"
          options={availableTypes}
          value={config.compressTypes.map(type => ({ label: type, value: type }))}
          onChange={handleSelectChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default Compression;
