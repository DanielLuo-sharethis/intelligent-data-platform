import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CurrentApplication.css';
import trashIcon from '../../assets/trash-can-icon.svg';  // Replace with your actual path
import terminateIcon from '../../assets/terminate-icon.svg';
import Tooltip from '@mui/material/Tooltip';



const applications = [
{
    application: 'Overlap Test',
    createdBy: 'Irving',
    createdAt: '2024.07.23',
    status: 'Run',
    },
  {
    application: 'Overlap Test',
    createdBy: 'Rafiq Rahman',
    createdAt: '2024.07.17',
    status: 'Running',
  },
  {
    application: 'Scale Estimate',
    createdBy: 'Predactiv',
    createdAt: '2024.07.07',
    status: 'Run',
  },
  {
    application: 'Anomaly Detection',
    createdBy: 'Predactiv',
    createdAt: '2024.07.07',
    status: 'Run',
  },
];

const CurrentApplication = () => {
   const navigate = useNavigate();
   const [allApplications, setAllApplications] = useState();
   
    useEffect(() => {
        setAllApplications(applications);
    }, [])

    const handleRun = (application) => {
        if (application === 'Overlap Test') {
            navigate('/current-application/overlap-test/input-processing');
        }else if (application === 'Scale Estimate') {
            navigate('/current-application/scale-estimate');
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
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.application}</td>
              <td>{app.createdBy}</td>
              <td>{app.createdAt}</td>
              <td>
                {app.status === 'Running' ? (
                  <span className="status running">Running</span>
                ) : (
                  <button className="status run" onClick={() => handleRun(app.application) }>Run</button>
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
                        <img src={trashIcon} alt="Delete" />
                        
                    </button>
                </Tooltip>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentApplication;
