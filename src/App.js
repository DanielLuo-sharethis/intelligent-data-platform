// src/App.jsx

import './App.css';
import Signup from 'components/Authentication/Signup/Signup';
import Login from 'components/Authentication/Login/Login';
import Dashboard from 'components/IDP_platform/DashBoard/DashBoard';
import NotFound from 'components/NotFound';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import PrivateRoute from 'components/Authentication/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<PrivateRoute element={Dashboard} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
