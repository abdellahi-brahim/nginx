// src/components/ConfigSections/HeaderModifications.tsx

import React, { useState } from 'react';
import { Header, HeaderModificationsConfig } from '../../interfaces/HeaderModifications';

const HeaderModifications: React.FC = () => {
  const [config, setConfig] = useState<HeaderModificationsConfig>([]);
  const [newHeader, setNewHeader] = useState<Header>({ key: '', value: '' });

  const addHeader = () => {
    setConfig([...config, newHeader]);
    setNewHeader({ key: '', value: '' });
  };

  const removeHeader = (index: number) => {
    const newConfig = [...config];
    newConfig.splice(index, 1);
    setConfig(newConfig);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<Header>>) => {
    const name = e.target.name as keyof Header;
    setter(prev => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="header-modifications-config">
      {/* Display Headers in a Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Header Key</th>
            <th>Header Value</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {config.map((header, index) => (
            <tr key={index}>
              <td>{header.key}</td>
              <td>{header.value}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeHeader(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section to Add New Headers */}
      <div className="add-header-section">
        <h4>Add New Header</h4>
        <div className="form-group">
          <label>Key:</label>
          <input 
            type="text" 
            className="form-control" 
            name="key"
            value={newHeader.key}
            onChange={(e) => handleInputChange(e, setNewHeader)}
            placeholder="Header Key"
          />
        </div>

        <div className="form-group">
          <label>Value:</label>
          <input 
            type="text" 
            className="form-control" 
            name="value"
            value={newHeader.value}
            onChange={(e) => handleInputChange(e, setNewHeader)}
            placeholder="Header Value"
          />
        </div>

        <button className="btn btn-primary" onClick={addHeader}>Add Header</button>
      </div>
    </div>
  );
}

export default HeaderModifications;
