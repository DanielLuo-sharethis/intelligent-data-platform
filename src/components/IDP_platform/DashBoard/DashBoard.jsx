// src/components/IDP_platform/Dashboard/Dashboard.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from 'components/IDP_platform/Sidebar/Sidebar';
import TopNav from 'components/IDP_platform/TopNav/TopNav';
import MainContent from 'components/IDP_platform/MainContent/MainContent';
import CurrentApplication from 'components/IDP_platform/CurrentApplication/CurrentApplication';
import NewApplication from 'components/IDP_platform/NewApplication/NewApplication';
import RunHistory from 'components/IDP_platform/RunHistory/RunHistory';
import Settings from 'components/IDP_platform/Settings/Settings';
import NotFound from 'components/NotFound';


import ScaleEstimate from 'components/IDP_platform/Applications/ScaleEstimate/ScaleEstimate';
import OverlapTest from 'components/IDP_platform/Applications/OverlapTest/OverlapTest';
import UseCase from 'components/IDP_platform/Applications/UseCase/UseCase';

const DashBoard = () => {
  return (
    <>
      <Sidebar />
      <div className="right-section">
        <TopNav />
        <div className="content-area">
          <Routes>
            
            <Route path="/current-application" element={<CurrentApplication />} />
            {/* <Route path="/current-application/overlap-test" element={<OverlapTest />}>
              <Route index element={<InputProcessing />} />
              <Route path="input-processing" element={<InputProcessing />} />
              <Route path="overlap-test-input" element={<OverlapTestInput />} />
              <Route path="output-processing" element={<OutputProcessing />} />
            </Route> */}
           
            <Route path="/current-application/use-case/:use_case" element={<UseCase/>} />
            <Route path="/new-application" element={<NewApplication />} />
            <Route path="/run-history" element={<RunHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
