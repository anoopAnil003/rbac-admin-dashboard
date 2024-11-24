import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <span className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </span>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default Header;
