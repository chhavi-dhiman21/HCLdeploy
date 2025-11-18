// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';
import Myprofile from './pages/Myprofile';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import PublicRoute from './components/PublicRoute.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute element={<LoginPage />} />} />
        <Route path="/register" element={<PublicRoute element={<RegistrationPage />} />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        />
        <Route
          path="/myprofile"
          element={<ProtectedRoute element={<Myprofile />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;