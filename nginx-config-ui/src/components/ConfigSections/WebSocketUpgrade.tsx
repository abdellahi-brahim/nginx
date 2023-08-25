// src/components/ConfigSections/WebSocketUpgrade.tsx

import React, { useState } from 'react';
import { WebSocketConfig } from '../../interfaces/WebSocketUpgrade';

const WebSocketUpgrade: React.FC = () => {
  const [config, setConfig] = useState<WebSocketConfig>({
    endpoint: '',
    backendServer: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="websocket-config">

      <div className="form-group">
        <label>WebSocket Endpoint:</label>
        <input 
          type="text" 
          className="form-control" 
          name="endpoint" 
          value={config.endpoint}
          onChange={handleInputChange}
          placeholder="/ws/"
        />
      </div>

      <div className="form-group">
        <label>Backend Server Address:</label>
        <input 
          type="text" 
          className="form-control" 
          name="backendServer"
          value={config.backendServer}
          onChange={handleInputChange}
          placeholder="http://backend.example.com"
        />
      </div>

      {/* You can add a submit button here to process the form data if needed */}

    </div>
  );
}

export default WebSocketUpgrade;
