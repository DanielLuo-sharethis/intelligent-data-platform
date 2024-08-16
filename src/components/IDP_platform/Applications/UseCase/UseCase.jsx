import React, { useEffect} from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';


import axios from 'axios';
import { useAuth } from 'contexts/AuthContext';

const UseCase = () => {
    const { currentUser, organization, email} = useAuth();
    const {use_case} = useParams()
    console.log("use_case", use_case);

    return ( 
        <div className="use-case">
        <iframe src={`https://idp.predactiv.com/apps/get_app_html_template/${organization}/${use_case}?email=${email}`} title={use_case} width="100%" height="600px" style={{ border: 'none' }}></iframe>
        </div>
    );
    }

export default UseCase;