// src/App.tsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoadBalancing from './components/ConfigSections/LoadBalancing';
import SSLTLSTermination from './components/ConfigSections/SSLTLSTermination';
import WebSocketUpgrade from './components/ConfigSections/WebSocketUpgrade';
import Caching from './components/ConfigSections/Caching';
import Compression from './components/ConfigSections/Compression';
import Buffering from './components/ConfigSections/Bufffering';
import Timeouts from './components/ConfigSections/Timeouts';
import HeaderModifications from './components/ConfigSections/HeaderModifications';
import RestrictAccess from './components/ConfigSections/RestrictAccess';
import HealthChecks from './components/ConfigSections/HealthChecks';
import StickySessions from './components/ConfigSections/StickySessions';
import ErrorPages from './components/ConfigSections/ErrorPages';
import RateLimiting from './components/ConfigSections/RateLimiting';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ConfigOption } from './interfaces/ConfigOption';

const configOptions: ConfigOption[] = [
  { id: 1, name: 'Load Balancing', component: <LoadBalancing /> },
  { id: 2, name: 'SSL/TLS Termination', component: <SSLTLSTermination /> },
  { id: 3, name: 'WebSocket Upgrade', component: <WebSocketUpgrade /> },
  { id: 4, name: 'Caching', component: <Caching /> },
  { id: 5, name: 'Compression', component: <Compression /> },
  { id: 6, name: 'Buffering', component: <Buffering /> },
  { id: 7, name: 'Timeouts', component: <Timeouts /> },
  { id: 8, name: 'Header Modifications', component: <HeaderModifications /> },
  { id: 9, name: 'Restrict Access', component: <RestrictAccess /> },
  { id: 10, name: 'Health Checks', component: <HealthChecks /> },
  { id: 11, name: 'Sticky Sessions', component: <StickySessions /> },
  { id: 12, name: 'Error Pages', component: <ErrorPages /> },
  { id: 13, name: 'Rate Limiting', component: <RateLimiting /> }
];

const App: React.FC = () => {
  const [selectedConfig, setSelectedConfig] = useState<ConfigOption>(configOptions[0]);

  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 p-0 bg-light">
            <Sidebar options={configOptions} onOptionSelect={setSelectedConfig} />
          </div>
          <div className="col-md-9 col-lg-10 p-4">
            {selectedConfig.component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
