import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import './RunHistory.css';
import closeIcon from 'assets/close-icon.svg';
import axios from 'axios';


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
    const [modelHeader, setModelHeader] = useState('');
    const [historyData, setHistoryData] = useState([]);

    // const reformatData = (historyApplications) => {
    //     return historyApplications.map(app => ({
    //       ...app,
    //       creation_time: new Date(app.creation_time).toISOString().split('T')[0].replace(/-/g, '.'),
    //       last_update_time: app.last_update_time 
    //     ? new Date(app.last_update_time).toISOString().split('T')[0].replace(/-/g, '.')
    //     : 'Running'
    //     }));
      
    // };

    useEffect(() => {
        async function fetchHistoryData() {
          try {
            const response = await axios.get('https://idp.predactiv.com/apps/get_app_runs/LG/');
            const Data = response.data;
            console.log("raw history data", Data);
            // const formattedData = reformatData(Data);
            // console.log("formatted history data", formattedData);

            setHistoryData(Data);

          } catch (error) {
            console.error('Error fetching applications:', error);
          }
        }
        fetchHistoryData();
    }, []);
  
    const handleViewInputParameters = (application) => {
      const app_name = application.app_name;
      const input_param = application.app_run_params;

      const inputParamString = JSON.stringify(input_param, null, 2); // Pretty print with 2 spaces

      setModelHeader(`${app_name} input parameters`);
      setModalContent(`${inputParamString}`);
      setModalIsOpen(true);
    };
  
    const handleViewResults = (application) => {
        const app_name = application.app_name;
        const output_path = application.app_run_params.output_path_base;
        const status = application.status.toLowerCase()
            var output_sentence = ""

            if (status === 'running') {
             
                setModalContent(`The output will be available at: ${output_path}`);
            } else if(status === 'success'){
              
                setModalContent(`The output is available at: ${output_path}`);
            } else {
                setModalContent(`The output is not available`);
            }

            setModelHeader(`${app_name} results`);
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
            {historyData.map((app, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{app.app_name}</td>
                <td>{app.creator}</td>
                <td>{app.app_run_params.start_date}</td>
                <td>{app.app_run_params.end_date}</td>
                <td>
                  <button className="action-button-inputParameters" onClick={() => handleViewInputParameters(app)}>
                    Input Parameters
                  </button>
                </td>
                <td>
                  <button className="action-button-results" onClick={() => handleViewResults(app)}>
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
        className="input-param-results-Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <p>{modelHeader}</p>
          <button src = {closeIcon} onClick={closeModal} className="close-button">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <pre id='window-content'>{modalContent}</pre>
        
      </Modal>



      </div>
    );
  }
  
  export default RunHistory;