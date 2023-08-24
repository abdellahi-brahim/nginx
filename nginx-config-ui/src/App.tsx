// src/App.tsx

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoadBalancing from './components/ConfigSections/LoadBalancing';
// ... Import other configuration components ...

interface ConfigOption {
  id: number;
  name: string;
  component: JSX.Element;
}

const configOptions: ConfigOption[] = [
  { id: 1, name: 'Load Balancing', component: <LoadBalancing /> },
  // Add other configurations here. Example:
  // { id: 2, name: 'SSL/TLS Termination', component: <SSLTLS /> },
  // ...
];

const App: React.FC = () => {
  // State to track the currently selected configuration
  const [selectedConfig, setSelectedConfig] = useState<ConfigOption>(configOptions[0]);

  return (
    <div className="App">
      <Navbar />
      <Sidebar options={configOptions} onOptionSelect={setSelectedConfig} />
      <div className="content">
        {selectedConfig.component}
      </div>
    </div>
  );
}

export default App;
