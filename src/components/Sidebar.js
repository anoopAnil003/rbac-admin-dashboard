import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaUsersCog, FaKey,FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        
        <li>
          <NavLink to="/user-management" activeClassName="active">
            <FaUser /> User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/role-management" activeClassName="active">
            <FaUsersCog /> Role Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/permission-management" activeClassName="active">
            <FaKey /> Permission Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">
            <FaSignOutAlt /> Sign Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
