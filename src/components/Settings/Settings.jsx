import React, { useState } from 'react';

const Settings = () => {
    const [activeStep, setActiveStep] = useState('step-1');
    const [filtersVisible, setFiltersVisible] = useState(false);

    const showStep = (stepId) => {
        setActiveStep(stepId);
    };

    const toggleFilters = (value) => {
        setFiltersVisible(value === 'yes');
    };

    return (
        <div>
            <head>
                <title>Dynamic Div Sections</title>
                <style>
                    {`
                        .step {
                            display: none;
                        }
                        .step.active {
                            display: block;
                        }
                    `}
                </style>
            </head>
            <body>
                <button onClick={() => showStep('step-1')}>Show Step 1</button>
                <button onClick={() => showStep('step-2')}>Show Step 2</button>
                <button onClick={() => showStep('step-3')}>Show Step 3</button>

                <form>
                    <div id="step-1" className={`step ${activeStep === 'step-1' ? 'active' : ''}`}>
                        <h2>Step 1</h2>
                        <label htmlFor="inputDataPath">1. Input Data Path:</label>
                        <input type="text" id="inputDataPath" name="inputDataPath" /><br /><br />
                        
                        <label htmlFor="applyFilters">2. Apply Filters?</label>
                        <select id="applyFilters" name="applyFilters" onChange={(e) => toggleFilters(e.target.value)}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </select><br /><br />

                        {filtersVisible && (
                            <div id="filterOptions">
                                <label htmlFor="filters">4. Specify Filters:</label>
                                <select id="filters" name="filters" multiple>
                                    <option value="filter1">Filter 1</option>
                                    <option value="filter2">Filter 2</option>
                                    <option value="filter3">Filter 3</option>
                                </select><br /><br />
                            </div>
                        )}

                        <label htmlFor="overlapTestId">5. ID for Overlap Test:</label>
                        <select id="overlapTestId" name="overlapTestId">
                            <option value="id1">ID 1</option>
                            <option value="id2">ID 2</option>
                            <option value="id3">ID 3</option>
                        </select><br /><br />
                    </div>

                    <div id="step-2" className={`step ${activeStep === 'step-2' ? 'active' : ''}`}>
                        <h2>Step 2</h2>
                        <label htmlFor="dateRange">1. Date Range:</label>
                        <input type="date" id="startDate" name="startDate" /> to 
                        <input type="date" id="endDate" name="endDate" /><br /><br />
                    </div>

                    <div id="step-3" className={`step ${activeStep === 'step-3' ? 'active' : ''}`}>
                        <h2>Step 3</h2>
                        <label htmlFor="outputPath">1. Output Path:</label>
                        <input type="text" id="outputPath" name="outputPath" /><br /><br />
                        
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </body>
        </div>
    );
};

export default Settings;
