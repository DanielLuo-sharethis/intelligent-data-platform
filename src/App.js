import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import TopNav from './components/TopNav/TopNav';
import MainContent from './components/MainContent/MainContent';
import CurrentApplication from './components/CurrentApplication/CurrentApplication';
import NewApplication from './components/NewApplication/NewApplication';
import RunHistory from './components/RunHistory/RunHistory';
import Settings from './components/Settings/Settings';
import NotFound from './components/NotFound';

import OverlapTest from './components/Applications/OverlapTest/OverlapTest';
import InputProcessing from './components/Applications/OverlapTest/InputProcessing/InputProcessing';
import OverlapTestInput from './components/Applications/OverlapTest/OverlapTestInput/OverlapTestInput';
import OutputProcessing from './components/Applications/OverlapTest/OutputProcessing/OutputProcessing';

import ScaleEstimate from './components/Applications/ScaleEstimate/ScaleEstimate';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    
      <div className="App">
        <Sidebar />
        <div className="right-section">
          <TopNav />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/current-application" element={<CurrentApplication />} />
              <Route path="/current-application/overlap-test" element={<OverlapTest />}>
                <Route index element={<InputProcessing  />} />
                <Route path="input-processing" element={<InputProcessing />} />
                <Route path="overlap-test-input" element={<OverlapTestInput />} />
                <Route path="output-processing" element={<OutputProcessing />} />
              </Route>
              
              <Route path="/current-application/scale-estimate" element={<ScaleEstimate />} />
              <Route path="/new-application" element={<NewApplication />} />
              <Route path="/run-history" element={<RunHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </div>
        </div>
      </div>
    
  );
}

export default App;
