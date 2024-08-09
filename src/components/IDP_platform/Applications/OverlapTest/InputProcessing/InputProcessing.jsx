import React from 'react';
import './InputProcessing.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputProcessing = () => {
    const [applyFilters, setApplyFilters] = useState(true);
    const navigate = useNavigate();

    const handleRadioChange = (event) => {
        setApplyFilters(event.target.value === 'yes');
    };

    const handleNext = (event) => {
        event.preventDefault();
        navigate('/current-application/overlap-test/overlap-test-input'); // Navigate to the OverlapTestInput route
        
    };

  return (
    <>
    <span className='please-set'>Please set the runtime inputs for Input Processing</span>
    
    <div className="input-processing">
        
        <div className="field-group">
          <label className="field-label" htmlFor="input-path">Input data Path</label>
          <input className =""type="text" id="input-path" name="input-path" defaultValue="s3.thisisinputpath" />
        </div>
        <div className=" filter-group">
          <label className="field-label">Apply Filters?</label>
          <div className="radio-group">
            <input type="radio" id="apply-filters-yes" name="apply-filters" value="yes" onChange={handleRadioChange} defaultChecked />
            <label className="field-label" htmlFor="apply-filters-yes">Yes</label>
            <input type="radio" id="apply-filters-no" name="apply-filters" value="no" onChange={handleRadioChange}/>
            <label className="field-label" htmlFor="apply-filters-no">No</label>
          </div>
        </div>
        {applyFilters && (
          <div className="field-group">
            <label className="field-label" htmlFor="device-type">Device Type</label>
            <select id="device-type" name="device-type">
              <option value="Personal Computer">Personal Computer</option>
              <option value="SmartPhone">SmartPhone</option>
            </select>
          </div>
        )}
        <div className="field-group">
          <label className="field-label" htmlFor="demo-id">ID for Demo Overlap Test</label>
          <input type="text" id="demo-id" name="demo-id" defaultValue="RandomID" />
        </div>

        <div className='button-wrapper'>    
                <button type="submit" className="next-button" onClick={handleNext}>Next</button>
        </div>
      
    </div>


    </>
  );
}

export default InputProcessing;
