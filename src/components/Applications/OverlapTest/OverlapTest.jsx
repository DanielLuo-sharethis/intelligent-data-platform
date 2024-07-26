import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './OverlapTest.css';
import arrowicon from '../../../assets/arrow_right.svg';

const OverlapTest = () => {
  return (
    <div className="overlap-test">
      <div className="nav-buttons">
        <NavLink to="./input-processing" className="nav-button" activeClassName="active">Input Processing</NavLink>
        <img className="arrow-icon" src={arrowicon} alt="Arrow Icon" />
        <NavLink to="./overlap-test-input" className="nav-button" activeClassName="active">Overlap Test</NavLink>
        <img className="arrow-icon" src={arrowicon} alt="Arrow Icon" />
        <NavLink to="./output-processing" className="nav-button" activeClassName="active">Output Processing</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default OverlapTest;
