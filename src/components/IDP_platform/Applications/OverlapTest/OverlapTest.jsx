import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './OverlapTest.css';

import axios from 'axios';
import { useAuth } from 'contexts/AuthContext';

const OverlapTest = () => {
  const { currentUser, organization } = useAuth();
          
  

  return ( 
    // <div className="overlap-test">
    //   <div className="nav-buttons">
    //     <NavLink to="./input-processing" className="nav-button" activeClassName="active">Input Processing</NavLink>
    //     <img className="arrow-icon" src={arrowicon} alt="Arrow Icon" />
    //     <NavLink to="./overlap-test-input" className="nav-button" activeClassName="active">Overlap Test</NavLink>
    //     <img className="arrow-icon" src={arrowicon} alt="Arrow Icon" />
    //     <NavLink to="./output-processing" className="nav-button" activeClassName="active">Output Processing</NavLink>
    //   </div>
      

    //   <Outlet />
    // </div>
    <div className="overlap-test">
      <iframe src={`https://idp.predactiv.com/apps/get_app_html_template/${organization}/overlap_test`} title="Overlap Test" width="100%" height="600px" style={{ border: 'none' }}></iframe>
    </div>
  );
}

export default OverlapTest;
