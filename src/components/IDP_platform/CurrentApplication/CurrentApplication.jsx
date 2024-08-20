import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrentApplication.css';
import trashIcon from '../../../assets/trash-can-icon.svg';  // Replace with your actual path
import terminateIcon from '../../../assets/terminate-icon.svg';
import Tooltip from '@mui/material/Tooltip';
import Modal from 'react-modal';
import closeIcon from '../../../assets/close-icon.svg';
import axios from 'axios';
import {useAuth} from 'contexts/AuthContext';



// const applications = [
// {
//     application: 'Overlap Test',
//     createdBy: 'Irving',
//     createdAt: '2024.07.23',
//     status: 'Run',
//     },
//   {
//     application: 'Overlap Test',
//     createdBy: 'Rafiq Rahman',
//     createdAt: '2024.07.17',
//     status: 'Running',
//   },
//   {
//     application: 'Scale Estimate',
//     createdBy: 'Predactiv',
//     createdAt: '2024.07.07',
//     status: 'Run',
//   },
//   {
//     application: 'Anomaly Detection',
//     createdBy: 'Predactiv',
//     createdAt: '2024.07.07',
//     status: 'Run',
//   },
// ];

const CurrentApplication = () => {
   const navigate = useNavigate();
   const [allApplications, setAllApplications] = useState([]);
   const [deletemModalIsOpen, setDeletemModalIsOpen] = useState(false);
   const [deleteModalContent, setDeleteModalContent] = useState('');
   const [currentApplication, setCurrentApplication] = useState(null);
   const {currentUser, organization} = useAuth();
  

  


   
   // Helper function to reformat the creation_time field
  const reformatCreationTime = (applications) => {
    return applications.map(app => ({
      ...app,
      creation_time: new Date(app.creation_time).toISOString().split('T')[0].replace(/-/g, '.')
    }));
  };

  useEffect(() => {
    async function fetchAllApplications() {
      if(organization ){
        try {
          const response = await axios.get(`https://idp.predactiv.com/apps/get_user_apps/${organization}/`);
          const applicationsData = response.data;
          console.log("raw current application",applicationsData);
  
          // Reformat the creation_time field
          const formattedData = reformatCreationTime(applicationsData);
  
          setAllApplications(formattedData);
          console.log("formatted current application",formattedData);
        } catch (error) {
          console.error('Error fetching applications:', error);
          // Optionally, set fallback data or handle the error
          // setAllApplications(sampleApplications); // Uncomment if you have fallback data
        }
      }
    }

    fetchAllApplications();
  }, [organization]);

    const handleRun = (application) => {
        if (application === 'overlap_test' || application === 'scale_estimate' || application === 'anomaly_detection') {
            navigate(`./use-case/${application}`);
        }
      
    }

    const handleDelete = (application) => {
        const applicationName = application.app_name;
        setCurrentApplication(application);
        setDeleteModalContent(`Are you sure you want to delete ${applicationName} ?`);
        setDeletemModalIsOpen(true);
    }
    // click No button or close the modal
    const closeDeleteModal = () => {
        setDeletemModalIsOpen(false);
        setDeleteModalContent('');
    }
    // click Yes button
    const deleteApplication = async() => {
        // call the backend to delete the application
        // close the modal
        const account = currentApplication.account;
        const app_name = currentApplication.app_name;
        console.log("in delete application, account:", account, "app_name:", app_name);
        try{

          await deleteApplication_API(app_name, account);
          setAllApplications(prevApps => prevApps.filter(app => app.app_name !== app_name));
          setDeletemModalIsOpen(false);
          setDeleteModalContent('');

        }catch(error){
            console.error('Error deleting application:', error);
        }
        
    }
    async function deleteApplication_API(app_name, account){
        try {
            const response = await axios.get(`https://idp.predactiv.com/apps/delete_user_app/${organization}/${app_name}`, {});
            console.log("deleteApplication_API response", response);
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    }




  return (
    <div className="current-application">
   
      <table >
        <thead>
          <tr>
            <th>Application</th>
            <th>Created by</th>
            <th>Created at</th>
            <th>Status</th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {allApplications.map((app, index) => (
            <tr key={index}>
              <td>{app.app_name}</td>
              <td>{app.account}</td>
              <td>{app.creation_time}</td>
              <td>
                {app.status === 'Running' ? (
                  <span className="status running">Running</span>
                ) : (
                  <button className="status run" onClick={() => handleRun(app.app_name) }>Run</button>
                )}
              </td>

              <td>
                {app.status === 'Running' ? (
                <Tooltip title="terminate run" placement = "right" arrow>
                    <button className="action-button terminate-button">
                        <img src={terminateIcon} alt="Terminate" />
                       
                    </button>
                </Tooltip>
                ) : (
                <Tooltip title="delete" placement = "right" arrow>
                    <button className="action-button trash-button">
                        <img src={trashIcon} alt="Delete" onClick={()=>handleDelete(app)}/>
                        
                    </button>
                </Tooltip>
                )}
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>

      <Modal
        isOpen={deletemModalIsOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Run History Details"
        className="delete-app-Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <p></p>
          <button src = {closeIcon} onClick={closeDeleteModal} className="close-button">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <p id='delete-confirmation'>{deleteModalContent}</p>

        <div className='delete-model-button-wrapper'>
            <button className='delete-model-button' onClick={deleteApplication}>Yes</button>
            <button className='delete-model-button' onClick={closeDeleteModal}>No</button>
        </div>
        
      </Modal>
    </div>
  );
}

export default CurrentApplication;
