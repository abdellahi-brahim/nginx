// src/components/Sidebar.tsx

import React from 'react';

interface SidebarProps {
  options: { id: number; name: string; component: JSX.Element }[];
  onOptionSelect: (option: { id: number; name: string; component: JSX.Element }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ options, onOptionSelect }) => {
    return (
      <div className="sidebar bg-light">
        <div className="list-group">
          {options.map((option) => (
            <button 
              key={option.id} 
              className="list-group-item list-group-item-action" 
              onClick={() => onOptionSelect(option)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

export default Sidebar;
