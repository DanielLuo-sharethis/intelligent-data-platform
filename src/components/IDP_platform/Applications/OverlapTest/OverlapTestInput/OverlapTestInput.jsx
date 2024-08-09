import React from 'react';
import './OverlapTestInput.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OverlapTestInput = () => {
    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        navigate('/current-application/overlap-test/output-processing');
    }
    return (
        <>
        <span className='please-set'>Please set the runtime inputs for Overlap Test</span>
        <div className='overlap-test-input'>
            <div className='date-group'>
                <div className="each-date">
                    <p>Start Date</p>
                    <input type="date" id="start-date" name="start-date" />
                </div>
                <div className="each-date">
                    <p>End Date</p>
                    <input type="date" id="end-date" name="end-date" />
                </div>
            </div>
            <div className='button-wrapper'>    
                <button type="submit" className="next-button" onClick={handleNext}>Next</button>
            </div>
        </div>

        </>
    





    )
    }

export default OverlapTestInput;