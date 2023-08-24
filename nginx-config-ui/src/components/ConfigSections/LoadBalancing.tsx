// src/components/ConfigSections/LoadBalancing.tsx

import React, { useState, useEffect } from 'react';
import LoadBalancingService from '../../services/LoadBalancingService';
import { BackendServer } from '../../interfaces/LoadBalancing';

const LoadBalancing: React.FC = () => {
  const [servers, setServers] = useState<BackendServer[]>([]);

  useEffect(() => {
    LoadBalancingService.getServers().then((data) => {
      setServers(data);
    });
  }, []);
  
  const [newServer, setNewServer] = useState<{ name: string; url: string }>({ name: '', url: '' });

  const addServer = () => {
    if (newServer.name && newServer.url) {
      setServers([...servers, { ...newServer, id: Date.now() }]);
      setNewServer({ name: '', url: '' });  // Reset input fields
    }
  };

  const removeServer = (id: number) => {
    setServers(servers.filter(server => server.id !== id));
  };

  return (
    <div className="load-balancing container mt-4">
      <div className="row mb-3">
        <div className="col">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Server Name" 
            value={newServer.name}
            onChange={e => setNewServer({ ...newServer, name: e.target.value })}
          />
        </div>
        <div className="col">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Server URL" 
            value={newServer.url}
            onChange={e => setNewServer({ ...newServer, url: e.target.value })}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={addServer}>Add Server</button>
        </div>
      </div>

      <ul className="list-group">
        {servers.map(server => (
          <li key={server.id} className="list-group-item d-flex justify-content-between align-items-center">
            {server.name} ({server.url})
            <button className="btn btn-danger btn-sm" onClick={() => removeServer(server.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LoadBalancing;
