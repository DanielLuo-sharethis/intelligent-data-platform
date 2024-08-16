import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import './RunHistory.css';
import closeIcon from 'assets/close-icon.svg';
import axios from 'axios';
import {useAuth} from 'contexts/AuthContext';
import ReactPaginate from 'react-paginate';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';


// const runHistoryData = [
//     {
//       application: 'Demo Overlap Test',
//       createdBy: 'Rafiq Rahman',
//       startTime: '2024.07.17',
//       endTime: '2024.07.17',
//     },
//     {
//       application: 'Scale Estimate',
//       createdBy: 'Rafiq Rahman',
//       startTime: '2024.07.07',
//       endTime: '2024.07.07',
//     },
//   ];
  
  const RunHistory = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modelHeader, setModelHeader] = useState('');
    const [historyData, setHistoryData] = useState([]);
    const {currentUser, organization} = useAuth();
    const [itemsPerPage, setItemsPerPage] = useState(10);// Number of rows per page
    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = useState('asc'); // Sort order
    const [orderBy, setOrderBy] = useState('start_date'); // Default order by start_date
  

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
          if(organization) {
            try {
              const response = await axios.get(`https://idp.predactiv.com/apps/get_app_runs/${organization}/`);
              const Data = response.data;
              console.log("raw history data", Data);
              // const formattedData = reformatData(Data);
              // console.log("formatted history data", formattedData);
  
              setHistoryData(Data);
  
            } catch (error) {
              console.error('Error fetching applications:', error);
            }
          }
        }
        fetchHistoryData();
    }, [organization]);
  
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
                setModalContent(`status: ${status} \n\nThe output is not available`);
            }

            setModelHeader(`${app_name} results`);
            setModalIsOpen(true);
        };
    const closeModal = () => {
        setModalIsOpen(false);
        setModalContent('');
    };

    // Sorting logic
    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const sortedData = React.useMemo(() => {
      return [...historyData].sort((a, b) => {
        let aValue = a.app_run_params[orderBy] || a[orderBy] || '';
        let bValue = b.app_run_params[orderBy] || b[orderBy] || '';
    
        // Handle date fields
        if (orderBy === 'start_date' || orderBy === 'end_date') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        }
    
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }, [historyData, order, orderBy]);
    
    


       // Calculate pagination details
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setItemsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(0); // Reset to first page
    };

       // Pagination logic
    const pageCount = Math.ceil(historyData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentItems = sortedData.slice(offset, offset + itemsPerPage);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

  
    return (
      <div className="run-history">
        <div className="table-container">
          <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <TableSortLabel
                  active={orderBy === 'app_name'}
                  direction={orderBy === 'app_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('app_name')}
                >
                  Application
                  {orderBy === 'app_name' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </th>
              <th>
                <TableSortLabel
                  active={orderBy === 'creator'}
                  direction={orderBy === 'creator' ? order : 'asc'}
                  onClick={() => handleRequestSort('creator')}
                >
                  Run by
                  {orderBy === 'creator' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </th>
              <th>
                <TableSortLabel
                  active={orderBy === 'start_date'}
                  direction={orderBy === 'start_date' ? order : 'asc'}
                  onClick={() => handleRequestSort('start_date')}
                >
                  StartTime
                  {orderBy === 'start_date' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </th>
              <th>
                <TableSortLabel
                  active={orderBy === 'end_date'}
                  direction={orderBy === 'end_date' ? order : 'asc'}
                  onClick={() => handleRequestSort('end_date')}
                >
                  EndTime
                  {orderBy === 'end_date' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </th>
              <th></th>
              <th></th>
            </tr>
        </thead>

            <tbody>
              {currentItems.map((app, index) => (
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
        </div>

        
          {/* <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          /> */}
          <TablePagination
            component="div"
            count={historyData.length}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className='pagination'
            rowsPerPageOptions={[5, 10,20]} 
          />
        

        

        

        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Run History Details"
        className="input-param-results-Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <p>{modelHeader}</p>
          <button onClick={closeModal} className="close-button">
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        
        <pre id='window-content'>{modalContent}</pre>
        
      </Modal>



      </div>
    );
  }
  
  export default RunHistory;