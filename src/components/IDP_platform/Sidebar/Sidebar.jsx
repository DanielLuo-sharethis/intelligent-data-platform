import React from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import predactiv_logo from 'assets/predactiv-logo.svg';
import currentApplicationIcon from 'assets/currentApplication.svg';
import newApplicationIcon from 'assets/newApplication.svg';
import runHistoryIcon from 'assets/runHistory.svg';
import settingsIcon from 'assets/settings.svg';
import predactiv_TM from 'assets/predactiv_TM.svg';



function Sidebar() {
  const location = useLocation();
  const isNewApplicationPage = location.pathname === '/new-application';


  return (
    <div className="sidebar">
      <div className="sidebar-logo-frame">

        <div className='sidebar-logo-frame-top-group'>
          <img className='logo-img' src={predactiv_logo} alt="Predactiv Logo" />
          <div className="sidebar-logo-frame-top-group-text">
            <img className='predactiv_TM' src={predactiv_TM} alt="predactiv_TM"/>
            <p className='text-intelligent-data-platform'>Intelligent Data Platform</p>
          </div>
        </div>

        {isNewApplicationPage ? (
          <div className="gpt-selection">
            <div className="gpt-4">
              <input type="radio" id="gpt-4" name="gpt-version" value="gpt-4" />
              <label htmlFor="gpt-4">GPT-4</label>
            </div>
            <div className="gpt-3.5">
              <input type="radio" id="gpt-3.5" name="gpt-version" value="3.5" />
              <label htmlFor="gpt-3.5">GPT-3.5</label>
            </div>
          </div>
        ):(
          <div className='gpt-selection-space'>

          </div>

        )}



      </div>



      <nav className="sidebar-nav">
        <Link to="/dashboard/current-application"  className={`sidebar-nav-item ${location.pathname === '/dashboard/current-application' ? 'active' : ''}`}>
          <img className="nav-icon" src={currentApplicationIcon} alt="Current Application Icon" />
          Current Applications
        </Link>
        <Link to="/dashboard/new-application" className={`sidebar-nav-item ${location.pathname === '/dashboard/new-application' ? 'active' : ''}`}>
          <img className="nav-icon" src={newApplicationIcon} alt="New Application Icon" />
          New Applications
        </Link>
        <Link to="/dashboard/run-history" className={`sidebar-nav-item ${location.pathname === '/dashboard/run-history' ? 'active' : ''}`}>
          <img className="nav-icon" src={runHistoryIcon} alt="Run History Icon" />
          Run History
        </Link>
        <Link to="/dashboard/settings" className={`sidebar-nav-item ${location.pathname === '/dashboard/settings' ? 'active' : ''}`}>
          <img className="nav-icon" src={settingsIcon} alt="Settings Icon" />
          Settings
        </Link>
        {/* <Link to="/dashboard/logout" className="sidebar-nav-logout">
          Logout
        </Link> */}
      </nav>
    </div>
  );
}

export default Sidebar;