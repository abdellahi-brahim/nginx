// src/App.tsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoadBalancing from './components/ConfigSections/LoadBalancing';
import SSLTLSTermination from './components/ConfigSections/SSLTLSTermination';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ConfigOption } from './interfaces/ConfigOption';

const configOptions: ConfigOption[] = [
  { id: 1, name: 'Load Balancing', component: <LoadBalancing /> },
  { id: 2, name: 'SSL/TLS Termination', component: <SSLTLSTermination /> },
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
