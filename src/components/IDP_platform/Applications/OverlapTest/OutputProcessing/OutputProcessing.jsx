// import React from "react";
// import { useState } from "react";
// import cloudIcon from '../../../../assets/cloud-icon.png';
// import './OutputProcessing.css';

// const OutputProcessing = () => {
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Next button clicked');
//         setIsSubmitted(true);
//     }

//     return (<>
//     <span className='please-set'>Please set the runtime outputs for Output Processing</span>
    
//     <div className="input-processing">
        
//         <div className="field-group">
//           <label htmlFor="input-path">Output Path</label>
//           <input className =""type="text" id="input-path" name="input-path" defaultValue="s3.thisisinputpath" />
//         </div>
        
        
       

//         <div className='button-wrapper'>    
//                 <button type="submit" className={`next-button ${isSubmitted ? 'disabled' : ''}`} onClick={handleSubmit} disabled={isSubmitted}>submit and run</button>
//         </div>

//         {isSubmitted && (
//             <div className="submission-confirmation">
//                 <img src={cloudIcon} alt="Cloud Icon" />
//                 <div>
//                     <p className="message">Thank you for submitting this Run!</p>
//                     <p className="message">You can view the status of this run in the Run History page</p>
//                 </div>
//             </div>
//           )}
      
//     </div>


//     </>);
//     }

// export default OutputProcessing;
