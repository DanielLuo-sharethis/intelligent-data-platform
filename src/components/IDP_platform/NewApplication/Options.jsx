import React, { useState } from 'react';
import './Options.css'; // Create and use a separate CSS file for styling

const Options = ({ options, handleOptionClick }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    if (!options || options.length === 0) return null; // Return null if options is undefined or empty
    console.log("In Options", options);

    const handleClick = (option) => {
        setSelectedOption(option);
        handleOptionClick(option);
    };

    return (
        <div className="options-container">
            {options.map((option, index) => (
                <button
                    key={index}
                    className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                    onClick={() => handleClick(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Options;
