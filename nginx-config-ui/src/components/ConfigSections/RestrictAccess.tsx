// src/components/ConfigSections/RestrictAccess.tsx

import React, { useState } from 'react';
import { AccessRule, RestrictAccessConfig } from '../../interfaces/RestrictAccess';

const RestrictAccess: React.FC = () => {
  const [config, setConfig] = useState<RestrictAccessConfig>([]);
  const [newRule, setNewRule] = useState<AccessRule>({ action: 'allow', ip: '' });

  const addRule = () => {
    setConfig([...config, newRule]);
    setNewRule({ action: 'allow', ip: '' });
  };

  const removeRule = (index: number) => {
    const newConfig = [...config];
    newConfig.splice(index, 1);
    setConfig(newConfig);
  };

  return (
    <div className="restrict-access-config">

      {/* Display Access Rules in a Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Action</th>
            <th>IP / IP Range</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {config.map((rule, index) => (
            <tr key={index}>
              <td>{rule.action}</td>
              <td>{rule.ip}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeRule(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Section to Add New Access Rules */}
      <div className="add-rule-section">
        <h4>Add Access Rule</h4>

        <div className="form-group">
          <label>Action:</label>
          <select 
            className="form-control" 
            value={newRule.action}
            onChange={(e) => setNewRule(prev => ({ ...prev, action: e.target.value as 'allow' | 'deny' }))}
          >
            <option value="allow">Allow</option>
            <option value="deny">Deny</option>
          </select>
        </div>

        <div className="form-group">
          <label>IP / IP Range:</label>
          <input 
            type="text" 
            className="form-control" 
            value={newRule.ip}
            onChange={(e) => setNewRule(prev => ({ ...prev, ip: e.target.value }))}
            placeholder="e.g. 192.168.1.0/24"
          />
        </div>

        <button className="btn btn-primary" onClick={addRule}>Add Rule</button>
      </div>

    </div>
  );
}

export default RestrictAccess;
