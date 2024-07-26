import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import './RunHistory.css';
import closeIcon from '../../assets/close-icon.svg';


const runHistoryData = [
    {
      application: 'Demo Overlap Test',
      createdBy: 'Rafiq Rahman',
      startTime: '2024.07.17',
      endTime: '2024.07.17',
    },
    {
      application: 'Scale Estimate',
      createdBy: 'Rafiq Rahman',
      startTime: '2024.07.07',
      endTime: '2024.07.07',
    },
  ];
  
  const RunHistory = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
  
    const handleViewInputParameters = (application) => {
    
      setModalContent(`Input Parameters for ${application}`);
      setModalIsOpen(true);
    };
  
    const handleViewResults = (application) => {
        setModalContent(`Results for ${application}`);
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent('');
      };
  
    return (
      <div className="run-history">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Application</th>
              <th>Run by</th>
              <th>StartTime</th>
              <th>EndTime</th>
              <th></th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            {runHistoryData.map((run, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{run.application}</td>
                <td>{run.createdBy}</td>
                <td>{run.startTime}</td>
                <td>{run.endTime}</td>
                <td>
                  <button className="action-button-inputParameters" onClick={() => handleViewInputParameters(run.application)}>
                    Input Parameters
                  </button>
                </td>
                <td>
                  <button className="action-button-results" onClick={() => handleViewResults(run.application)}>
                    Results
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Run History Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <p>Demo result</p>
          <button src = {closeIcon} onClick={closeModal} className="close-button">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <h2 id='window-content'>{modalContent}</h2>
        
      </Modal>



      </div>
    );
  }
  
  export default RunHistory;